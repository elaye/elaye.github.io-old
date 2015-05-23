var shaders = {
	"vertex": [
			shaderUtil["snoise4D"],
			"uniform vec3 intPos;",
			"uniform vec3 lightPos;",
			"uniform float time;",
			"uniform float bMouseOver;",
			"uniform float mouseOverCnt;",
			"uniform float mouseOutCnt;",

			"uniform float normalAmp;",
			"uniform float lateralAmp;",

			"attribute vec3 faceCenter;",
			"attribute vec3 faceNormal;",

			"varying vec4 varyingDiffuse;",
			"varying vec2 varyingUv;",

			"void displace(inout vec3 p){",
				"float d = distance(normal, intPos);",
				"float normalDisAmp = bMouseOver * normalAmp * exp(-d * d * 4.0);",
				"vec3 normalDis = normalDisAmp * faceNormal;",

				"vec3 noiseDir = normalize(p);",
				"vec3 noise = 0.2 * snoise(vec4(100.0 * p, 2.0 * mouseOutCnt)) * noiseDir;",

				"float lateralDisAmp = bMouseOver * lateralAmp * exp(-d * d * 4.0);",
				"//vec3 lateralDir = normalize(intPos - faceCenter);",
				"//vec3 lateralDir = cross(intPos, faceCenter);",
				"vec3 lateralDir = cross(-intPos, cross(intPos, faceCenter));",
				"vec3 lateralDis = lateralDisAmp * lateralDir;",

				"p += normalDis + lateralDis + noise;",
			"}",

			"vec3 rotate(vec3 v, vec4 q){",
				"return v + 2.0 * cross( cross( v, q.xyz ) + q.w * v, q.xyz );",
			"}",

			"void main(){",
				"vec3 newPosition = position;",
				"displace(newPosition);",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);",

				"varyingDiffuse = vec4(0.49, 0.61, 0.71, 1.0) * clamp(dot(normal, normalize(lightPos)), 0.0, 1.0);",
				"varyingUv = uv;",
			"}"
	].join("\n"),

	"fragment": [
			// THREE.ShaderChunk["common"],
			"uniform vec2 resolution;",
			"uniform float time;",

			"uniform sampler2D tex;",

			"varying vec4 varyingDiffuse;",
			"varying vec2 varyingUv;",

			"void main(){",
				"// vec4 texColor = vec4(inputToLinear(texture2D(tex, varyingUv).xyz), 1.0);",
				"vec4 texColor = texture2D(tex, varyingUv);",

				"vec4 ambient = vec4(0.45, 0.45, 0.50, 1.0);",
				"vec4 diffuse = vec4(varyingDiffuse.xyz * texColor.xyz, 1.0);",
				"vec4 color = ambient + diffuse;",

				"// gl_FragColor = color * vec4(vec3(1.0) + 0.5 * texColor.xyz, 1.0);",
				"gl_FragColor = color;",
			"}"
	].join("\n")
}