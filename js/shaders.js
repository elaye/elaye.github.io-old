var shaders = {
	"vertex": [
			"precision highp float;",
			shaderUtil["common"],
			shaderUtil["distributions"],
			shaderUtil["snoise4D"],
			shaderUtil["quaternionOperations"],
			"uniform vec3 center;",
			"uniform vec3 intPos;",
			"uniform vec3 lightPos1;",
			"uniform vec3 lightPos2;",
			"uniform float time;",
			"uniform float bMouseOver;",
			// "uniform float mouseOverCnt;",
			"uniform float mouseOutCnt;",
			"uniform float reconstructCnt;",

			"uniform float normalAmp;",
			"uniform float lateralAmp;",
			"uniform float normalDev;",
			"uniform float lateralDev;",

			"uniform float noisePositionScale;",
			"uniform float noiseTimeScale;",
			"uniform float noiseAmp;",

			"uniform float rewindSpeed;",

			"uniform vec3 diffuseColor1;",
			"uniform vec3 diffuseColor2;",

			"attribute vec3 faceCenter;",
			"attribute vec3 faceNormal;",

			"varying vec4 varyingDiffuse;",
			"varying vec2 varyingUv;",

			"float easeOut(float x, float a){",
				"float t = 1.0 - exp(-x * a);",
				"return t;",
			"}",

			"void displace(float d, inout vec3 p){",
				"float rec = easeOut(reconstructCnt, rewindSpeed);",
				"float normalDisAmp = bMouseOver * rec * normalAmp * gauss(normalDev, d);",
				"vec3 normalDis = normalDisAmp * faceNormal;",

				"vec3 noiseDir = normalize(p);",
				"vec3 noise = noiseAmp * snoise(vec4(noisePositionScale * p.xy, noiseTimeScale * mouseOutCnt, noiseTimeScale * rec)) * noiseDir;",

				// "float lateralDisAmp = bMouseOver * rec * lateralAmp * exp(-d * d * 5.0);",
				// "float lateralDisAmp = bMouseOver * rec * lateralAmp *gauss(lateralDev, d);",
				// "float lateralDisAmp = bMouseOver * rec * lateralAmp * exp(-d * lateralDev);",
				"float lateralDisAmp = bMouseOver * rec * lateralAmp * exp( (normalDisAmp - 1.0) * lateralDev);",
				"vec3 lateralDir = cross(-intPos, cross(intPos, faceCenter));",
				"vec3 lateralDis = lateralDisAmp * lateralDir;",

				"p += normalDis + lateralDis + noise;",
			"}",

			"void randomRotate(float d, inout vec3 p){",
				"p -= faceCenter;",
				"vec4 q;",
				"float amp = bMouseOver * 50.0 * exp(-d * d * 4.0);",

				"float u0 = snoise(vec4(0.0, faceCenter.x, faceCenter.y, faceCenter.z));",
				"u0 = (u0 + 1.0) / 2.0;",
				"vec4 q0 = randomQuaternion(u0, u0, u0);",
				// "inverseQuaternion(q0);",
				"float u1 = snoise(vec4(amp, faceCenter.x, faceCenter.y, faceCenter.z));",
				"float u2 = snoise(vec4(amp, faceCenter.x, faceCenter.y, faceCenter.z));",
				"float u3 = snoise(vec4(amp, faceCenter.x, faceCenter.y, faceCenter.z));",
				"u1 = (u1 + 1.0) / 2.0;",
				"u2 = (u2 + 1.0) / 2.0;",
				"u3 = (u3 + 1.0) / 2.0;",
				"q = randomQuaternion(u1, u2, u3);",
				// "q = multQuat(randomQuaternion(u1, u2, u3), inverseQuaternion(q0));",
				// "q = quaternionMult(q0, inverseQuaternion(q0));",
				// "q = multQuat(q0, inverseQuaternion(q0));",
				// "q = multQuat(q0, inverseQuaternion(q0));",
				// "rotate(p, q);",
				// "p = rotate_vector(q0, p);",
				"p = rotate_vector(inverseQuaternion(q0), p);",
				"p = rotate_vector(q, p);",
				// "p = rotate_vector(inverseQuaternion(q0), p);",
				// "p = rotate_vector(multQuat(q, inverseQuaternion(q0)), p);",
				"p += faceCenter;",
			"}",

			"void main(){",
				"vec3 newPosition = position;",
				"float d = distance(normal, intPos - center);",
				"randomRotate(d, newPosition);",
				"displace(d, newPosition);",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);",

				"varyingDiffuse = vec4(diffuseColor1, 1.0) * clamp(dot(normal, normalize(lightPos1)), 0.0, 1.0);",
				"varyingDiffuse += vec4(diffuseColor2, 1.0) * clamp(dot(normal, normalize(lightPos2)), 0.0, 1.0);",
				"varyingUv = uv;",
			"}"
	].join("\n"),

	"fragment": [
			// THREE.ShaderChunk["common"],
			"uniform vec2 resolution;",
			"uniform float time;",

			"uniform sampler2D tex;",

			"uniform vec3 ambientColor;",

			"varying vec4 varyingDiffuse;",
			"varying vec2 varyingUv;",

			"void main(){",
				"// vec4 texColor = vec4(inputToLinear(texture2D(tex, varyingUv).xyz), 1.0);",
				// "vec4 texColor = texture2D(tex, varyingUv);",

				"vec4 ambient = vec4(ambientColor, 1.0);",
				// "vec4 diffuse = vec4(varyingDiffuse.xyz * texColor.xyz, 1.0);",
				"vec4 diffuse = varyingDiffuse;",
				"vec4 color = ambient + diffuse;",

				"// gl_FragColor = color * vec4(vec3(1.0) + 0.5 * texColor.xyz, 1.0);",
				// "color.w = 0.9;",
				"gl_FragColor = color;",
			"}"
	].join("\n")
}