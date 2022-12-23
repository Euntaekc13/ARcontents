<template>
    <div>
        <div class="Img"></div>
    </div>
</template>

<script>
import { Scene } from '../WebGL/scene'
import { Renderer} from '../WebGL/renderer'
import { Render} from '../WebGL/render'
import { Control } from '../WebGL/control'
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
            const Img = document.querySelector('.Img')
            Img.style.width = '100%'
            Img.style.height = '100%'

            let scene = new Scene(this.data)
            let cameraElement = scene.camera.cameraElement
            let sceneElement = scene.sceneElement
            

            let renderer = new Renderer(Img)
            let renderElement = renderer.domElement
            let rendererElement = renderer.rendererElement

            let control = new Control(cameraElement, renderElement);
            let controlElement = control.controlElement;

            let render = new Render
            render.element = Img
            render.controls = controlElement;
            render.render = renderElement
            render.scene = sceneElement
            render.Object = scene.resource.Object
            render.camera = cameraElement
            render.renderer = rendererElement
            render.start()
        }
    }

    }
</script>

<style scoped>
</style>