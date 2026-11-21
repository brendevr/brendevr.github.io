import markdownItAnchor from 'markdown-it-anchor';

function byNewest(a, b) {
	return b.date - a.date;
}

export default function (eleventyConfig) {
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAnchor, { slugify: eleventyConfig.getFilter("slugify") }));

	eleventyConfig.addPassthroughCopy("style.css");
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("index.html");
	eleventyConfig.addPassthroughCopy("boilerplate.html");
	eleventyConfig.addPassthroughCopy("nuke_mod_blog/assets");
	eleventyConfig.addPassthroughCopy("fabric_moddev_tutorials/assets");

	eleventyConfig.addFilter("slashDate", (d) => {
		const iso = new Date(d).toISOString().slice(0, 10);
		return iso.replaceAll("-", "/");
	});
	
	eleventyConfig.addCollection("nuke_mod_blog", (api) => {
		const posts = api.getFilteredByGlob("nuke_mod_blog/*.md").sort(byNewest);
		return posts;
	});

	eleventyConfig.addCollection("fabric_moddev_tutorials", (api) => {
		const posts = api.getFilteredByGlob("fabric_moddev_tutorials/*.md").sort(byNewest);
		return posts;
	});

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
