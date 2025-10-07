import fs from "fs";
import archiver from "archiver";
import path from "path";

export async function zipProject(files) {
  const outputDir = "./downloads";
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const zipName = `project-${Date.now()}.zip`;
  const zipPath = path.join(outputDir, zipName);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(output);

  for (const [filename, content] of Object.entries(files)) {
    archive.append(content, { name: filename });
  }

  await archive.finalize();
  return zipPath;
}
