# Card icons

[Bootstrap Icons](https://icons.getbootstrap.com/) (MIT), copied in as-is and recoloured white
to match the hand-drawn icons under `content/bicycle-regulation/`. Card icons load through
`<img>`, where no CSS applies and Bootstrap's default `currentColor` would render black against
the coloured card thumbnail.

Pages reference these by URL in front matter `icon:`. To add one, download the SVG from
Bootstrap Icons, change `fill="currentColor"` to `fill="white"`, and drop it in here.
