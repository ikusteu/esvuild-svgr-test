import { Config } from "@svgr/core";

interface ExtendedConfig extends Config {
  transformInline?: (rawSvg: string) => string;
}

declare function svgrPlugin(options?: ExtendedConfig): {
  name: string;
  setup(build: unknown): void;
};

export = svgrPlugin;
