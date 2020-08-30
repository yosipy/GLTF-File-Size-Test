//import * as THREE from 'three.min.js';
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';


function modelLoad(url) {
	const loader = new GLTFLoader()

	// Optional: Provide a DRACOLoader instance to decode compressed mesh data
	//var dracoLoader = new DRACOLoader();
	//dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
	//loader.setDRACOLoader( dracoLoader );
	return new Promise((resolve, reject) => {
		loader.load(
			// resource URL
			url,
			// called when the resource is loaded
			function ( gltf ) {
	
				const model = gltf.scene
				model.name = 'model'
				resolve(model)
			},
			// called while loading is progressing
			function ( xhr ) {

				// const download_per = parseInt( xhr.loaded / xhr.total * 100 ) + '% loaded'
				const download_per = parseInt( xhr.loaded / 12108120 * 100 ) + '% loaded'
				document.getElementById('result').innerHTML = String( download_per )
	
			},
			// called when loading has errors
			function ( error ) {
	
				console.log( 'An error happened' )
	
			}
		)
	})
}

window.addEventListener('DOMContentLoaded', init)
function init() {
	const canvas_width = window.innerWidth
	const canvas_height = window.innerHeight
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera( 45, canvas_width / canvas_height, 0.1, 1000 )
	camera.rotation.set(-Math.PI / 4, Math.PI, 0)
	camera.position.set(0, 1, -2);

	const renderer = new THREE.WebGLRenderer()
	renderer.setSize( canvas_width, canvas_height )
	renderer.gammaOutput = true;
	renderer.gammaFactor = 2.2;
	document.body.appendChild( renderer.domElement )

	const controls = new OrbitControls( camera, renderer.domElement )
	controls.target = new THREE.Vector3(0, 1, 0)

	// 平行光源
	const light = new THREE.DirectionalLight(0xFFFFFF)
	light.intensity = 2
	light.position.set(1, 1, 1)
	// シーンに追加
	scene.add(light)

	const model = await modelLoad('no0.glb')
	scene.add(model)

	// 初回実行
	tick();
	function tick() {
		controls.update()
		renderer.render(scene, camera)
		requestAnimationFrame(tick)
	}
}
