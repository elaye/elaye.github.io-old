---
layout: post
title:  "Particle system using a compute shader"
date:   2014-10-27 17:40:00
categories: openframeworks
header-img: "particle_system_compute_shader_header.png"
tags: [openFrameworks, particle system, compute shader, glsl]
notes: 'The code for the particle system is available <a href="https://github.com/elaye/particleSystemCS" target="_blank">here <i class="fa fa-github"></i></a> (oF v0.9.0 or superior)'
lead: "After playing a little with a particle system during the interactive diabolo project I wanted to make a bigger one. The one for the diabolo project had 100 000 particles and adding more particles resulted in a big performance decrease."
---

After playing a little with a particle system during the [interactive diabolo project]({% post_url 2014-09-31-interactive-diabolo %}) I wanted to make a bigger one. The one for the diabolo project had 100 000 particles and adding more particles resulted in a big performance decrease.  

The problem is that the new positon of each particle is computed and sent to the graphic card every frame. The solution is to store and compute the movements of the particles on the GPU to avoid costly memory transfers. With this comes a great benefit: the calculations are made in parallel on the GPU.

There are several ways to compute particle movements on the GPU. The old one is to store the acceleration, speed and position of the particles in a texture and to use a shader to compute the new positions. <!-- Although this works fine, it feels a little bit unnatural as the fragment  -->
Newer methods to do general computing on the GPU principally use OpenCL or OpenGL's compute shader capability. I chose to use compute shaders as they are easier to use with openFrameworks (v0.9.0) and you don't need to install additional libraries. Furthermore, the particles are directly available in the vertex and fragment shader for rendering.

The images below show 1 million particles interacting with one (hidden) attractor at 30fps on a NVIDIA GeForce GT 525M: 

<img alt="particle system compute shader screenshot 1" src="/img/posts/particle_system_compute_shader_screenshot_1.png"/>

<img alt="particle system compute shader screenshot 2" src="/img/posts/particle_system_compute_shader_screenshot_2.png"/>

<img alt="particle system compute shader screenshot 3" src="/img/posts/particle_system_compute_shader_screenshot_3.png"/>