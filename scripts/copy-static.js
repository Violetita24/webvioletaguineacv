import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const files = ["CNAME"];

for (const file of files) {
  const source = resolve(file);
  const target = resolve("dist", file);

  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}
