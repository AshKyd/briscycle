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
  eleventyConfig.addPassthroughCopy("site/**/*.webp");
  eleventyConfig.addPassthroughCopy("site/**/*.txt");
  eleventyConfig.addPassthroughCopy("site/**/*.json");

  eleventyConfig.addNunjucksFilter("pageData", function () {
    const { geo, geojson } = this.ctx;
    return { geo, geojson };
  });

  eleventyConfig.addNunjucksFilter("keys", function (val) {
    return Object.keys(val);
  });

  eleventyConfig.addShortcode("ad", function () {
    return `<div class="eleventyad"><aside style="min-height: 200px">

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0801621623358731"
crossorigin="anonymous"></script>
<ins class="adsbygoogle"
style="display:block; text-align:center;"
data-ad-layout="in-article"
data-ad-format="fluid"
data-ad-client="ca-pub-0801621623358731"
data-ad-slot="5298906050"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

</aside></div>`;
  });

  eleventyConfig.addShortcode("cachebust", function () {
    return Date.now().toString();
  });

  return {
    dir: {
      input: "site",
      output: "dist",
    },
  };
};
