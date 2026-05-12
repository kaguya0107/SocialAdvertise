import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  { ignores: ["node_modules", ".next", "dist", ".output", ".vinxi"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintPluginPrettier,
];
