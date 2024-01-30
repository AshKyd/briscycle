const path = require("path");
const Image = require("@11ty/eleventy-img");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

async function imageShortcode(src, alt, className, caption) {
  const { sizes, widths } = className
    ? { sizes: "50vw", widths: [1700, 1440, 960] }
    : { sizes: "100vw", widths: [3353, 1920, 1440, 1024, 800] };

  let metadata = await Image(src, {
    widths,
    formats: ["avif"],
    sharpAvifOptions: { quality: 50, effort: 7 },
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
    class: caption ? "" : className,
    'data-zoom-src': metadata.avif[metadata.avif.length-1].url
  };

  // return`<pre>${JSON.stringify(metadata,null,2)}</pre>`

  const imageHtml = Image.generateHTML(metadata, imageAttributes);

  if (caption) {
    return `<figure class="${className}">${imageHtml}<figcaption>${caption}</figcaption></figure>`;
  }

  return imageHtml;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
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
  eleventyConfig.addPassthroughCopy("site/**/*.avif");

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

  eleventyConfig.addNunjucksFilter("shortName", function (post) {
    return post.shortTitle || post.title;
  });

  eleventyConfig.addShortcode(
    "youtube",
    function (src, title = "YouTube video player") {
      const url = new URL(src);

      const id = url.searchParams.get("v");
      const start = (url.searchParams.get("t") || "0s").replace("s", "");
      const list = url.searchParams.get("list") || "";
      const index = url.searchParams.get("index") || 0;

      const playlist = list ? `&list=${list}&index=${index}&loop=1` : "";

      const iframeUrl = `https://www.youtube.com/embed/${id}?rel=0&widget_referrer=briscycle.com&start=${start}${playlist}`;

      return `<div class="video">
    <iframe loading="lazy" width="560" height="315" src="${iframeUrl}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
    }
  );

  return {
    dir: {
      input: "site",
      output: "dist",
    },
  };
};
