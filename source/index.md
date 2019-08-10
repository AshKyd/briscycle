---
title: Cycling in Brisbane
layout: custom
showHeader: false
---

<div class="home-hero">
  <div class="home-hero__content">
    <div class="container">
      <h1 class="home-hero__line1">Cycling<br> in Brisbane</h1>
      <p class="home-hero__line2">Visiting Brisbane, or just looking for a day trip on the bike? Briscycle is your #1 resource for riding around Brisbane by bike.</p>
      <button
        class="btn btn-primary"
        onclick="javascript: document.querySelector('[name=content]').scrollIntoView({ behavior: 'smooth' })">Find out more</button>
    </div>
  </div>
  <picture>
      <source data-srcset="/images/bne-828.jpg"
              media="(max-width: 414px)">
      <source data-srcset="/images/bne-1024.jpg"
              media="(max-width: 768px)">
      <source data-srcset="/images/bne-1920.jpg"
              media="(max-width: 1920px)">
      <source data-srcset="/images/bne-max.webp"
        type="image/webp"
        media="(min-width: 1920px)">
      <img class="home-hero__image lazyload" data-src="/images/bne-max.jpg" alt="" />
  </picture>
</div>
<a name="content"></a>

<style type="text/css">
body{
  background:#DFF1FF;
}
.entry-content > p{
  display:none;
}
.home-hero{
  min-height:70vh;
  width:100%;
  position:relative;
  background: white;
  overflow:hidden;
}
.home-hero__line1 {
  font-weight: bold;
  text-shadow: 3px 3px 0 white;
  text-align:left;
  font-size:3.5em;
  margin-bottom:-0.5em;
  color: #2196f3;
}
.home-hero__line2{
  width: 45%;
  font-weight: normal;
  text-shadow: 1px 1px 0 white;
  text-align:left;
}
.home-hero__content{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:2;
}
.home-hero__image{
  width:100%;
  position:absolute;
  right:0;
  bottom:0;
  z-index:1;
}

@media (max-width: 415px){
  .home-hero__line1,
  .home-hero__line2{
    width:auto;
  }
}
</style>
