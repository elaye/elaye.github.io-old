var ExtrudedIcosphere = function(){
	var ico = new THREE.IcosahedronGeometry(2, 3);
	var extIco = [];

	ico.faces.forEach(function(f, i){
		var geometry = new THREE.Geometry();
		// geometry.dynamic = true;
		geometry.vertices.push(
			new THREE.Vector3(ico.vertices[f.a].x, ico.vertices[f.a].y, ico.vertices[f.a].z),
			new THREE.Vector3(ico.vertices[f.b].x, ico.vertices[f.b].y, ico.vertices[f.b].z),
			new THREE.Vector3(ico.vertices[f.c].x, ico.vertices[f.c].y, ico.vertices[f.c].z)
		);
		geometry.faces.push(new THREE.Face3(0, 1, 2));
		geometry.computeFaceNormals();
		
		var xuv = Math.random() * 0.9;
		var yuv = Math.random() * 0.9;
		geometry.faceVertexUvs[0].push([new THREE.Vector2(xuv, yuv),
		                       new THREE.Vector2(xuv, yuv + 0.1),
		                       new THREE.Vector2(xuv + 0.1, yuv)]);
		
		geometry.uvsNeedUpdate = true;

		geometry.mouseOver = false;
		geometry.displaced = false;
		geometry.faceId = i;
		
		extIco.push(geometry);
	});
	return extIco;
}

// function displaceFaces(faces){
// 	extIco.forEach(function(geometry){
// 		geometry.mouseOver = false;
// 	});

// 	faces.forEach(function(intObject){
// 		var baseGeometry = intObject.object.geometry;
// 		var geometry = extIco[baseGeometry.faceId];
// 		geometry.mouseOver = true;
// 		if(geometry.displaced === false){
// 			geometry.displaced = true;
// 			var faceNormal = baseGeometry.faces[0].normal;
// 			displaceFace(geometry.vertices, faceNormal);
// 			geometry.verticesNeedUpdate = true;			
// 		}
// 	});

// 	extIco.forEach(function(geometry, i){
// 		if(geometry.mouseOver === false && geometry.displaced === true){
// 			geometry.vertices.forEach(function(v, j){
// 					v.copy(baseExtIco[i].vertices[j]);
// 					geometry.displaced = false;
// 			});
// 			geometry.verticesNeedUpdate = true;
// 		}
// 	});
// }

// function displaceFace(face, dir){
// 	face.forEach(function(v){
// 		v.add(dir);
// 	});
// }

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

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
renderer.setClearColor( 0xffffff, 1);
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
var texture = new THREE.ImageUtils.loadTexture('concrete_tex2D.jpg');
// var texture = new THREE.ImageUtils.loadTexture('koala.jpg');
// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var uniforms = {
	time: { type: "f", value: 1.0 },
	resolution: { type: "v2", value: new THREE.Vector2(512.0, 512.0) },
	intPos: {type: "v3", value: new THREE.Vector3() },
	lightPos: {type: "v3", value: new THREE.Vector3(2.0, 1.0, 1.0)},
	tex: {type: "t", value: texture}
};

// var vertexShader = "			void main()	{

// 				gl_Position = vec4( position, 1.0 );

// 			}";

// var fragmentShader = "			uniform vec2 resolution;
// 			uniform float time;

// 			void main()	{

// 				// vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;
// 				gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);

// 			}";

console.log(shaders);
var material = new THREE.ShaderMaterial( {

	uniforms: uniforms,
	// vertexShader: document.getElementById( 'vertexShader' ).textContent,
	// fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	map: texture,
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
var meshes = [];
extIco.forEach(function(g, i){
	// var mesh = new THREE.Mesh(g, material);
	// var mesh = new THREE.Mesh(g, pinkMat);
	var mesh = new THREE.Mesh(g, material);
	// var mesh = new THREE.SceneUtils.createMultiMaterialObject( g, [material, wireMaterial] );
	// mesh.add(wireMaterial);
	// mesh.doubleSided = true;
	var baseMesh = new THREE.Mesh(baseExtIco[i], material);
	meshes.push(baseMesh);
	scene.add(mesh);
});

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );
	// renderer.setFaceCulling(false);


	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	// var intersects = raycaster.intersectObjects(scene.children);
	var intersects = raycaster.intersectObjects(meshes);
	if(intersects.length > 0){
		uniforms.intPos.value = intersects[0].point;
	}
	else{
		uniforms.intPos.value = new THREE.Vector3();
	}
	// displaceFaces(intersects);

	// cube.rotation.x += 0.1;
	// meshes[0].rotation.y += 0.01;
	// renderer.antialias = true;
	renderer.render(scene, camera);

	// material.wireframe = true;
	// renderer.render(scene, camera);
	// material.wireframe = false;
};

render();