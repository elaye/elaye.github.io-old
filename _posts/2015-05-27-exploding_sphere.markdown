---
layout: post
title:  "Splash screen interactive animation"
date:   2015-05-27 16:55:00
categories: Three.js
header-img: "splash/header.png"
tags: [openFrameworks]
notes: 'Check out the <a href="/demo_sphere.html">demo <i class="fa fa-cube"></i></a> with parameters'
lead: "Exploding sphere with Three.js"
---

After spending quite some time using openFrameworks, I decided it was time to learn something new. 
So I started to learn how to use [Three.js][threejs]{:target="_blank"} and I made a small interactive animated sphere for the first page of my website. 

In the initial state, the sphere is animated by small undulations.
When the mouse is over the sphere, the undulations stop moving and an explosion appears where the mouse is pointing, as if the time was frozen in the middle of an explosion.
When the mouse goes out of the sphere, the time rewinds, making the explosion disappear.

The explosion effect is made using a vertex shader to displace the faces of the mesh.

<div class="figure">
	<a href="/img/posts/splash/1.png" data-lightbox="exploding_sphere" alt="Exploding sphere 1">
		<img src="/img/posts/splash/1.png" alt="Exploding sphere 1">
	</a>
</div>

In the [demo][demo]{:target="_blank"} you can change various parameters, like the dependence on the position on the sphere of the noise or the lighting.

<div class="figure">
	<a href="/img/posts/splash/2.png" data-lightbox="exploding_sphere" alt="Exploding sphere 2">
		<img src="/img/posts/splash/2.png" alt="Exploding sphere 2">
	</a>
</div>

<div class="figure">
	<a href="/img/posts/splash/3.png" data-lightbox="exploding_sphere" alt="Exploding sphere 3">
		<img src="/img/posts/splash/3.png" alt="Exploding sphere 3">
	</a>
</div>

<div class="figure">
	<a href="/img/posts/splash/4.png" data-lightbox="exploding_sphere" alt="Exploding sphere 4">
		<img src="/img/posts/splash/4.png" alt="Exploding sphere 4">
	</a>
</div>

<div class="figure">
	<a href="/img/posts/splash/5.png" data-lightbox="exploding_sphere" alt="Exploding sphere 5">
		<img src="/img/posts/splash/5.png" alt="Exploding sphere 5">
	</a>
</div>

[demo]: https://elaye.github.io/demo_sphere.html
[threejs]: http://threejs.org/