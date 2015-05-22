var shaders = {
	"vertex": [
			"uniform vec3 intPos;",
			"uniform vec3 lightPos;",

			"// attribute faceCenter;",
			"varying vec4 diffuse;",
			"varying vec2 varyingUv;",

			"vec3 rotate(vec3 v, vec4 q){",
				"return v + 2.0 * cross( cross( v, q.xyz ) + q.w * v, q.xyz );",
			"}",

			"void main(){",
				"float d = distance(normal, intPos);",
				"float bOver = step(0.001, intPos.x + intPos.y + intPos.z);",
				"// d = max(0.0, 1.5 - d);",
				"// d = 1.0 / (5.0 * d * d + 0.0000000001);",
				"d = bOver * 57.0 * exp(- d * d * 4.0);",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position + d * normal, 1.0 );",

				"diffuse = vec4(0.39, 0.51, 0.61, 1.0) * clamp(dot(normal, normalize(lightPos)), 0.0, 1.0);",
				"varyingUv = uv;",
			"}"
	].join("\n"),

	"fragment": [
			"uniform vec2 resolution;",
			"uniform float time;",

			"uniform sampler2D tex;",

			"varying vec4 diffuse;",
			"varying vec2 varyingUv;",

			"void main(){",
				"vec4 ambient = vec4(0.25, 0.25, 0.30, 1.0);",
				"vec4 color = ambient + diffuse;",
				"vec4 texColor = texture2D(tex, varyingUv);",
				"gl_FragColor = color * vec4(vec3(1.0) + 0.5 * texColor.xyz, 1.0);",
			"}"
	].join("\n")
}