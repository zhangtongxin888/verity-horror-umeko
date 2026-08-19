"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { runtimeConfig as sourceRuntimeConfig } from "@/lib/runtime-config";

export const ADSTERRA_RUNTIME_VERSION = "2026-07-27.2";

// Static sites do not all declare every optional Adsterra field in their
// environment-derived config type. The generated source can still provide
// any subset at build time, so read it through a common optional contract.
type AdsterraRuntimeConfig = {
  adsterraBanner160x300Key?: string;
  adsterraBanner160x300ScriptUrl?: string;
  adsterraBanner160x600Key?: string;
  adsterraBanner160x600ScriptUrl?: string;
  adsterraBanner300x250Key?: string;
  adsterraBanner300x250ScriptUrl?: string;
  adsterraBanner320x50Key?: string;
  adsterraBanner320x50ScriptUrl?: string;
  adsterraBanner468x60Key?: string;
  adsterraBanner468x60ScriptUrl?: string;
  adsterraBanner728x90Key?: string;
  adsterraBanner728x90ScriptUrl?: string;
  adsterraEnablePopunder?: boolean;
  adsterraEnableSocialBar?: boolean;
  adsterraEnableStickyRail?: boolean;
  adsterraLeaderboardId?: string;
  adsterraNative1Id?: string;
  adsterraNative1ScriptUrl?: string;
  adsterraPopunderDelayMs: number;
  adsterraPopunderMinPageViews: number;
  adsterraPopunderScriptUrl?: string;
  adsterraSmartLinkUrl?: string;
  adsterraSocialBarScriptUrl?: string;
};

const runtimeConfig = sourceRuntimeConfig as unknown as AdsterraRuntimeConfig;

type BannerSize = "160x300" | "160x600" | "300x250" | "320x50" | "468x60" | "728x90";

type BannerConfig = {
  height: number;
  key?: string;
  scriptUrl?: string;
  width: number;
};

const bannerConfigs: Record<BannerSize, BannerConfig> = {
  "300x250": {
    width: 300,
    height: 250,
    key: runtimeConfig.adsterraBanner300x250Key,
    scriptUrl: runtimeConfig.adsterraBanner300x250ScriptUrl
  },
  "320x50": {
    width: 320,
    height: 50,
    key: runtimeConfig.adsterraBanner320x50Key,
    scriptUrl: runtimeConfig.adsterraBanner320x50ScriptUrl
  },
  "728x90": {
    width: 728,
    height: 90,
    key: runtimeConfig.adsterraBanner728x90Key || runtimeConfig.adsterraLeaderboardId,
    scriptUrl: runtimeConfig.adsterraBanner728x90ScriptUrl
  },
  "468x60": {
    width: 468,
    height: 60,
    key: runtimeConfig.adsterraBanner468x60Key,
    scriptUrl: runtimeConfig.adsterraBanner468x60ScriptUrl
  },
  "160x300": {
    width: 160,
    height: 300,
    key: runtimeConfig.adsterraBanner160x300Key,
    scriptUrl: runtimeConfig.adsterraBanner160x300ScriptUrl
  },
  "160x600": {
    width: 160,
    height: 600,
    key: runtimeConfig.adsterraBanner160x600Key,
    scriptUrl: runtimeConfig.adsterraBanner160x600ScriptUrl
  }
};

const CLEAN_AD_ROUTE_SEGMENTS = new Set(["about", "accessibility", "advertising-policy", "affiliate-disclosure", "contact", "cookie-policy", "cookies", "disclosure", "dmca", "editorial-policy", "legal", "privacy", "sources", "terms"]);

declare global {
  interface Window {
    atOptions?: {
      key?: string;
      format: "iframe";
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
    __adsterraBannerQueue?: Promise<void>;
    gtag?: (...args: unknown[]) => void;
  }
}

function normalizeScriptUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function getBannerScriptUrl(config: BannerConfig) {
  if (config.scriptUrl) return normalizeScriptUrl(config.scriptUrl);
  if (!config.key) return undefined;
  return `https://www.highperformanceformat.com/${config.key}/invoke.js`;
}

function hasBannerSlot(size: BannerSize) {
  const config = bannerConfigs[size];
  return Boolean(getBannerScriptUrl(config) && config.key);
}

function hasLeaderboardSlot() {
  return hasBannerSlot("728x90") || hasBannerSlot("320x50");
}

function hasNativeSlot(containerId?: string, scriptUrl?: string) {
  return Boolean(containerId && normalizeScriptUrl(scriptUrl));
}

function isCleanAdRoute(pathname?: string | null) {
  if (!pathname) return false;
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return cleanPath.split("/").filter(Boolean).some((segment) => CLEAN_AD_ROUTE_SEGMENTS.has(segment));
}

function useCleanAdRoute() {
  return isCleanAdRoute(usePathname());
}

function trackAdEvent(eventName: string, payload: Record<string, unknown>) {
  window.gtag?.("event", eventName, {
    event_category: "ads",
    ad_network: "adsterra",
    ...payload
  });
}

function useAdVisibilityTracking(hostRef: React.RefObject<HTMLElement | null>, slotName: string) {
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        trackAdEvent("ad_slot_viewed", {
          ad_slot: slotName,
          visible_ratio: Math.round(entry.intersectionRatio * 100)
        });
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [hostRef, slotName]);
}

function AdvertisementShell({
  children,
  className = "",
  label = "Advertisement"
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <aside className={`ad-shell ${className}`} aria-label={label}>
      <span className="ad-label">{label}</span>
      {children}
    </aside>
  );
}

function AdsterraBannerUnit({
  className = "",
  slotName,
  size
}: {
  className?: string;
  slotName?: string;
  size: BannerSize;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const config = bannerConfigs[size];
  const scriptUrl = getBannerScriptUrl(config);
  const resolvedSlotName = slotName || `banner_${size}`;

  useAdVisibilityTracking(hostRef, resolvedSlotName);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !scriptUrl || !config.key) return;

    let cancelled = false;
    let emptyCheck: number | undefined;

    const queue = window.__adsterraBannerQueue || Promise.resolve();
    window.__adsterraBannerQueue = queue.then(
      () =>
        new Promise<void>((resolve) => {
          if (cancelled || !host.isConnected) {
            resolve();
            return;
          }

          trackAdEvent("ad_slot_mounted", { ad_slot: resolvedSlotName, ad_format: size });
          host.replaceChildren();
          window.atOptions = {
            key: config.key,
            format: "iframe",
            height: config.height,
            width: config.width,
            params: {}
          };

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = scriptUrl;
          script.async = false;
          script.onload = () => {
            trackAdEvent("ad_script_loaded", { ad_slot: resolvedSlotName, ad_format: size });
            resolve();
          };
          script.onerror = () => {
            trackAdEvent("ad_script_error", { ad_slot: resolvedSlotName, ad_format: size });
            resolve();
          };
          host.appendChild(script);

          emptyCheck = window.setTimeout(() => {
            const rendered = Boolean(host.querySelector("iframe, ins, a, img"));
            trackAdEvent(rendered ? "ad_creative_rendered" : "ad_empty_after_5s", {
              ad_slot: resolvedSlotName,
              ad_format: size
            });
          }, 5000);
        })
    );

    return () => {
      cancelled = true;
      if (emptyCheck) window.clearTimeout(emptyCheck);
      host.replaceChildren();
    };
  }, [config.height, config.key, config.width, resolvedSlotName, scriptUrl, size]);

  if (!scriptUrl || !config.key) return null;

  return (
    <AdvertisementShell className={className}>
      <div
        ref={hostRef}
        className="ad-host"
        style={{ minHeight: config.height, width: "100%", maxWidth: config.width }}
      />
    </AdvertisementShell>
  );
}

function usePreferredLeaderboardSize() {
  const [size, setSize] = useState<BannerSize | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const chooseSize = () => {
      if (mediaQuery.matches && hasBannerSlot("728x90")) {
        setSize("728x90");
        return;
      }
      if (hasBannerSlot("320x50")) {
        setSize("320x50");
        return;
      }
      if (hasBannerSlot("728x90")) {
        setSize("728x90");
        return;
      }
      setSize(null);
    };

    chooseSize();
    mediaQuery.addEventListener("change", chooseSize);
    return () => mediaQuery.removeEventListener("change", chooseSize);
  }, []);

  return size;
}

function AdsterraNativeUnit({
  className = "",
  containerId,
  slotName = "native",
  scriptUrl
}: {
  className?: string;
  containerId?: string;
  slotName?: string;
  scriptUrl?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cleanContainerId = useMemo(() => containerId?.replace(/^#/, ""), [containerId]);
  const normalizedScriptUrl = normalizeScriptUrl(scriptUrl);

  useAdVisibilityTracking(hostRef, slotName);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !cleanContainerId || !normalizedScriptUrl) return;

    trackAdEvent("ad_slot_mounted", { ad_slot: slotName, ad_format: "native" });
    host.replaceChildren();

    const container = document.createElement("div");
    container.id = cleanContainerId;
    host.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = normalizedScriptUrl;
    script.onload = () => trackAdEvent("ad_script_loaded", { ad_slot: slotName, ad_format: "native" });
    script.onerror = () => trackAdEvent("ad_script_error", { ad_slot: slotName, ad_format: "native" });
    host.appendChild(script);

    const emptyCheck = window.setTimeout(() => {
      const rendered = Boolean(container.querySelector("iframe, ins, a, img"));
      trackAdEvent(rendered ? "ad_creative_rendered" : "ad_empty_after_5s", {
        ad_slot: slotName,
        ad_format: "native"
      });
    }, 5000);

    return () => {
      window.clearTimeout(emptyCheck);
      host.replaceChildren();
    };
  }, [cleanContainerId, normalizedScriptUrl, slotName]);

  if (!cleanContainerId || !normalizedScriptUrl) return null;

  return (
    <AdvertisementShell className={className}>
      <div ref={hostRef} className="ad-host ad-host-native" />
    </AdvertisementShell>
  );
}

export function AdsterraSmartLink() {
  return null;
}

// Backward-compatible name used by first-generation site layouts.
export function SponsoredSmartLink() {
  return <AdsterraSmartLink />;
}

export function AdsterraSmartLinkAnchor({
  children = "Sponsored link",
  className = ""
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!runtimeConfig.adsterraSmartLinkUrl) return null;

  return (
    <a
      className={className}
      href={runtimeConfig.adsterraSmartLinkUrl}
      rel="nofollow sponsored noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function AdsterraBanner() {
  return <AdsterraBannerUnit size="300x250" slotName="content_rectangle" />;
}

export function AdsterraRectangle() {
  return <AdsterraBannerUnit size="300x250" slotName="bottom_rectangle" />;
}

export function AdsterraLeaderboard() {
  const size = usePreferredLeaderboardSize();
  if (!size) return null;

  return (
    <div className="ad-leaderboard">
      <AdsterraBannerUnit size={size} slotName={size === "728x90" ? "top_leaderboard" : "mobile_leaderboard"} />
    </div>
  );
}

export function AdsterraNative1() {
  return (
    <AdsterraNativeUnit
      containerId={runtimeConfig.adsterraNative1Id}
      slotName="native_inline"
      scriptUrl={runtimeConfig.adsterraNative1ScriptUrl}
    />
  );
}

export function AdsterraArticleTop() {
  if (!hasLeaderboardSlot()) return null;

  return (
    <div className="ad-placement ad-placement-top">
      <AdsterraLeaderboard />
    </div>
  );
}

export function AdsterraArticleMid() {
  if (!hasNativeSlot(runtimeConfig.adsterraNative1Id, runtimeConfig.adsterraNative1ScriptUrl)) return null;

  return (
    <div className="ad-placement ad-placement-mid">
      <AdsterraNative1 />
    </div>
  );
}

export function AdsterraArticleBottom() {
  if (!hasBannerSlot("300x250")) return null;

  return (
    <div className="ad-placement ad-placement-bottom">
      <AdsterraRectangle />
    </div>
  );
}

export function AdsterraToolAd() {
  if (!hasLeaderboardSlot()) return null;

  return (
    <div className="ad-placement ad-placement-tool">
      <AdsterraLeaderboard />
    </div>
  );
}

export function AdsterraToolBottom() {
  if (!hasBannerSlot("300x250")) return null;

  return (
    <div className="ad-placement ad-placement-tool-bottom">
      <AdsterraRectangle />
    </div>
  );
}

/**
 * A conservative portfolio fallback for legacy sites whose page templates
 * have little or no inline inventory. It is wired only by the migration
 * tool when source coverage is below the threshold, and remains clean-route
 * aware even though it lives in the root layout.
 */
export function AdsterraGlobalFallback() {
  const cleanAdRoute = useCleanAdRoute();
  if (cleanAdRoute || !hasLeaderboardSlot()) return null;

  return (
    <div className="ad-placement ad-placement-global-fallback">
      <AdsterraLeaderboard />
    </div>
  );
}

// Backward-compatible placement API used by older generated page templates.
export function AdSlot({ label }: { label: string }) {
  if (label === "native1") return <AdsterraNative1 />;
  if (label === "leaderboard") return <AdsterraLeaderboard />;
  return <AdsterraRectangle />;
}

export function AdsterraPopunderGate() {
  const cleanAdRoute = useCleanAdRoute();

  useEffect(() => {
    if (cleanAdRoute) return;
    if (!runtimeConfig.adsterraEnablePopunder || !runtimeConfig.adsterraPopunderScriptUrl) return;

    const pageViewsKey = "roblox-site-adsterra-pageviews";
    const loadedKey = "roblox-site-adsterra-popunder-loaded";
    const nextPageViews = Number(window.sessionStorage.getItem(pageViewsKey) || "0") + 1;
    window.sessionStorage.setItem(pageViewsKey, String(nextPageViews));

    if (window.sessionStorage.getItem(loadedKey)) return;
    if (nextPageViews < runtimeConfig.adsterraPopunderMinPageViews) return;

    const timer = window.setTimeout(() => {
      if (document.getElementById("adsterra-popunder")) return;
      const script = document.createElement("script");
      script.id = "adsterra-popunder";
      script.src = normalizeScriptUrl(runtimeConfig.adsterraPopunderScriptUrl) || "";
      script.async = true;
      script.onload = () => trackAdEvent("ad_script_loaded", { ad_slot: "popunder_gate", ad_format: "popunder" });
      script.onerror = () => trackAdEvent("ad_script_error", { ad_slot: "popunder_gate", ad_format: "popunder" });
      document.body.appendChild(script);
      window.sessionStorage.setItem(loadedKey, "true");
    }, runtimeConfig.adsterraPopunderDelayMs);

    return () => window.clearTimeout(timer);
  }, [cleanAdRoute]);

  return null;
}

export function AdsterraSocialBarGate() {
  const cleanAdRoute = useCleanAdRoute();

  useEffect(() => {
    if (cleanAdRoute) return;
    if (!runtimeConfig.adsterraEnableSocialBar || !runtimeConfig.adsterraSocialBarScriptUrl) return;
    if (document.getElementById("adsterra-social-bar")) return;

    const script = document.createElement("script");
    script.id = "adsterra-social-bar";
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = normalizeScriptUrl(runtimeConfig.adsterraSocialBarScriptUrl) || "";
    script.onload = () => trackAdEvent("ad_script_loaded", { ad_slot: "social_bar", ad_format: "social_bar" });
    script.onerror = () => trackAdEvent("ad_script_error", { ad_slot: "social_bar", ad_format: "social_bar" });
    document.body.appendChild(script);
  }, [cleanAdRoute]);

  return null;
}

export function AdsterraStickyRail() {
  const cleanAdRoute = useCleanAdRoute();
  const railConfig = bannerConfigs["160x600"];
  if (cleanAdRoute || !runtimeConfig.adsterraEnableStickyRail || !railConfig.key || !getBannerScriptUrl(railConfig)) {
    return null;
  }

  return (
    <div className="ad-sticky-rail">
      <AdsterraBannerUnit size="160x600" slotName="desktop_rail_160x600" />
    </div>
  );
}

export function AdDisclosure() {
  return (
    <p className="text-xs leading-5 text-white/42">
      This fan site may show third-party ads to support hosting and updates.
    </p>
  );
}
