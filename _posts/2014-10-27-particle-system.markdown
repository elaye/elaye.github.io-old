---
layout: post
title:  "Particle system using compute shader"
date:   2014-10-27 17:40:00
categories: openframeworks
header-img: "particle_system_compute_shader_header.png"
tags: [openFrameworks, particle system, compute shader, glsl]
---

<em><strong>Note:</strong> all the code in this post is a simplified version of the real one, available at [...]</em>

Particle systems are fascinating. You define a behavior for a particle, you put a lot of them together and you start to see emerging phenomena.

But to apprehend these emerging phenomena you need a lot of particles. That's how I got interested in creating a million particle system. The first program I wrote was very simple. It consisted of a Particle class and a ParticleManager class. The particle manager held all the particles in a vector and updated particles positions and drew them by iterating through this vector. This approach was correct for understanding how to create a particle system but was not very efficient as I could only have around 10 thousand particles at 30fps. 

A first improvement was to store the particles in a VBO and update their positions at each frame. But this only got me a few more thousand particles. The calculation of the particles positions on the CPU and then their transfer to the graphic card was too costly. Finally I found that I could store and update my entire particle system on the graphic card. There are several ways of doing this but I chose to store my particles in a Shader Storage Buffer Object and to update their positions with a compute shader. Then, the SSBO is accessed in the vertex shader to render the particles.

The particles contained in the SSBO are represented using the following structure:

<pre><code>struct Particle{
	ofVec4f pos;
	ofVec4f vel;
	ofVec4f acc;	
};</code>
</pre>

The SSBO is created using the ofBufferObject class provided by openFrameworks. It is initialized like this:

<pre><code class="cpp">void particleManager::setup(int n){
	// 'particles' is a vector&lt;Particle&gt;
	// 'n' is the number of particles
	particles.resize(n);
	// Method to initialize particles attributes
	initParticles();

	// Allocate and bind SSBO
	particlesBuffer.allocate(particles, GL_DYNAMIC_DRAW);
	particlesBuffer.bindBase(GL_SHADER_STORAGE_BUFFER, 0);

	// Use the SSBO for the VBO
	vbo.setVertexBuffer(particlesBuffer, 4, sizeof(Particle));

	// Load compute shader
	computeShader.setupShaderFromFile(GL_COMPUTE_SHADER, 
														"shaders/particle_compute.glsl");
	computeShader.linkProgram();
	// Load render shader
	renderShader.load("shaders/particle_vert.glsl", 
														"shaders/particle_frag.glsl");
}</code></pre>

The particles positions are then updated using the compute shader and then drawn with the render shader:

<pre><code>void particleManager::update(){
	// Update position of the attractor
	updateAttractorPosition();
	// Use compute shader program
	computeShader.begin();
		// Send attractor position to the compute shader as a uniform
		computeShader.setUniform1f("strength", 1000.0);
		computeShader.setUniform3f("attractor", 
															attractor.x, 
															attractor.y, 
															attractor.z);
		// Dispatch compute
		computeShader.dispatchCompute(n/WORK_GROUP_SIZE, 1, 1);
	computeShader.end();
}

void particleManager::draw(){
	renderShader.begin();
		vbo.draw(GL_POINTS, 0, particles.size());
	renderShader.end();
}
</code></pre>

<!-- Why not use OpenCL? Using OpenCL needs an installation of additional components, and context sharing between OpenCL and OpenGL can be a bit tricky. Moreover, the calculations are made for a graphical application so it seems natural to use a compute shader. Finally, compute shader can be used directly with openFrameworks in the last version (0.9.0). -->

To animate my particles, I used a basic gravitational interaction between the particles and a moving attractor. According to Wikipedia, <em>"[Newton's law of universal gravitation](https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation) states that any two bodies in the universe attract each other with a force that is directly proportional to the product of their masses and <strong>inversely proportional to the square of the distance between them</strong>"</em> which results in the following formula:

$$
	\mathbf{F_{1\rightarrow2}} = G\frac{m_1 m_2}{r^2}\mathbf{u}
$$

$$m_1, m_2$$ are the masses of the first and the second body

$$G$$ is the gravitational constant, which adjusts the force to describe the actual gravitational force that we observe in the nature

$$r$$ is the distance between the two bodies

$$\mathbf{u}$$ is an unitary vector which describes the direction of the force.

The important thing to remember is 

<pre><code>p[gid].acc = -strength/d*dir;
</code></pre>

So now that we know how a particle is attracted to an attractor, we need to make it move accordingly to this attraction. How do we transform this attraction in movement? The [Newton's second law](https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion#Newton.27s_second_law) states that the acceleration of a body is proportional to the sum of forces applied to it, which is resumed by this formula:

$$
	\mathbf{F} = m_1\mathbf{a}
$$

If we replace $$ \mathbf{F} $$ by its previous expression and we reduce the equation we get:

$$
	\mathbf{a} = G\frac{m_2}{r^2}\mathbf{u}
$$

Then we can find the speeds and positions of the particles by integrating the acceleration.

Here is the code of the compute shader for the calculation of the particles movements:

<pre><code class="glsl">#version 430
#extension GL_ARB_compute_shader : enable
#extension GL_ARB_shader_storage_buffer_object : enable

// Epsilon
#define EPS 0.001

// Attractor position
uniform vec3 attractor;
uniform float strength;

struct Particle{
	vec4 pos;
	vec4 vel;
	vec4 acc;
};

layout(std430, binding=0) buffer particles{
	Particle p[];
};

layout(local_size_x = 256, local_size_y = 1, local_size_z = 1) in;

void main(){
	uint gid = gl_GlobalInvocationID.x;

    vec4 dir = vec4(attractor, 1.0) - p[gid].pos;

    float d = dot(dir, dir);
    
    p[gid].acc = strength/(d + EPS)*normalise(dir);
    
    p[gid].vel += p[gid].acc;
    p[gid].pos += p[gid].vel;
}
</code></pre>

The 'strength' float is used as a parameter to scale the force, it can be seen as the $$ Gm_2 $$ coefficient in the gravitation's law. The constant EPS is used to avoid a division by zero in case the attractor and the particle have the same position.

You can notice that we didn't considered the attraction of the particles on the attractor. I considered that the mass of a particle compared to the mass of the attractor was negligible. However, since there is a huge amount of particles, we could consider the center of mass of the particles cloud and make it interact with the attractor.

This particle system is not physically accurate: Eulerian approach... but it is visually satisfying.

This particle system is really simple and it only considers interactions between the particles and a limited number of interactors, which results in a $$ O(n) $$ complexity. However, if you start to consider inter-particles interactions, this gives you a $$ O(n^2) $$ complexity, reducing significantly the amount of particles you can simulate in your system. There are ways to deal with this, but it will be the subject of a future post.

<!-- The most common way to deal with this, is to consider that interactions between distant particles are negligible (it only works if your interactions are distance-dependent of course). There are two ways of implementing this: octrees (or quadtrees in 2D) or spatial binning.   -->

<!-- Next step: interparticle interactions. In this example we only consider the interaction between all the particles and an attractor, which results in a complexity in O(n).   -->

<img alt="particle system compute shader screenshot 1" src="/img/posts/particle_system_compute_shader_screenshot_1.png"/>

<img alt="particle system compute shader screenshot 2" src="/img/posts/particle_system_compute_shader_screenshot_2.png"/>

<img alt="particle system compute shader screenshot 3" src="/img/posts/particle_system_compute_shader_screenshot_3.png"/>