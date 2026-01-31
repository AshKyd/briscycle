import path from "node:path";
import Image from "@11ty/eleventy-img";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import * as esbuild from "esbuild";

async function imageShortcode(src, alt, className, caption) {
  const { sizes, widths } = className
    ? { sizes: "50vw", widths: [3353, 1920, 1440, 960] }
    : { sizes: "100vw", widths: [3353, 1920, 1440, 1024, 800] };
  const dirUpName = path.basename(path.dirname(src));

  const filenameFormat = function (id, src, width, format, options) {
    const extension = path.extname(src);
    const name = path.basename(src, extension);
    return `inline-${name}-${width}.${format}`;
  };
  const avifMetadata = await Image(src, {
    widths,
    formats: ["avif"],
    sharpAvifOptions: { quality: 60, effort: 9, chromaSubsampling: "4:2:0" },
    urlPath: `/images/avif/${dirUpName}/`,
    outputDir: `./dist/images/avif/${dirUpName}/`,
    filenameFormat,
  });
  const jpegMetadata = await Image(src, {
    widths: [960],
    formats: ["jpeg"],
    sharpJpegOptions: { quality: 75, mozjpeg: true },
    urlPath: `/images/avif/${dirUpName}/`,
    outputDir: `./dist/images/avif/${dirUpName}/`,
    filenameFormat,
  });

  const metadata = { jpegMetadata, ...avifMetadata };

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: caption ? "" : className,
    "data-zoom-src": metadata.avif[metadata.avif.length - 1].url,
  };

  // return`<pre>${JSON.stringify(metadata,null,2)}</pre>`')
  const imageHtml = Image.generateHTML(metadata, imageAttributes);

  if (caption) {
    return `<figure class="${className}">${imageHtml}<figcaption>${caption}</figcaption></figure>`;
  }

  return imageHtml;
}

async function imageFilter(src, widths = [], format, quality = 60, prefix) {
  const callback = arguments[arguments.length - 1];
  if (!widths || !widths.length) {
    console.log("nully widths", widths);
    return callback(null, []);
  }

  const dirUpName = path.basename(path.dirname(src));

  const filenameFormat = function (id, src, width, format, options) {
    const extension = path.extname(src);
    const name = path.basename(src, extension);
    const filename = `${
      typeof prefix === "string" ? prefix : dirUpName
    }-${name}-${width}.${format}`;

    return filename;
  };
  const resolvedSrc = path.resolve(import.meta.dirname, "site", src.slice(1));
  const imageMetadata = await Image(resolvedSrc, {
    widths,
    formats: [format],
    sharpAvifOptions: { quality, effort: 9, chromaSubsampling: "4:2:0" },
    sharpJpegOptions: { quality, mozjpeg: true },
    urlPath: `/images/avif/${dirUpName}/`,
    outputDir: `./dist/images/avif/${dirUpName}/`,
    filenameFormat,
  });

  return callback(null, Object.values(imageMetadata)[0]);
}

function srcsetFilter(images) {
  return images.map(({ url, width }) => `${url} ${width}w`).join();
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncFilter("image", imageFilter);
  eleventyConfig.addNunjucksFilter("srcset", srcsetFilter);
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

  // 1. Watch the JS source directory
  eleventyConfig.addWatchTarget("./site/_js/**/*.js");

  // 2. Run esbuild after Eleventy finishes building
  eleventyConfig.on("eleventy.after", async ({ runMode }) => {
    console.log(`[esbuild] Building JS in ${runMode} mode...`);
    await esbuild.build({
      entryPoints: ["site/_js/index.js"],
      bundle: true,
      outfile: "dist/index.js",
      minify: runMode === "build",
      sourcemap: runMode !== "build",
      target: "es2020",
      logLevel: "warning",
    });
  });

  eleventyConfig.addNunjucksFilter("pageData", function () {
    const { geo, geojson } = this.ctx;
    return { geo, geojson };
  });

  eleventyConfig.addNunjucksFilter("headerClass", function (title) {
    return title.split(" ").length > 3
      ? "article-header--long"
      : "article-header--short";
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
}
