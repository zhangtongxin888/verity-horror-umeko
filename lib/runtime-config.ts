import { adsterraStaticConfig } from "@/lib/adsterra.generated";

const runtimeEnvConfig = {
};

export const runtimeConfig = {
  ...runtimeEnvConfig,
  ...adsterraStaticConfig
};
