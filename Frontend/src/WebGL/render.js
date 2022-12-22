class Render{
    constructor(){
        this.status = true;
    }

    start(){
        this.status = window.requestAnimationFrame(() => {
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.start();
        });
    }

    stop(){
        window.cancelAnimationFrame(this.status);
    }

    status(value){
        this.status = value;
    }

    // normalization(max, min, value, moterNumber){
    //     const MAX_MOTER1 = 1301828; // yAxis Moter
    //     const MIN_MOTER1 = -27;
    //     const MAX_MOTER2 = 25021563; // xAxis Moter
    //     const MIN_MOTER2 = -4375;
    //     return moterNumber === 1 ? (max - min)  * (value + MIN_MOTER1) / (MAX_MOTER1 + MIN_MOTER1) + min:
    //                                 (max - min)  * (value + MIN_MOTER2) / (MAX_MOTER2 + MIN_MOTER2) + min
    // }
}
 
 export { Render };