import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	{ ignores: [".next/**", "node_modules/**", "public/**", ".open-next/**", "dist/**", "*.js"] },
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		plugins: {
			i18next: (await import("eslint-plugin-i18next")).default,
		},
		rules: {
			"i18next/no-literal-string": [
				"error",
				{
					markupOnly: true,
					ignoreAttribute: [
						"className",
						"href",
						"name",
						"type",
						"ref",
						"key",
						"stroke",
						"strokeWidth",
						"fill",
						"strokeLinecap",
						"strokeLinejoin",
						"viewBox",
						"width",
						"height",
						"xmlns",
						"src",
						"alt",
						"id",
						"sizes",
						"srcSet",
						"rel",
						"target",
						"role",
						"aria-label",
						"variant",
						"size",
						"as",
						"asChild",
						"aria-hidden",
						"style",
						"layout",
						"initial",
						"animate",
						"exit",
						"transition",
						"x",
						"y",
						"d",
						"fillRule",
						"clipRule",
						"dir",
						"lang"
					],
					ignoreFunctions: [
						"t",
						"require",
						"import",
						"clsx",
						"cva",
						"cn"
					],
					ignorePattern: [
						"^✓",
						"^—",
						"^·",
						"^\\.",
						"^#[0-9a-fA-F]{3,8}$", // Hex colors
						"^[0-9]+$", // Numbers
						"^(true|false|null|undefined)$", // Common keywords
						"^/", // paths
						"^https?://", // URLs
						"^[a-z_]+$", // Material Icons / snake_case Technical IDs
						"^\\s*[a-z_]+\\s*$" // Material symbols with spaces
					]
				},
			],
		},
	},
];

export default eslintConfig;
