import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "public", "content");

function buildTree(dir, basePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const folders = [];
  const documents = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      folders.push({
        id: entry.name,
        title: entry.name,
        path: relativePath,
        ...buildTree(fullPath, relativePath)
      });
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const id = path.basename(entry.name, ".md");

      // Leer el archivo para extraer frontmatter
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { metadata } = parseFrontMatter(raw);

      documents.push({
        id,
        title: metadata.title || capitalize(id),
        subtitle: metadata.subtitle || "",
        path: relativePath
      });
    }
  }

  return { folders, documents };
}

// Parser casero de frontmatter
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const tree = buildTree(CONTENT_DIR);

fs.writeFileSync(
  path.join(CONTENT_DIR, "folders.json"),
  JSON.stringify(tree, null, 2),
  "utf-8"
);

console.log("✅ folders.json generado en", CONTENT_DIR);
