import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as THREE from "three";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";


import {
    generateHub,
    HubConfig,
    M2_HEIGHT,
    M2_PADDING,
    M2_PIN_HEIGHT,
    pcbSize,
    pinsMacros,
    shapeMacros
} from "./tools/hub-drawer";
import {createScene} from "./scene";
import {genGroup} from "./tools/flat-gen";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {crateRenderer} from "./renderer";


@Component({
    selector: 'pcb-gen',
    templateUrl: './pcb-gen.component.html',
    styleUrls: ['./pcb-gen.component.css']
})
export class PcbGenComponent implements AfterViewInit {
    @ViewChild("3dDraw", {static: true})
    drawElement!: ElementRef<HTMLCanvasElement>;

    camera: THREE.Camera;
    scene: THREE.Scene;

    @Input()
    config: HubConfig
    @Input()
    cameraType = "front";


    renderer: THREE.WebGLRenderer;

    scale = 5
    size

    ngAfterViewInit(): void {

        this.size = pcbSize(this.config.connectorsBySide, this.scale);
        this.renderer = crateRenderer(this.size.width, this.size.height);

        this.drawElement.nativeElement.appendChild(this.renderer.domElement);

        this.renderInit()
    }




    renderInit() {
        let startX = -this.size.width / 2;
        let startY = this.size.height / -2;


        if (this.cameraType == "front") {
            this.camera = new THREE.OrthographicCamera(this.size.width / 2, startX, startY, this.size.height / 2, 1, 1000);
            this.camera.position.set(0, 0, -10);
            this.camera.lookAt(0, 0, 0);

        }

        if (this.cameraType == "perspective") {
            this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
            this.camera.position.set(0, 0, -500);
            this.camera.lookAt(5, 10, 1);

            const controls = new OrbitControls(this.camera, this.renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;
        }

        this.scene = createScene();
        const group = generateHub(this.config, this.scale);
        group.position.x = -this.size.width / 2;
        group.position.y = -this.size.height / 2;
        this.scene.add(group)

        let group2 = genGroup(10);
        group2.position.y += 2;

        this.scene.add(group2)

        new RGBELoader()
            .setPath('/assets/hdr/')
            .load('skylit_garage_1k.hdr', function (texture) {

                texture.mapping = THREE.EquirectangularReflectionMapping;

                //   scene.background = texture;
                //this.scene.environment = texture;
            });


        this.renderer.useLegacyLights = false;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;

        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        this.animate();
    }


    animate() {
        this.renderer.render(this.scene, this.camera);
    }
}
