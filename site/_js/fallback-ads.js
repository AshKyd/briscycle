const ads = [
  {
    id: "youtube",
    title: "Follow me on Youtube",
    description:
      "Hey, I also have a Youtube channel. Join me as I travel around Queensland, Australia, the world!",
    cta: "Follow me?",
    link: "https://ashk.au/yt",
    style:
      "--eleventyad-button-background:#c60000;--eleventyad-button-color:white",
  },
  {
    id: "foodbank",
    title: "One dollar donated is two meals created",
    description:
      "More than 2 million households ran out of food in the last year. Since you blocked ads, would you consider giving to Foodbank?",
    cta: "Foodbank Queensland",
    link: "https://www.foodbank.org.au/?state=qld",
    style:
      "--eleventyad-button-background:#671e75;--eleventyad-button-color:#fff",
  },
  {
    id: "bcc-compost",
    title: "BCC compost rebate program",
    description:
      "Did you know you can cut your greenhouse emissions and get a $70 rebate from Brisbane Council when you buy a compost system or worm farm?",
    cta: "Rebate info",
    link: "https://www.brisbane.qld.gov.au/clean-and-green/green-home-and-community/sustainable-gardening/compost-and-food-waste-recycling/compost-rebate-program",
    style:
      "--eleventyad-button-background:#006bb7;--eleventyad-button-color:white",
  },
  {
    id: "aussiebb",
    title: "Switch to Aussie Broadband and save $50",
    description:
      "Since you blocked ads, I thought I'd paste my Aussie Broadband referral code :P If you sign up for a broadband plan with code '3829918' you'll get $50 off.",
    cta: "See plans",
    link: "https://www.aussiebroadband.com.au/internet/nbn-plans/",
    style:
      "--eleventyad-button-background:#01711b;--eleventyad-button-color:rgb(253 250 170)",
  },
  {
    id: "bnesocial",
    title: "Join the Brisbane Mastodon",
    description:
      "Share your rides, get the latest news, and hang out with other peeps for free and without ads in the bne.social community #CyclingBrisbane",
    cta: "Check it out",
    link: "https://bne.social/",
    style:
      "--eleventyad-button-background:#6364ff;--eleventyad-button-color:white",
  },
];

function runFallbacks(adBlocks) {
  let adIndex = Number(get("fallbackRotation", 0, "sessionStorage"));

  adBlocks.forEach((block, i) => {
    // if (i < adBlocks.length - 1) {
    //   block.style.display = "none";
    // }

    const ad = ads[adIndex++];
    if (adIndex > ads.length - 1) {
      adIndex = 0;
    }

    const adElement = block.querySelector("aside");
    adElement.innerHTML = `
			<a href="${
        ad.link
      }" target="_blank" rel="noopener" class="eleventyad-fallback" style="${
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
    const anchor = adElement?.querySelector("a");
    anchor.addEventListener("click", () => {
      fireEvent("fallback-ads__" + ad.id);
    });
  });
  set("fallbackRotation", adIndex, "sessionStorage");
  fireEvent("fallback-ads");
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

async function initFallbackAds() {
  const adBlocks = document.querySelectorAll(".eleventyad");
  if (!adBlocks.length) {
    return;
  }
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

initFallbackAds();
