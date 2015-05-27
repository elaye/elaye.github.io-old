var ExplodingSphere = function(canvas, x, y, z){
	// var width = canvas.offsetWidth;
	// var height = canvas.offsetHeight;
	var center = new THREE.Vector3(x, y, z);
	var width = window.innerWidth;
	var height = window.innerHeight;
	var ratio = width / height;
	// var posX = canvas.offsetLeft;
	// var posY = canvas.offsetTop;

	var raycaster = new THREE.Raycaster();
	// var mouse = new THREE.Vector2(-window.innerWidth/2, window.innerHeight/2);
	var mouse = new THREE.Vector2(-width/2, height/2);
	var scene = new THREE.Scene();
	// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
	// var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 100);
	// var camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 100);
	var camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 100);
	// var camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0.1, 100 );
	// var camera = new THREE.OrthographicCamera(-5, 5, 5 / ratio, -5 / ratio, 0.1, 100 );
	// camera.position.z = 13;
	// camera.position.x = 2.5;
	camera.position.z = 6;

	// camera.lookAt(new THREE.Vector3(2.5, 0, 0));
	var extIco = new ExtrudedIcosphere(center);

	var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	// renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setSize(width, height);
	// renderer.setClearColor( 0xfafafa, 1);
	renderer.setClearColor(0xffffff, 0);
	// renderer.gammaOutput = true;
	// document.body.appendChild(renderer.domElement);
	canvas.appendChild(renderer.domElement);

	function onMouseMove( event ) {
	       // calculate mouse position in normalized device coordinates
	       // (-1 to +1) for both components
	       // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	       mouse.x = event.clientX / width * 2 - 1;
	       // mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	       mouse.y = - (event.clientY / height) * 2 + 1;
	       // var scroll = window.scrollY;
	       // var scroll = document.body.scrollTop;
	       // var scroll = window.scrollX;
	       // var scroll = document.getElementsByClassName('page-content')[0].scrollTop;
	       // var scroll = (document.documentElement || document.body.parentNode || document.body).scrollTop;
	       // var scroll = window.pageYOffset || document.documentElement.scrollTop;
	       // console.log(scroll);
	       // mouse.y = -(event.screenY + scroll) / height * 2 + 1;
	       // console.log(mouse.y);
	}

	function onResize(event){
		// renderer.setSize(window.inner)
	}

	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('resize', onResize, false);

	var material = new ExplosiveMaterial(center);
	var mesh = new THREE.Mesh(extIco, material.material);
	scene.add(mesh);

	var render = function () {
		requestAnimationFrame(render);
		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera(mouse, camera);

		// calculate objects intersecting the picking ray
		// var intersects = raycaster.intersectObjects(scene.children);
		var intersects = raycaster.intersectObjects([mesh]);

		material.setIntersection(intersects);

		// !!! When to reset time?

		// if(!mouseOver){
			// mesh.rotation.y += 0.005;
		// }
		// cube.rotation.x += 0.1;
		// meshes[0].rotation.y += 0.01;
		// renderer.antialias = true;
		// mesh.rotation.y += 0.01;
		renderer.render(scene, camera);

	};

	render();
}
