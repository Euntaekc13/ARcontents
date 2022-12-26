// import { CinematicCamera } from "three/examples/jsm/cameras/CinematicCamera";
import * as THREE from "three";

class Camera{
    constructor(){
        this.camera = new THREE.Camera();
        // this.setCamera();
    }

    // setCamera(){
    //     this.camera.position.set(100, 100, 100);
    // }

    get cameraElement(){
        return this.camera;
    }
}

export { Camera };