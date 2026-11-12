// Build Awesome / Eleventy config for brendevr.github.io
// Build with: npx @11ty/eleventy   (output goes to _site/)

function byNewest(a, b) {
	// date descending, then front matter `order` descending (higher = newer)
	return b.date - a.date || b.data.order - a.data.order;
}

export default function (eleventyConfig) {
	// Only Markdown and Nunjucks are processed as templates.
	// Plain .html files (index.html, boilerplate.html, the old hand-written
	// posts) are NOT templates; index.html and boilerplate.html are copied through below.
	// Folders and files that are copied to the output untouched:
	eleventyConfig.addPassthroughCopy("style.css");
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("index.html");
	eleventyConfig.addPassthroughCopy("boilerplate.html");
	eleventyConfig.addPassthroughCopy("nuke_mod_blog/*.png");
	eleventyConfig.addPassthroughCopy("nuke_mod_blog/NukeBase.java");
	eleventyConfig.addPassthroughCopy("nuke_mod_blog/objs_suck_resources");

	// Render <a class="attachment"> lines as authored, without a wrapping <p>.
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.core.ruler.push("unwrap_attachment_paragraphs", (state) => {
			const t = state.tokens;
			for (let i = 0; i < t.length - 2; i++) {
				if (
					t[i].type === "paragraph_open" &&
					t[i + 1].type === "inline" &&
					t[i + 1].content.startsWith('<a class="attachment"')
				) {
					t[i].hidden = true;
					t[i + 2].hidden = true;
				}
			}
		});
	});

	// 2025-06-13 (a Date at UTC midnight) -> "2025/06/13"
	eleventyConfig.addFilter("slashDate", (d) => {
		const iso = new Date(d).toISOString().slice(0, 10);
		return iso.replaceAll("-", "/");
	});

	// All blog posts, newest first.
	eleventyConfig.addCollection("posts", (api) =>
		api.getFilteredByGlob("nuke_mod_blog/*.md").sort(byNewest),
	);
	// Posts shown on the Educational Posts page.
	eleventyConfig.addCollection("eduPosts", (api) =>
		api
			.getFilteredByGlob("nuke_mod_blog/*.md")
			.filter((p) => p.data.edu === true)
			.sort(byNewest),
	);

	return {
		templateFormats: ["md", "njk"],
		markdownTemplateEngine: false,
		htmlTemplateEngine: false,
		dir: { input: ".", output: "_site", includes: "_includes" },
	};
}
