---
layout: post
title:  "Spirograph"
date:   2015-03-12 13:45:00
categories: openframeworks
header-img: "spirograph/header.png"
tags: [openFrameworks]
notes: 'Check out the <a href="/demo_spirograph/index.html">live demo <i class="fa fa-cube"></i></a><br>Code available on GitHub: <a href="https://github.com/elaye/spirograph" target="_blank">Spirograph <i class="fa fa-github"></i></a>'
lead: "Spirograph"
---

Have you ever played with a [spirograph][spirograph-wiki]{:target="_blank"}? For those who don't know, it's a geometric drawing toy. In it's basic form, it comprises a ring and a wheel with little holes in it. To draw with it, you place the wheel inside the ring, you place a pen into one of the holes of the wheel and you move it around the inside of the ring. Here is a schema:

<div class="figure">
	<img src="/img/posts/spirograph/spirograph.png" alt="Spirograph diagram">
</div>

All the geometric figures produced by a spirograph can be described by the following parametric curve:

$$
x(t) = (R-r)\cos t + \rho \cos \frac{R-r}{r}t\\
y(t) = (R-r)\sin t - \rho \sin \frac{R-r}{r}t
$$

I made a program with openFrameworks that can draw such curves, it is available on [GitHub][spirograph-github]{:target="_blank"}.

The amazing thing with this is that a very few number of parameters (3) can produce a huge variety of figures. Here are some of them:

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_1.png" data-lightbox="spirograph" alt="Spirograph 1">
			<img src="/img/posts/spirograph/normal/spirograph_1.png" alt="Spirograph 1">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_2.png" data-lightbox="spirograph" alt="Spirograph 2">
			<img src="/img/posts/spirograph/normal/spirograph_2.png" alt="Spirograph 2">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_3.png" data-lightbox="spirograph" alt="Spirograph 3">
			<img src="/img/posts/spirograph/normal/spirograph_3.png" alt="Spirograph 3">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_4.png" data-lightbox="spirograph" alt="Spirograph 4">
			<img src="/img/posts/spirograph/normal/spirograph_4.png" alt="Spirograph 4">
		</a>
	</div>
</div>

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_5.png" data-lightbox="spirograph" alt="Spirograph 5">
			<img src="/img/posts/spirograph/normal/spirograph_5.png" alt="Spirograph 5">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_6.png" data-lightbox="spirograph" alt="Spirograph 6">
			<img src="/img/posts/spirograph/normal/spirograph_6.png" alt="Spirograph 6">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_7.png" data-lightbox="spirograph" alt="Spirograph 7">
			<img src="/img/posts/spirograph/normal/spirograph_7.png" alt="Spirograph 7">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_8.png" data-lightbox="spirograph" alt="Spirograph 8">
			<img src="/img/posts/spirograph/normal/spirograph_8.png" alt="Spirograph 8">
		</a>
	</div>
</div>

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_9.png" data-lightbox="spirograph" alt="Spirograph 9">
			<img src="/img/posts/spirograph/normal/spirograph_9.png" alt="Spirograph 9">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_10.png" data-lightbox="spirograph" alt="Spirograph 10">
			<img src="/img/posts/spirograph/normal/spirograph_10.png" alt="Spirograph 10">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_11.png" data-lightbox="spirograph" alt="Spirograph 11">
			<img src="/img/posts/spirograph/normal/spirograph_11.png" alt="Spirograph 11">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/normal/spirograph_12.png" data-lightbox="spirograph" alt="Spirograph 12">
			<img src="/img/posts/spirograph/normal/spirograph_12.png" alt="Spirograph 12">
		</a>
	</div>
</div>

After reading [this][oftenpaper]{:target="_blank"}, I added a spirality parameter.
Here are some of the figures I produced using this parameter:

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_1.png" data-lightbox="spirograph" alt="Spirograph 1">
			<img src="/img/posts/spirograph/spiral/spirograph_1.png" alt="Spirograph 1">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_2.png" data-lightbox="spirograph" alt="Spirograph 2">
			<img src="/img/posts/spirograph/spiral/spirograph_2.png" alt="Spirograph 2">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_3.png" data-lightbox="spirograph" alt="Spirograph 3">
			<img src="/img/posts/spirograph/spiral/spirograph_3.png" alt="Spirograph 3">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_4.png" data-lightbox="spirograph" alt="Spirograph 4">
			<img src="/img/posts/spirograph/spiral/spirograph_4.png" alt="Spirograph 4">
		</a>
	</div>
</div>

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_5.png" data-lightbox="spirograph" alt="Spirograph 5">
			<img src="/img/posts/spirograph/spiral/spirograph_5.png" alt="Spirograph 5">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_6.png" data-lightbox="spirograph" alt="Spirograph 6">
			<img src="/img/posts/spirograph/spiral/spirograph_6.png" alt="Spirograph 6">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_7.png" data-lightbox="spirograph" alt="Spirograph 7">
			<img src="/img/posts/spirograph/spiral/spirograph_7.png" alt="Spirograph 7">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_8.png" data-lightbox="spirograph" alt="Spirograph 8">
			<img src="/img/posts/spirograph/spiral/spirograph_8.png" alt="Spirograph 8">
		</a>
	</div>
</div>

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_9.png" data-lightbox="spirograph" alt="Spirograph 9">
			<img src="/img/posts/spirograph/spiral/spirograph_9.png" alt="Spirograph 9">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_10.png" data-lightbox="spirograph" alt="Spirograph 10">
			<img src="/img/posts/spirograph/spiral/spirograph_10.png" alt="Spirograph 10">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_11.png" data-lightbox="spirograph" alt="Spirograph 11">
			<img src="/img/posts/spirograph/spiral/spirograph_11.png" alt="Spirograph 11">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_12.png" data-lightbox="spirograph" alt="Spirograph 12">
			<img src="/img/posts/spirograph/spiral/spirograph_12.png" alt="Spirograph 12">
		</a>
	</div>
</div>

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_13.png" data-lightbox="spirograph" alt="Spirograph 13">
			<img src="/img/posts/spirograph/spiral/spirograph_13.png" alt="Spirograph 13">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_14.png" data-lightbox="spirograph" alt="Spirograph 14">
			<img src="/img/posts/spirograph/spiral/spirograph_14.png" alt="Spirograph 14">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_15.png" data-lightbox="spirograph" alt="Spirograph 15">
			<img src="/img/posts/spirograph/spiral/spirograph_15.png" alt="Spirograph 15">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_16.png" data-lightbox="spirograph" alt="Spirograph 16">
			<img src="/img/posts/spirograph/spiral/spirograph_16.png" alt="Spirograph 16">
		</a>
	</div>
</div>

<div class="grid">
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_17.png" data-lightbox="spirograph" alt="Spirograph 17">
			<img src="/img/posts/spirograph/spiral/spirograph_17.png" alt="Spirograph 17">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_18.png" data-lightbox="spirograph" alt="Spirograph 18">
			<img src="/img/posts/spirograph/spiral/spirograph_18.png" alt="Spirograph 18">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_19.png" data-lightbox="spirograph" alt="Spirograph 19">
			<img src="/img/posts/spirograph/spiral/spirograph_19.png" alt="Spirograph 19">
		</a>
	</div>
	<div class="col-1-4">
		<a href="/img/posts/spirograph/spiral/spirograph_20.png" data-lightbox="spirograph" alt="Spirograph 20">
			<img src="/img/posts/spirograph/spiral/spirograph_20.png" alt="Spirograph 20">
		</a>
	</div>
</div>

[spirograph-wiki]: https://en.wikipedia.org/wiki/Spirograph
[spirograph-github]: https://github.com/elaye/spirograph
[oftenpaper]: http://www.oftenpaper.net/permanent-cyclotron4000.htm