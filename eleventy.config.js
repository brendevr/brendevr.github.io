
function byNewest(a, b) {
	return b.date - a.date || b.data.order - a.data.order;
}

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("style.css");
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("index.html");
	eleventyConfig.addPassthroughCopy("boilerplate.html");
	eleventyConfig.addPassthroughCopy("nuke_mod_blog/assets");

	eleventyConfig.addFilter("slashDate", (d) => {
		const iso = new Date(d).toISOString().slice(0, 10);
		return iso.replaceAll("-", "/");
	});

	eleventyConfig.addCollection("posts", (api) =>
		api.getFilteredByGlob("nuke_mod_blog/*.md").sort(byNewest),
	);
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
