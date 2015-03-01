---
layout: post
title:  "Curl noise - ofxCurlNoise"
date:   2015-02-26 10:51:00
categories: openframeworks
header-img: "curl_noise_-_ofxCurlNoise/header.png"
tags: [openFrameworks, noise]
notes: 'Addon available on Github: <a href="https://github.com/elaye/ofxCurlNoise" target="_blank">ofxCurlNoise <i class="fa fa-github"></i></a>'
lead: "Curl noise is a faster alternative to simulation for animating fluids, developped by Bridson et al. It's a procedural method based on simplex noise that gives a good control over the fluid."
---

Curl noise is a faster alternative to simulation for animating fluids, developped by Bridson et al. It's a procedural method based on simplex noise that gives a good control over the fluid. 

[ofxCurlNoise][ofxCurlNoise]{:target="_blank"} is an addon that offers the possibility to create a particle system and apply a curl noise to it, producing nice fluid-like movements.
The code for the curl noise comes from [dli/flow][dli]{:target="_blank"}.

The motion of the particles and the curl noise are calculated with a compute shader, ensuring a fast computation. Since this addon uses compute shaders and OpenGL 4.3, it is only compatible with openFrameworks 0.9.0.

There are still a lot of things to add to this addon, for instance, solid boundaries or some kind of wind effect.

Here is a demo of the addon:

<div class="figure">
	<iframe src="//player.vimeo.com/video/120776831?portrait=0&title=0&badge=0&byline=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

<!-- width="480" height="480" -->

<div class="figure">
	<a href="/img/posts/curl_noise_-_ofxCurlNoise/screenshot_1.png" data-lightbox="curl_noise" alt="Curl noise screenshot 1">
		<img src="/img/posts/curl_noise_-_ofxCurlNoise/screenshot_1.png" alt="Curl noise screenshot 1">
	</a>
</div>

<div class="figure">
	<a href="/img/posts/curl_noise_-_ofxCurlNoise/screenshot_2.png" data-lightbox="curl_noise" alt="Curl noise screenshot 2">
		<img src="/img/posts/curl_noise_-_ofxCurlNoise/screenshot_2.png" alt="Curl noise screenshot 2">
	</a>
</div>

[ofxCurlNoise]: https://github.com/elaye/ofxCurlNoise
[dli]: https://github.com/dli/flow