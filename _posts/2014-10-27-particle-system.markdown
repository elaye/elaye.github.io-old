---
layout: post
title:  "Particle system with compute shader"
date:   2014-10-27 17:40:00
categories: openframeworks
tags: [openFrameworks, particle system, compute shader, glsl]
---

Why not use OpenCL? Using OpenCL needs an installation of additional components, and context sharing between OpenCL and OpenGL can be a bit tricky. Moreover, the calculations are made for a graphical application so it seems natural to use a compute shader.

<!-- Next step: interparticle interactions. In this example we only consider the interaction between all the particles and an attractor, which results in a complexity in O(n).   -->

<img alt="particle system compute shader screenshot 1" src="/img/posts/particle_system_compute_shader_screenshot_1.png"/>

<img alt="particle system compute shader screenshot 2" src="/img/posts/particle_system_compute_shader_screenshot_2.png"/>

<img alt="particle system compute shader screenshot 3" src="/img/posts/particle_system_compute_shader_screenshot_3.png"/>