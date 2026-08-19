import type { ComponentPropsWithoutRef } from "react";

type StaticLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

export default function StaticLink({ children, href, ...props }: StaticLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
