import { Group } from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from "three";

class Resource{
    constructor(file){
        this.loader = new FBXLoader();
        this.obj = new Group();

        this.Object = {};
        this.setResource(file);
    }

    setResource(file){
        if(!file){
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshBasicMaterial( {color: 0x0a0ffa} );
            const cube = new THREE.Mesh( geometry, material );

            if(cube.isMesh){
                cube.castShadow = true;
                cube.receiveShadow = true;
            }

            this.obj.add(cube);
        }
    }

    setRotationAlign(){

    }
}

export { Resource };