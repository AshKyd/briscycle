const path = require("path");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, className) {
  const { sizes, widths } = className
    ? { sizes: "50vw", widths: [1700, 1440, 960] }
    : { sizes: "100vw", widths: [3353, 1920, 1440, 1024, 800] };

  let metadata = await Image(src, {
    widths,
    formats: ["webp"],
    sharpWebpOptions: { quality: 60, effort: 6 },
    urlPath: "/images/",
    outputDir: "./dist/images/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}.${format}`;
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: className,
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
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
