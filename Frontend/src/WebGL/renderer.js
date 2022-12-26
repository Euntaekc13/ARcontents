import { WebGLRenderer } from "three";
import * as THREE from "three";

class Renderer{
    constructor(element){
        this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

        this.setRenderer(element);
    }

    setRenderer(element){
        this.renderer.setPixelRatio(1);
        this.renderer.setClearColor(new THREE.Color('lightgrey'), 0)
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(element.clientWidth || 500, element.clientHeight || 500);
        this.renderer.domElement.style.position = 'absolute'
        this.renderer.domElement.style.top = '500px'
        this.renderer.domElement.style.left = '0px'
        element.appendChild(this.renderer.domElement);
    }

    get domElement(){
        return this.renderer.domElement;
    }

    get rendererElement(){
        return this.renderer;
    }
}

export { Renderer };