import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {crateRenderer} from "./three-conf";
import * as THREE from "three";
import {drawM2, M2_HEIGHT, pcbSize} from "./hub-drawer";
import {createScene} from "./scene";

export interface HubConfig {
    connectorsBySide: number,
    skip: number[],
}


@Component({
    selector: 'pcb-gen',
    templateUrl: './pcb-gen.component.html',
    styleUrls: ['./pcb-gen.component.css']
})
export class PcbGenComponent implements AfterViewInit {
    @ViewChild("3dDraw", {static: true})
    drawElement!: ElementRef<HTMLCanvasElement>;

    @Input()
    config: HubConfig


    renderer: THREE.WebGLRenderer;

    scale = 5
    size

    ngAfterViewInit(): void {

        this.size = pcbSize(this.config.connectorsBySide, this.scale);
        this.renderer = crateRenderer(this.size.width, this.size.height);

        this.drawElement.nativeElement.appendChild(this.renderer.domElement);

        this.render()
    }


    render() {
        const camera = new THREE.OrthographicCamera(this.size.width / 2, -this.size.width / 2, this.size.height / -2, this.size.height / 2, 1, 1000);
        camera.position.set(0, 0, -10); // Position the camera on the opposite side (-10 units along the z-axis)
        camera.lookAt(0, 0, 0); // Make the camera look at the origin (0, 0, 0)


        const halfCircle: CanvasRenderingContext2D = new THREE.Shape();
        drawM2(halfCircle, -this.size.width / 2, this.size.height / -2 + M2_HEIGHT * this.scale, this.config.connectorsBySide, this.scale, this.config.skip)

        const extrudeSettings = {
            depth: 2,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 1,
            bevelThickness: 1
        };

        const geometry = new THREE.ExtrudeGeometry(halfCircle, extrudeSettings);

        const material = new THREE.MeshBasicMaterial({color: 0x00aa00});



        //  const shape = genMesh(this.scale, this.config.connectorsBySide, this.config.skip, -this.size.width / 2, this.size.height / -2)
        const shape = new THREE.Mesh(geometry, material);

        const scene = createScene();
        scene.add(shape);
        this.renderer.render(scene, camera);
    }
}
