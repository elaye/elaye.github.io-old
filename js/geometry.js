// var ExtrudedIcosphere = function(){
// 	var ico = new THREE.IcosahedronGeometry(2, 3);
// 	var extIco = [];

// 	ico.faces.forEach(function(f, i){
// 		var geometry = new THREE.Geometry();
// 		// geometry.dynamic = true;
// 		var v1 = new THREE.Vector3(ico.vertices[f.a].x, ico.vertices[f.a].y, ico.vertices[f.a].z);
// 		var v2 = new THREE.Vector3(ico.vertices[f.b].x, ico.vertices[f.b].y, ico.vertices[f.b].z);
// 		var v3 = new THREE.Vector3(ico.vertices[f.c].x, ico.vertices[f.c].y, ico.vertices[f.c].z);
// 		geometry.vertices.push(v1, v2, v3);
// 		var faceCenter = new THREE.Vector3();
// 		faceCenter.add(v1).add(v2).add(v3).divideScalar(3);
// 		var faceCenterArray = [faceCenter.x, faceCenter.y, faceCenter.z];
// 		var faceCenters = new Float32Array(geometry.vertices.length * 3);
// 		for(var i = 0; i < faceCenters.length; i++){
// 			faceCenters[3 * i] = faceCenter.x;
// 			faceCenters[3 * i + 1] = faceCenter.y;
// 			faceCenters[3 * i + 2] = faceCenter.z;
// 		}

// 		geometry.faces.push(new THREE.Face3(0, 1, 2));
// 		geometry.computeFaceNormals();
		
// 		var xuv = Math.random() * 0.9;
// 		var yuv = Math.random() * 0.9;
// 		geometry.faceVertexUvs[0].push([new THREE.Vector2(xuv, yuv),
// 		                       new THREE.Vector2(xuv, yuv + 0.1),
// 		                       new THREE.Vector2(xuv + 0.1, yuv)]);
		
// 		geometry.uvsNeedUpdate = true;

// 		geometry.mouseOver = false;
// 		geometry.displaced = false;
// 		geometry.faceId = i;
		
// 		var bufferGeometry = new THREE.BufferGeometry();
// 		bufferGeometry.fromGeometry(geometry);
// 		bufferGeometry.addAttribute("faceCenter", new THREE.BufferAttribute(faceCenters, 3));
// 		// extIco.push(geometry);
// 		extIco.push(bufferGeometry);
// 	});
// 	return extIco;
// }

// var ExtrudedIcosphere = function(){
// 	var ico = new THREE.IcosahedronGeometry(2, 3);
// 	var extIco = [];

// 	var geometry = new THREE.BufferGeometry();
// 	var vertices = new Float32Array(ico.vertices.length * 3);
// 	ico.vertices.forEach(function(v, i){
// 		// var geometry = new THREE.Geometry();
// 		// geometry.dynamic = true;
// 		vertices[3 * i + 0] = v.x;
// 		vertices[3 * i + 1] = v.y;
// 		vertices[3 * i + 2] = v.z;
// 		// var v1 = new THREE.Vector3(ico.vertices[f.a].x, ico.vertices[f.a].y, ico.vertices[f.a].z);
// 		// var v2 = new THREE.Vector3(ico.vertices[f.b].x, ico.vertices[f.b].y, ico.vertices[f.b].z);
// 		// var v3 = new THREE.Vector3(ico.vertices[f.c].x, ico.vertices[f.c].y, ico.vertices[f.c].z);
// 		// geometry.vertices.push(v1, v2, v3);
// 		// var faceCenter = new THREE.Vector3();
// 		// faceCenter.add(v1).add(v2).add(v3).divideScalar(3);
// 		// var faceCenterArray = [faceCenter.x, faceCenter.y, faceCenter.z];
// 		// var faceCenters = new Float32Array(geometry.vertices.length * 3);
// 		// for(var i = 0; i < faceCenters.length; i++){
// 			// faceCenters[3 * i] = faceCenter.x;
// 			// faceCenters[3 * i + 1] = faceCenter.y;
// 			// faceCenters[3 * i + 2] = faceCenter.z;
// 		// }

// 		// geometry.faces.push(new THREE.Face3(0, 1, 2));
// 		// geometry.computeFaceNormals();
		
// 		var xuv = Math.random() * 0.9;
// 		var yuv = Math.random() * 0.9;
// 		geometry.faceVertexUvs[0].push([new THREE.Vector2(xuv, yuv),
// 		                       new THREE.Vector2(xuv, yuv + 0.1),
// 		                       new THREE.Vector2(xuv + 0.1, yuv)]);
		
// 		geometry.uvsNeedUpdate = true;

// 		geometry.mouseOver = false;
// 		geometry.displaced = false;
// 		geometry.faceId = i;
		
// 		var bufferGeometry = new THREE.BufferGeometry();
// 		bufferGeometry.fromGeometry(geometry);
// 		bufferGeometry.addAttribute("faceCenter", new THREE.BufferAttribute(faceCenters, 3));
// 		// extIco.push(geometry);
// 		extIco.push(bufferGeometry);
// 	});
// 	return extIco;
// }

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