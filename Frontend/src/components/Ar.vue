<template>
    <div>
        <div class="Img"></div>
    </div>
</template>

<script>
// import { Scene } from '../WebGL/scene'
// import { Renderer } from '../WebGL/renderer'
// import { Render } from '../WebGL/render'
import * as THREE from "three";
// import { Control } from '../WebGL/control'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { AmbientLight, DirectionalLight } from 'three'
import { ArToolkitSource, ArToolkitContext, ArMarkerControls} from '../WebGL/ar-threex';

export default {
    name:'Ar',
    data(){
        return {
            data: '고양이'
        }
    },
    mounted(){
        this.Graphics()
    },
    methods:{
        Graphics(){
            // const Img = document.querySelector(`.Img${this.processData.processType}`)
            var renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });


            //class renderer
            renderer.setClearColor(new THREE.Color('lightgrey'), 0)
            renderer.setSize( 640, 480 );
            renderer.domElement.style.position = 'absolute'
            renderer.domElement.style.top = '0px'
            renderer.domElement.style.left = '0px'
            document.body.appendChild( renderer.domElement );




            var scene	= new THREE.Scene();
            var camera = new THREE.Camera();
            scene.add(camera);
            var arToolkitSource = new ArToolkitSource({   // ②카메라 탐색
                sourceType : 'webcam',
            })

            arToolkitSource.init(function onReady(){
                onResize()
            })


            // ③디바이스 크기에 맞게 사이즈 조절하는 함수 설정
            window.addEventListener('resize', function(){
                onResize()
            })
            function onResize(){
                arToolkitSource.onResize()	
                arToolkitSource.copySizeTo(renderer.domElement)	
                if( arToolkitContext.arController !== null ){
                    arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
                }	
            }
            // arToolkitContext객체 생성하기
            var arToolkitContext = new ArToolkitContext({
                cameraParametersUrl: ArToolkitContext.baseURL + '../data/data/camera_para.dat',
                detectionMode: 'mono',
            })

            // initialize it
            arToolkitContext.init(function onCompleted(){
            // copy projection matrix to camera
                camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
            })

            var markerControls = new ArMarkerControls(arToolkitContext, camera, {
                type : 'pattern',
                patternUrl : ArToolkitContext.baseURL + '../data/data/patt.hiro',
                changeMatrixMode: 'cameraTransformMatrix'
            })
    
            scene.visible = false
            var geometry = new THREE.BoxGeometry(10,10,10);
            var material = new THREE.MeshNormalMaterial({
                transparent : true,
                opacity: 0,
                side: THREE.DoubleSide
            }); 
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.y	= geometry.parameters.height/2
            scene.add( mesh );


            const ambientLight = new AmbientLight(0x20202a, 6.5, 100)
            const dirLight = new DirectionalLight(0xffffff, 0.5)
            dirLight.position.set(2, 10, 1)
            scene.add(ambientLight)
            scene.add(dirLight)

            // //물체
            // var geometry = new THREE.BoxGeometry(0.2,0.2,0.2);
            // var material = new THREE.MeshNormalMaterial({
            //     // transparent : true,
            //     // // opacity: 0.1,
            //     // side: THREE.DoubleSide
            // }); 
            // var mesh = new THREE.Mesh( geometry, material );
            // mesh.position.y	= 1
            // scene.add( mesh );
            let loader = new FBXLoader();
            loader.load('/fbx/cat.fbx', object => {
                let Object = object
                Object.name = 'cat'
                Object.scale.x = Object.scale.y = Object.scale.z = 0.002
                Object.position.set(0, 1, 0)
                scene.add(Object)
              })

            function animate() {
                renderer.render( scene, camera );
                arToolkitContext.update(arToolkitSource.domElement);
                scene.visible = camera.visible
                // mesh.rotation.x += 0.03
                requestAnimationFrame( animate );
            };

            animate();
        }
    }

}
</script>

<style scoped>
</style>