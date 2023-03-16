---
title: Cycling in Brisbane
layout: custom
description: Briscycle is your number one destination for bike paths, maps, and cycling in Brisbane and surrounding areas.
showHeader: false
related: home
---

<div class="home-hero">
  <div class="container">
    <div class="home-hero__text-container">
      <h1 class="home-hero__line1 type-serif">Cycling<br> in Brisbane</h1>
      <p class="home-hero__line2">Visiting Brisbane, or just looking for a day trip on the bike? Briscycle is your #1 resource for maps, bike paths and riding around Brisbane by bike.</p>
      <button
        class="btn btn-primary"
        onclick="javascript: document.querySelector('[name=content]').scrollIntoView({ behavior: 'smooth' })">Find out more</button>
    </div>
  </div>
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
  min-height:57vh;
  width:100%;
  position:relative;
  overflow:hidden;
  display:flex;
  align-items: flex-end;
}
.home-hero .container{
  display:flex;
  align-items: center;
  justify-content: flex-end
}
.home-hero__text-container{
  color:black;
  padding:30px;
  border-radius:10px;
  width:50%;
  background:#fff;
  margin-bottom:50px;
}
.home-hero__line1 {
  font-weight: bold;
  text-align:left;
  font-size:2em;
  margin:0 0 0.25em 0;
  line-height:1;
}


.home-hero{
  background: #075697 url('/images/homepage/desktop-1366.webp') no-repeat center;
  background-size: cover;
}

@media(min-width: 1367px){
  .home-hero{
    background-image: url('/images/homepage/desktop-1920.webp')
  }
}

@media(min-width: 1921px){
  .home-hero{
    background-image: url('/images/homepage/desktop-3840.webp')
  }
}

@media (max-width:767px){
  .home-hero{
    background-image: url('/images/homepage/mobile-1440.webp')
  }
  .home-hero__text-container{
    width:70%;
  }
}

@media (max-width: 415px){
  .home-hero{
    background-image: url('/images/homepage/mobile-750.webp');
  }
  .home-hero__line1{
    font-size: 1.5em;
  }
  .home-hero__text-container{
    width:80%;
    font-size:0.8em;
  }
  
}
</style>
