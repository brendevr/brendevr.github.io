// Directory data for everything in nuke_mod_blog/.
// Posts get the post layout, and keep file-style URLs (/nuke_mod_blog/premath.html, not /nuke_mod_blog/premath/).
export default {
	layout: "post.njk",
	permalink: (data) => `${data.page.filePathStem}.html`,
	eleventyComputed: {
		// Nunjucks can't read a hyphenated name like `extra-description` directly,
		// so expose the optional front matter field under a template-friendly name.
		extraDescription: (data) => data["extra-description"],
	},
};
