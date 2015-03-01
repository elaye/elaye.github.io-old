---
layout: post
title:  "ofxMarkovChain"
date:   2014-12-04 14:38:00
categories: openframeworks
header-img: "ofxMarkovChain_header.png"
tags: [openFrameworks, ofxAddon, Markov chain]
notes: 'Addon available on Github: <a href="https://github.com/elaye/ofxMarkovChain" target="_blank">ofxMarkovChain</em> <i class="fa fa-github"></i></a>'
lead: "ofxMarkovChain is an addon for openFrameworks that allows you to use Markov chains in a simple way."
---

[ofxMarkovChain][ofxMarkovChain]{:target="_blank"} is an addon for openFrameworks that allows you to use Markov chains in a simple way.

A [Markov chain][Markov chain]{:target="_blank"} is a mathematical system that includes a certain number of states. The transition from one state to another is determined by a probability. An interesting property of Markov chains is that the next transition only depends on the current state, thus making them memoryless. Here is a state diagram of a simple Markov chain with 2 states:

<div class="figure">
	<img src="/img/posts/ofxMarkovChain_markov_chain.png" alt="Markov chain">
</div>
<br>

If the system is in the state $$A$$, then the probability to stay in that state is $$0.3$$ and the probability to be in state $$B$$ is $$0.7$$. Now, this system can be represented as a matrix:

$$
	P = \begin{bmatrix}
0.3 & 0.7 \\
0.9 & 0.1
\end{bmatrix}
$$

You can notice that in order for the Markov chain to be coherent, the sum of the coefficients of each row of the matrix must be equal to $$1$$. 

An example provided with [ofxMarkovChain][ofxMarkovChain]{:target="_blank"} is a random walker. The walker uses a Markov chain to choose in which direction to go next. The Markov chain has 4 states, each state corresponding to a direction: up, down, left or right. 

<div class="figure">
	<img src="/img/posts/ofxMarkovChain_random_walker.png" alt="Random walker">
</div>

[Markov chain]: https://en.wikipedia.org/wiki/Markov_chain
[ofxMarkovChain]: https://github.com/elaye/ofxMarkovChain