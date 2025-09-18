import fs from "fs";
import path from "path";

let idCounter = 1; // contador global para IDs únicos

function generateId() {
  return idCounter++;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseFrontMatter(raw) {
  let metadata = {};
  let content = raw;

  if (raw.startsWith("---")) {
    const end = raw.indexOf("---", 3);
    if (end !== -1) {
      const fm = raw.slice(3, end).trim();
      content = raw.slice(end + 3).trim();

      fm.split("\n").forEach(line => {
        if (!line.trim()) return;
        const [key, ...rest] = line.split(":");
        let value = rest.join(":").trim();
        value = value.replace(/^["']|["']$/g, "");
        metadata[key.trim()] = value;
      });
    }
  }

  return { metadata, content };
}

function processDocument(fullPath, relativePath) {
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { metadata } = parseFrontMatter(raw);

  return {
    id: generateId(),
    title: metadata.title || capitalize(path.basename(fullPath, ".md")),
    subtitle: metadata.subtitle,
    order: metadata.order ? Number(metadata.order) : undefined,
    date: metadata.date,
    coverImage: metadata.coverImage,
    baseImageUrl: metadata["base-image-url"],
    path: relativePath
  };
}

function processFolder(dir, relativePath, entryName, subTree) {
  const indexPath = path.join(dir, "index.md");

  let folderMeta = {
    id: generateId(),
    title: entryName,
    description: "",
    order: undefined,
    coverImage: ""
  };

  if (fs.existsSync(indexPath)) {
    const rawIndex = fs.readFileSync(indexPath, "utf-8");
    const { metadata } = parseFrontMatter(rawIndex);

    folderMeta = {
      ...folderMeta,
      title: metadata.title || folderMeta.title,
      description: metadata.description,
      order: metadata.order ? Number(metadata.order) : undefined,
      coverImage: metadata.coverImage
    };
  }

  return {
    ...folderMeta,
    path: relativePath,
    folders: subTree.folders,
    documents: subTree.documents
  };
}

function buildTree(dir, basePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const folders = [];
  const documents = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === "img") continue;

      const subTree = buildTree(fullPath, relativePath);
      const folder = processFolder(fullPath, relativePath, entry.name, subTree);
      folders.push(folder);

    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md") {
      const document = processDocument(fullPath, relativePath);
      documents.push(document);
    }
  }

  return { folders, documents };
}

function main() {
  const contentDir = path.join(process.cwd(), "public", "content");
  const tree = buildTree(contentDir);

  const outputPath = path.join(process.cwd(), "public", "folders.json");
  fs.writeFileSync(outputPath, JSON.stringify(tree, null, 2), "utf-8");

  console.log("✅ folders.json generado en", outputPath);
}

main();