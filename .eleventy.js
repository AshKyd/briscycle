module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("site/**/*.jpg");
  eleventyConfig.addPassthroughCopy("site/**/*.png");
  eleventyConfig.addPassthroughCopy("site/**/*.ico");
  eleventyConfig.addPassthroughCopy("site/**/*.svg");
  eleventyConfig.addPassthroughCopy("site/**/*.webm");
  eleventyConfig.addPassthroughCopy("site/**/*.txt");

  eleventyConfig.addNunjucksFilter("pageData", function () {
    const { geo, geojson } = this.ctx;
    return { geo, geojson };
  });

  eleventyConfig.addShortcode("ad", function () {
    return `<ins class="adsbygoogle"
style="display:block; text-align:center;"
data-ad-layout="in-article"
data-ad-format="fluid"
data-ad-client="ca-pub-0801621623358731"
data-ad-slot="5298906050"></ins>`;
  });

  return {
    dir: {
      input: "site",
      output: "dist",
    },
  };
};
