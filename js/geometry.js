var ExtrudedIcosphere = function(){
	var ico = new THREE.IcosahedronGeometry(2, 3);
	// var extIco = [];

	var indices = new Uint16Array(ico.faces.length * 3);

	for(var i = 0; i < indices.length; i++){
		indices[ i ] = i;
	}

	var vertices = new Float32Array(ico.faces.length * 3 * 3);
	var faceCenters = new Float32Array(ico.faces.length * 3 * 3);
	for(var i = 0; i < ico.faces.length; i++){
		var va = ico.vertices[ico.faces[i].a];
		var vb = ico.vertices[ico.faces[i].b];
		var vc = ico.vertices[ico.faces[i].c];
		var vmx = (va.x + vb.x + vc.x) / 3;
		var vmy = (va.y + vb.y + vc.y) / 3;
		var vmz = (va.z + vb.z + vc.z) / 3;
		vertices[9 * i + 0] = va.x;
		vertices[9 * i + 1] = va.y;
		vertices[9 * i + 2] = va.z;
		vertices[9 * i + 3] = vb.x;
		vertices[9 * i + 4] = vb.y;
		vertices[9 * i + 5] = vb.z;
		vertices[9 * i + 6] = vc.x;
		vertices[9 * i + 7] = vc.y;
		vertices[9 * i + 8] = vc.z;
		faceCenters[9 * i + 0] = vmx;
		faceCenters[9 * i + 1] = vmy;
		faceCenters[9 * i + 2] = vmz;
		faceCenters[9 * i + 3] = vmx;
		faceCenters[9 * i + 4] = vmy;
		faceCenters[9 * i + 5] = vmz;
		faceCenters[9 * i + 6] = vmx;
		faceCenters[9 * i + 7] = vmy;
		faceCenters[9 * i + 8] = vmz;
	}

	var faceNormals = new Float32Array(ico.faces.length * 3 * 3);
	for(var i = 0; i < ico.faces.length; i++){
		faceNormals[9*i+0] = ico.faces[i].normal.x;
		faceNormals[9*i+1] = ico.faces[i].normal.y;
		faceNormals[9*i+2] = ico.faces[i].normal.z;
		faceNormals[9*i+3] = ico.faces[i].normal.x;
		faceNormals[9*i+4] = ico.faces[i].normal.y;
		faceNormals[9*i+5] = ico.faces[i].normal.z;
		faceNormals[9*i+6] = ico.faces[i].normal.x;
		faceNormals[9*i+7] = ico.faces[i].normal.y;
		faceNormals[9*i+8] = ico.faces[i].normal.z;
	}
	// console.log(faceNormals.length);
	// ico.computeFaceNormals();

	var bufferGeometry = new THREE.BufferGeometry();

	bufferGeometry.addAttribute("position", new THREE.BufferAttribute(vertices, 3));
	bufferGeometry.addAttribute("index", new THREE.BufferAttribute(indices, 1));
	bufferGeometry.addAttribute("normal", new THREE.BufferAttribute(faceNormals, 3));
	bufferGeometry.addAttribute("faceCenter", new THREE.BufferAttribute(faceCenters, 3));
	bufferGeometry.addAttribute("faceNormal", new THREE.BufferAttribute(faceNormals, 3));
	// bufferGeometry.fromGeometry(ico);
	return bufferGeometry;
}