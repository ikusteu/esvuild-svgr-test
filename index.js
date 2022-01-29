module.exports = (options = {}) => ({
  name: "svgr",
  setup(build) {
    const svgr = require("@svgr/core").transform;
    const fs = require("fs");

    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      const rawSVG = await fs.promises.readFile(args.path, "utf8");

      const svg = applyTransform(rawSVG, options.transformInline);

      const contents = await svgr(svg, { ...options }, { filePath: args.path });
      return {
        contents,
        loader: "jsx",
      };
    });
  },
});

/**
 * Applies inline transformation of SVG file if `tranformInline`
 * function provided in options. If no `transformInline` provided
 * returns raw SVG from params
 * @param {string} rawSVG raw svg file
 * @param {Function} rawSVG raw svg file
 * @returns {string} svg file after processing with `transformInline`
 */
function applyTransform(rawSVG, transformInline = (svg) => svg) {
  const processedSVG = transformInline(rawSVG);

  if (typeof processedSVG !== "string") {
    throw new Error(
      `Invalid 'transformInline' function return type. Expected 'string' but got '${typeof processedSVG}'`
    );
  }

  return processedSVG;
}
