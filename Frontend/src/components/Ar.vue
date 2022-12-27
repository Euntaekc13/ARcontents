<template>
    <div>
        <div class="Img"></div>
    </div>
</template>

<script>
import * as THREE from "three";
import Stats from 'three/addons/libs/stats.module.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { AmbientLight, DirectionalLight } from 'three'
import { ArToolkitSource, ArToolkitContext, ArMarkerControls} from '../WebGL/ar-threex';

export default {
    name:'Ar',
    data(){
        return {
            data: '고양이' //select 데이터 조건 값
        }
    },
    mounted(){
        this.Graphics()
    },
    methods:{
        Graphics(){


            var renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            //애니메이션 설정에서 사용할 변수명 
            let mixer 

            const img = document.querySelector('.Img')
            img.appendChild(renderer.domElement)
            img.style.width = '100%'
            img.style.height = '100%'

            renderer.setClearColor(new THREE.Color('lightgrey'), 0)
            renderer.setSize( 640, 480 );
            renderer.domElement.style.position = 'absolute'
            renderer.domElement.style.top = '0px'
            renderer.domElement.style.left = '0px'
            document.body.appendChild( renderer.domElement );

            let stats = new Stats();

            var scene = new THREE.Scene();
            var camera = new THREE.Camera();
            scene.add(camera);


            //-------------------------------------------------------------------------
            //                            AR설정
            //-------------------------------------------------------------------------
            // ②카메라 탐색
            var arToolkitSource = new ArToolkitSource({   
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
                camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
            })
            //사용할 마크 등록
            var markerControls = new ArMarkerControls(arToolkitContext, camera, {
                type : 'pattern',
                patternUrl : ArToolkitContext.baseURL + '../data/data/patt.hiro',
                changeMatrixMode: 'cameraTransformMatrix'
            })
            scene.visible = false
            //-------------------------------------------------------------------------
            //                       물체 노출 영역
            //-------------------------------------------------------------------------
            // var geometry = new THREE.BoxGeometry(2,2,2);
            // var material = new THREE.MeshNormalMaterial({
            //     transparent : true,
            //     opacity: 0,
            //     side: THREE.DoubleSide
            // });             
            // var mesh = new THREE.Mesh( geometry, material );
            // mesh.position.y	= geometry.parameters.height
            // scene.add( mesh );

            //-------------------------------------------------------------------------
            //                          조명설정 
            //-------------------------------------------------------------------------
            const ambientLight = new AmbientLight(0x20202a, 6.5, 100)
            const dirLight = new DirectionalLight(0xffffff, 0.5)
            dirLight.position.set(2, 10, 1)
            scene.add(ambientLight)
            scene.add(dirLight)

            //-------------------------------------------------------------------------
           //                         FBX파일 로더
           //-------------------------------------------------------------------------
            let loader = new FBXLoader();
            if(this.data == '고양이'){
                loader.load('/fbx/standcat.fbx', object => {
                let Object = object
                Object.name = 'cat'
                Object.scale.x = Object.scale.y = Object.scale.z = 0.002
                Object.position.set(0, 0, 0)
                scene.add(Object)

                //animation 설정 
                const animations = object.animations;
                console.log(animations);
                mixer = new THREE.AnimationMixer( object )
                mixer.clipAction(animations[0]).play(); //FBX파일에 설정된 animation 배열에 있는 animation을 실행시키는 코드
                
                //렌더링 호출
                animate(mixer);
                })
            } else if( this.data == '강아지') {
                loader.load('/fbx/dog.fbx', object => {
                let Object = object
                Object.name = 'dog'
                Object.scale.x = Object.scale.y = Object.scale.z = 0.002
                Object.position.set(0, 0, 0)
                scene.add(Object)

                //animation 설정 
                const animations = object.animations;
                console.log(animations);
                mixer = new THREE.AnimationMixer( object )
                mixer.clipAction(animations[0]).play(); //FBX파일에 설정된 animation 배열에 있는 animation을 실행시키는 코드
                
                //렌더링 호출
                animate(mixer);
                })
            } else {
                loader.load('/fbx/human.fbx', object => {
                let Object = object
                Object.name = 'human'
                Object.scale.x = Object.scale.y = Object.scale.z = 0.015
                Object.position.set(0, 0, 0)
                scene.add(Object)

                //animation 설정 
                const animations = object.animations;
                console.log(animations);
                mixer = new THREE.AnimationMixer( object )
                mixer.clipAction(animations[0]).play(); //FBX파일에 설정된 animation 배열에 있는 animation을 실행시키는 코드
                
                //렌더링 호출
                animate(mixer);
              })
            }
        

            const clock = new THREE.Clock();    
            //-------------------------------------------------------------------------
            //                            렌더링 함수
            //-------------------------------------------------------------------------
            function animate() {
                renderer.render( scene, camera );
                arToolkitContext.update(arToolkitSource.domElement);
                scene.visible = camera.visible  
                const mixerUpdateDelta = clock.getDelta();
                mixer.update( mixerUpdateDelta )
                stats.update();
                requestAnimationFrame( animate );
            };
            
            
        }
    }

}
</script>

<style>
video {
    margin:13% 0 0 0;
}
canvas {
    height: 100%;
    width: 80%;
    margin: 10% 0 0 0;
}
</style>