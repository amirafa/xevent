import { defineConfig } from "tsup";

export default defineConfig([
    // ESM + CJS build (tree-shaking friendly)
    {
        entry: ["src/index.ts"],
        format: ["esm", "cjs"],
        dts: true,
        sourcemap: true,
        minify: true,
        clean: true,
        splitting: true, // allow chunks
        outDir: "dist",
        shims: true, // 🔥 add this
    },

    // UMD / IIFE (CDN build)
    {
        entry: {
            umd: "src/auto.ts",
        },
        format: ["iife"],
        globalName: "xevent",
        dts: false,
        splitting: false, // ❗ NO CHUNKS for CDN
        sourcemap: false,
        minify: true,
        outDir: "dist",
    },
]);
