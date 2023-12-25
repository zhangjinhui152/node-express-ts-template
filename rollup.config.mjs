// rollup.config.mjs
import commonjs from "@rollup/plugin-commonjs"; // 导入commonjs插件
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json"; // 导入插件
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default {
    input: "app.ts",
    output: {
        // dir: 'dist',
        file: "./dist/app.js",
        inlineDynamicImports: true,
        format: "cjs",
        // entryFileNames: '[name].cjs.js',
    },
    plugins: [
        babel({
            babelrc: false,
            presets: [["@babel/preset-env", { modules: false, loose: true }]],
            plugins: ["@babel/plugin-syntax-top-level-await"],
            exclude: /node_modules/,
        }),
        nodeResolve({
            exportConditions: ["node"],
            // moduleDirectories: ['node_modules', 'src/modules'],
        }),
        // nodePolyfills(),
        commonjs({
            // strictRequires: true,
            // transformMixedEsModules: true
            ignoreDynamicRequires: true,
        }),
        json(),
        typescript(),
    ],
    external: ["pug"], // 告诉 Rollup 'pug' 是外部模块,
    experimentalTopLevelAwait: true,
};
