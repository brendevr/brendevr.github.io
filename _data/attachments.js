import fs from "node:fs";

const root = "nuke_mod_blog/assets/project_files";

export default Object.fromEntries(
	fs.readdirSync(root, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => [d.name, fs.readdirSync(`${root}/${d.name}`)]),
);
