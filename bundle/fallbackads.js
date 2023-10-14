import { crel } from "./util.js";
import { get, set } from "./storage.js";

const ads = [
  {
    title: "Follow me on Youtube",
    description:
      "Hey, I also have a Youtube channel. Join me as I travel around Queensland, Australia, the world!",
    cta: "Follow me?",
    link: "https://ash.ms/yt",
    style:
      "--eleventyad-button-background:#c60000;--eleventyad-button-color:white",
  },
  {
    title: "One dollar donated is two meals created",
    description:
      "More than 2 million households ran out of food in the last year. Since you blocked ads, would you consider giving to Foodbank?",
    cta: "Foodbank Queensland",
    link: "https://www.foodbank.org.au/?state=qld",
    style:
      "--eleventyad-button-background:#671e75;--eleventyad-button-color:#fff",
  },
  {
    title: "BCC compost rebate program",
    description:
      "Did you know you can cut your greenhouse emissions and get a $70 rebate from Brisbane council when you buy a compost system or worm farm?",
    cta: "More info",
    link: "https://www.brisbane.qld.gov.au/clean-and-green/green-home-and-community/sustainable-gardening/compost-and-food-waste-recycling/compost-rebate-program",
  },
];

function runFallbacks(adBlocks) {
  let adIndex = Number(get("fallbackRotation", 0, "sessionStorage"));

  adBlocks.forEach((block, i) => {
    if (i < adBlocks.length - 1) {
      block.style.display = "none";
    }

    const ad = ads[adIndex++];
    if (adIndex > ads.length - 1) {
      adIndex = 0;
    }

    const adElement = block.querySelector("aside");
    adElement.innerHTML = `
			<a href="${ad.link}" rel="noopener" class="eleventyad-fallback" style="${
      ad.style || ""
    }">
				<div class="eleventyad-fallback__left">
					<h3>${ad.title}</h3>
					<p>${ad.description}</p>
				</div>
				<div class="eleventyad-fallback__right"><div class="eleventyad-fallback__button">${
          ad.cta
        }</div></div>
			</a>
		  `;
  });

  set("fallbackRotation", adIndex, "sessionStorage");
  umami("fallback-ads");
}

function isPixelBlocked() {
  return new Promise((resolve, reject) => {
    const img = crel("img", {
      src: "https://apps.facebook.com/favicon.ico",
      width: 1,
      height: 1,
      referrerPolicy: "no-referrer",
    });
    img.addEventListener("error", () => {
      resolve(true);
    });
    img.addEventListener("load", () => {
      resolve(false);
    });
  });
}

function observeProps(element, callback) {
  const observer = new MutationObserver(callback);
  observer.observe(element, { attributes: true });
}

export async function initFallbackAds() {
  const adBlocks = document.querySelectorAll(".eleventyad");
  const firstAside = adBlocks[0].querySelector("aside");
  const isAdblocked =
    getComputedStyle(adBlocks[0].querySelector(".adsbygoogle")).display ===
      "none" ||
    getComputedStyle(firstAside).height === "0px" ||
    (await isPixelBlocked());

  if (isAdblocked) {
    return runFallbacks(adBlocks);
  }

  // Safari blocks ads later

  observeProps(firstAside, () => {
    const computedStyle = getComputedStyle(firstAside);
    if (computedStyle.height === "0px") {
      runFallbacks(adBlocks);
    }
  });
}
