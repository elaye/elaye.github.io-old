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
	for(var i = 0; i < ico.faces.length; i++){
		vertices[9 * i + 0] = ico.vertices[ico.faces[i].a].x;
		vertices[9 * i + 1] = ico.vertices[ico.faces[i].a].y;
		vertices[9 * i + 2] = ico.vertices[ico.faces[i].a].z;
		vertices[9 * i + 3] = ico.vertices[ico.faces[i].b].x;
		vertices[9 * i + 4] = ico.vertices[ico.faces[i].b].y;
		vertices[9 * i + 5] = ico.vertices[ico.faces[i].b].z;
		vertices[9 * i + 6] = ico.vertices[ico.faces[i].c].x;
		vertices[9 * i + 7] = ico.vertices[ico.faces[i].c].y;
		vertices[9 * i + 8] = ico.vertices[ico.faces[i].c].z;
	}
	console.log(vertices.length);
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
	console.log(faceNormals.length);
	// ico.computeFaceNormals();

	var bufferGeometry = new THREE.BufferGeometry();

	bufferGeometry.addAttribute("position", new THREE.BufferAttribute(vertices, 3));
	bufferGeometry.addAttribute("index", new THREE.BufferAttribute(indices, 1));
	bufferGeometry.addAttribute("faceNormal", new THREE.BufferAttribute(faceNormals, 3));
	bufferGeometry.addAttribute("normal", new THREE.BufferAttribute(faceNormals, 3));
	// bufferGeometry.fromGeometry(ico);
	return bufferGeometry;
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(-window.innerWidth/2, window.innerHeight/2);

function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;		
}

document.addEventListener('mousemove', onMouseMove, false);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );

var renderer = new THREE.WebGLRenderer();
// renderer.setFaceCulling("front", "ccw");
// renderer.antialias = true;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xfafafa, 1);
// renderer.gammaOutput = true;
document.body.appendChild( renderer.domElement );

var baseExtIco = new ExtrudedIcosphere();
var extIco = new ExtrudedIcosphere();

// var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// material.wireframe = true;

// Material
// var pinkMat = new THREE.MeshPhongMaterial({
  // color      :  new THREE.Color("rgb(226,35,213)"),
  // emissive   :  new THREE.Color("rgb(255,128,64)"),
  // specular   :  new THREE.Color("rgb(255,155,255)"),
  // shininess  :  10,
  // shading    :  THREE.FlatShading,
  // transparent: 1,
  // opacity    : 1
// });

// var L1 = new THREE.PointLight( 0xffffff, 1);
// L1.position.z = 100;
// L1.position.y = 100;
// L1.position.x = 100;
// scene.add(L1);

// var L2 = new THREE.PointLight( 0xffffff, 0.8);
// L2.position.z = 200;
// L2.position.y = 50;
// L2.position.x = -100;
// scene.add(L2);

// THREE.ImageUtils.crossOrigin = '';
var texture = new THREE.ImageUtils.loadTexture('concrete_tex2D_light.jpg');
// var texture = new THREE.ImageUtils.loadTexture('koala.jpg');
// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

var uniforms = {
	time: { type: "f", value: 0 },
	resolution: { type: "v2", value: new THREE.Vector2(512.0, 512.0) },
	intPos: {type: "v3", value: new THREE.Vector3() },
	lightPos: {type: "v3", value: new THREE.Vector3(2.0, 1.0, 1.0)},
	bMouseOver: {type: "f", value: 0},
	mouseOverCnt: {type: "f", value: 0},
	mouseOutCnt: {type: "f", value: 0},
	tex: {type: "t", value: texture}
};

var material = new THREE.ShaderMaterial( {

	uniforms: uniforms,
	// vertexShader: document.getElementById( 'vertexShader' ).textContent,
	// fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	// map: texture,
	vertexShader: shaders["vertex"],
	fragmentShader: shaders["fragment"]

} );

// var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
// wireMaterial.wireframe = true;
var wireMaterial = new THREE.ShaderMaterial();
material.clone(wireMaterial);
wireMaterial.wireframe = true;

material.side = THREE.DoubleSide;
// material.wireframe = true;
// var meshes = [];
// extIco.forEach(function(g, i){
// 	// var mesh = new THREE.Mesh(g, material);
// 	// var mesh = new THREE.Mesh(g, pinkMat);
// 	var mesh = new THREE.Mesh(g, material);
// 	// var mesh = new THREE.SceneUtils.createMultiMaterialObject( g, [material, wireMaterial] );
// 	// mesh.add(wireMaterial);
// 	// mesh.doubleSided = true;
// 	var baseMesh = new THREE.Mesh(baseExtIco[i], material);
// 	meshes.push(baseMesh);
// 	scene.add(mesh);
// });
var mesh = new THREE.Mesh(extIco, material);
scene.add(mesh);

camera.position.z = 5;

var mouseOver = false;

var render = function () {
	requestAnimationFrame( render );
	// renderer.setFaceCulling(false);


	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects(scene.children);
	// var intersects = raycaster.intersectObjects(meshes);
	if(intersects.length > 0){
		uniforms.intPos.value = intersects[0].point;
		if(!mouseOver){
			uniforms.mouseOverCnt.value += 0;
		}
		mouseOver = true;
		uniforms.mouseOverCnt.value += 0.01;
	}
	else{
		uniforms.intPos.value = new THREE.Vector3();
		// uniforms.mouseOverCnt.value = 0;
		mouseOver = false;
		uniforms.mouseOutCnt.value += 0.01;
	}

	uniforms.bMouseOver.value = (mouseOver)? 1 : 0;
	uniforms.time.value += 0.01;
	// !!! When to reset time?

	// cube.rotation.x += 0.1;
	// meshes[0].rotation.y += 0.01;
	// renderer.antialias = true;
	renderer.render(scene, camera);

	// material.wireframe = true;
	// renderer.render(scene, camera);
	// material.wireframe = false;
};

render();