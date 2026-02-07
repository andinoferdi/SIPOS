import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");
const appDir = path.join(srcDir, "app");

const files = [];

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    files.push(fullPath);
  }
};

walk(srcDir);

const tsFiles = files.filter((filePath) => filePath.endsWith(".ts"));
const tsxFiles = files.filter((filePath) => filePath.endsWith(".tsx"));
const cssFiles = files.filter((filePath) => filePath.endsWith(".css"));
const tsAndTsxFiles = [...tsFiles, ...tsxFiles];

const countMatches = (content, regex) => {
  const matches = content.match(regex);
  return matches ? matches.length : 0;
};

const stripThemeBlocks = (cssContent) => {
  let result = "";
  let index = 0;

  while (index < cssContent.length) {
    const themeIndex = cssContent.indexOf("@theme inline", index);
    if (themeIndex === -1) {
      result += cssContent.slice(index);
      break;
    }

    result += cssContent.slice(index, themeIndex);
    const openBraceIndex = cssContent.indexOf("{", themeIndex);
    if (openBraceIndex === -1) {
      break;
    }

    index = openBraceIndex + 1;
    let depth = 1;
    while (index < cssContent.length && depth > 0) {
      const char = cssContent[index];
      if (char === "{") depth += 1;
      if (char === "}") depth -= 1;
      index += 1;
    }
  }

  return result;
};

let relativeImports = 0;
let todoCount = 0;
let functionDeclarationCount = 0;
let hexInTsxCount = 0;
let tsTsxCommentCount = 0;
let cssCommentCount = 0;
let cssHexOutsideThemeCount = 0;
let tsRule14ViolationCount = 0;

const isPrimitiveAlias = (rhs) => {
  return /^(string|number|boolean|unknown|any|never|void|null|undefined)\b/.test(
    rhs,
  );
};

const isObjectLikeAlias = (rhs) => {
  return (
    rhs.startsWith("{") ||
    rhs.startsWith("React.") ||
    rhs.startsWith("Record<") ||
    rhs.startsWith("Readonly<") ||
    rhs.startsWith("Partial<") ||
    rhs.startsWith("Pick<") ||
    rhs.startsWith("Omit<") ||
    rhs.startsWith("Required<")
  );
};

for (const filePath of tsAndTsxFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  relativeImports += countMatches(content, /from\s+["']\.{1,2}\//g);
  todoCount += countMatches(content, /TODO/g);
  functionDeclarationCount += countMatches(
    content,
    /\bfunction\s+[A-Za-z0-9_]+\s*\(/g,
  );
  tsTsxCommentCount += countMatches(content, /^\s*\/\//gm);
  tsTsxCommentCount += countMatches(content, /\/\*/g);

  const aliasMatches = content.matchAll(/type\s+[A-Za-z0-9_]+\s*=\s*([^;]+);/g);
  for (const match of aliasMatches) {
    const rhs = match[1].trim();
    const isUnionOrIntersection = rhs.includes("|") || rhs.includes("&");
    const isInferUtility = rhs.startsWith("z.infer<");

    if (isUnionOrIntersection || isInferUtility || isPrimitiveAlias(rhs)) {
      continue;
    }

    if (isObjectLikeAlias(rhs)) {
      tsRule14ViolationCount += 1;
    }
  }
}

for (const filePath of tsxFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  hexInTsxCount += countMatches(content, /#[0-9A-Fa-f]{3,8}/g);
}

for (const filePath of cssFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  cssCommentCount += countMatches(content, /\/\*/g);
  cssHexOutsideThemeCount += countMatches(
    stripThemeBlocks(content),
    /#[0-9A-Fa-f]{3,8}/g,
  );
}

const segmentDirs = [];

const walkAppDirs = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const names = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));

  if (names.has("page.tsx") || names.has("layout.tsx")) {
    segmentDirs.push(dir);
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      walkAppDirs(path.join(dir, entry.name));
    }
  }
};

walkAppDirs(appDir);

let missingLoadingCount = 0;
let missingErrorCount = 0;
let missingNotFoundCount = 0;

for (const dir of segmentDirs) {
  if (!fs.existsSync(path.join(dir, "loading.tsx"))) {
    missingLoadingCount += 1;
  }
  if (!fs.existsSync(path.join(dir, "error.tsx"))) {
    missingErrorCount += 1;
  }
  if (!fs.existsSync(path.join(dir, "not-found.tsx"))) {
    missingNotFoundCount += 1;
  }
}

const metrics = {
  relativeImports,
  todoCount,
  functionDeclarationCount,
  hexInTsxCount,
  tsTsxCommentCount,
  cssCommentCount,
  cssHexOutsideThemeCount,
  tsRule14ViolationCount,
  missingLoadingCount,
  missingErrorCount,
  missingNotFoundCount,
};

console.table(metrics);

const hasViolation = Object.values(metrics).some((value) => value > 0);

if (hasViolation) {
  process.exit(1);
}
