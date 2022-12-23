import * as THREE from "three";
import { Resource } from "./resource";
import { Camera } from "./camera";
import { Light } from "./light";

class Scene{
    constructor(data = null){
        this.scene = new THREE.Scene();

        this.resource = new Resource(data);
        this.camera = new Camera();
        this.light = new Light();

        this.setScene();
        this.setMesh();
        this.setGrid();
    }

    setScene(){
    this.scene.add(this.resource.animalG)
    this.scene.add(this.light.ambientLight)
    this.scene.add(this.camera.camera)
    this.scene.add(this.light.dirLight)
    }
    
    setMesh(){
        this.scene.visible = false
        this.mesh = new THREE.Mesh( 
            new THREE.CylinderGeometry(10, 10, 10, 20), 
            new THREE.MeshNormalMaterial({
                transparent : true,
                opacity: 0,
                side: THREE.DoubleSide
            }) 
            )
	    this.mesh.position.y= this.mesh.geometry.parameters.height/2

        this.scene.add(this.mesh);
    }

    setGrid(){
        this.grid = new THREE.GridHelper( 2000, 300, 0x000000, 0x000000 );
        this.grid.material.opacity = .3;
        this.grid.material.transparent = true;
        
        this.scene.add(this.grid);
    }

    setLight(){
        this.scene.add(this.light.dirLight);
    }

    setLightHelper(){
        this.helper = new THREE.CameraHelper(this.light.dirLight.shadow.camera);
        this.scene.add(this.helper);
    }

    removeHelper(){
        this.scene.remove(this.helper);
    }

    setCameraHelper(){
        this.helper = new THREE.CameraHelper(this.camera.cameraElement);
        this.scene.add(this.helper);
    }

    get sceneElement(){
        return this.scene;
    }
}

export { Scene };