import { Group } from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from "three";

class Resource{
    constructor(data){
        this.loader = new FBXLoader();
        this.animalG = new Group();

        this.animal = {};
        this.setResource(data);
    }

    setResource(data){
        if(!data){
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshBasicMaterial( {color: 0x0a0ffa} );
            const cube = new THREE.Mesh( geometry, material );

            if(cube.isMesh){
                cube.castShadow = true;
                cube.receiveShadow = true;
            }

            this.obj.add(cube);
        }
        else if(data == '고양이'){
            this.loader.load('/fbx/cat.FBX', object => {
                let Object = (this.animal.cat = object)
                Object.name = 'machine'
                Object.scale.x = Object.scale.y = Object.scale.z = 0.03
                Object.position.set(0, 2, 0)
                Object.traverse(function (child) {
                  if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                  }
                })
                if (Object) this.animalG.add(Object)
              })
        }
        else if(data == '강아지'){
            this.loader.load('/fbx/dog.FBX', object => {
                let Object = (this.animal.dog = object)
                Object.name = 'machine'
                Object.scale.x = Object.scale.y = Object.scale.z = 0.03
                Object.position.set(0, 2, 0)
                Object.traverse(function (child) {
                  if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                  }
                })
                if (Object) this.animalG.add(Object)
              })
        }
    }

    setRotationAlign(){

    }
}

export { Resource };