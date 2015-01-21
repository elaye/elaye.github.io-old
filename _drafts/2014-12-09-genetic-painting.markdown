---
layout: post
title:  "Genetic painting"
date:   2014-12-09 14:00:00
categories: openframeworks
header-img: "genetic_painting_header.png"
tags: [openFrameworks, genetic algorithm, painting]
---

During my last year in Art, Science and Technology Masters I had the opportunity to attend a short course on genetic programming. Unfortunately I didn't have the chance to implement a genetic algorithm at the time. And recently, I stumbled upon this amazing article: [Genetic Programming: Evolution of Mona Lisa](http://rogeralsing.com/2008/12/07/genetic-programming-evolution-of-mona-lisa/). 

Fitness function
----------------

Breeding and mutations
----------------------

Performance improvment
----------------------

My program was functionning well but it was very slow. It occured that the main bottleneck was the evaluation of the fitness of individuals. The fitness function essentially calculates a distance between two images. This distance is the sum of the distances between corresponding pixels of the two images. This operation can be easily parallelizable, so I did it using a compute shader.