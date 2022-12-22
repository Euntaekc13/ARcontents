import { AmbientLight, DirectionalLight } from "three";

class Light{
    constructor(){
        this.ambientLight = new AmbientLight( 0x20202A, 6.5, 100 );
        this.dirLight = new DirectionalLight(0xffffff, 0.5);

        this.setLight();
    }

    setLight(){
        this.dirLight.position.set( 2, 10, 1 );
        this.dirLight.castShadow = true;
    }

    get lightElement(){
        return this.dirLight;
    }
}

export { Light };