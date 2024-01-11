import { defineConfig } from "vite";
import { resolve, join, sep } from "path";
import * as fs from "fs";
function getAllIndexHtmlFilePaths(dir: string): string[] {
  const filepaths: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      filepaths.push(...getAllIndexHtmlFilePaths(filePath));
    } else if (file === "index.html") {
      filepaths.push(filePath);
    }
  }

  return filepaths;
}

// const srcFolderPath = resolve(__dirname, "src");
const indexHtmlFilePaths = getAllIndexHtmlFilePaths("src");
console.log(indexHtmlFilePaths);

let days = indexHtmlFilePaths.map((path) => {
  console.log(path, sep, path.split(sep)[1]);
  return {
    [path.split(sep)[1]]: resolve(__dirname, path),
  };
});

const newDays = days.reduce((acc, cur) => {
  return { ...acc, ...cur };
}, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
        ...newDays,
        // day1: resolve(__dirname, "src/day1/index.html"),
        // shaderOne: "./shaderOne.html",
        // ...
        // List all files you want in your build
      },
    },
  },
});
