import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {crateRenderer} from "./three-conf";
import * as THREE from "three";
import {
    CONNECTOR_WIDTH,
    drawConnector, DrawFunction,
    drawLine, HUB_HEIGHT,
    M2_HEIGHT,
    M2_PADDING,
    M2Drawer,
    pcbSize,
    pinArray
} from "./hub-drawer";
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

    shapeMacros(scene) {
        let startX = -this.size.width / 2;
        let startY = this.size.height / -2 + M2_HEIGHT * this.scale;
        const halfCircle: CanvasRenderingContext2D = new THREE.Shape();

        const extrudeSettings = {
            depth: 2,
            steps: 2
        };


        const d = new M2Drawer(this.config.connectorsBySide, this.scale, this.config.skip, drawLine, drawConnector)
        d.drawPath(halfCircle, 0, 0)


        const geometry = new THREE.ExtrudeGeometry(halfCircle, extrudeSettings);

        const material = new THREE.MeshBasicMaterial({color: 0x00aa00});


        const shape = new THREE.Mesh(geometry, material);
        shape.position.x = startX;
        shape.position.y = startY;


        scene.add(shape);
    }

     isSkip(n: number) {
        return this.config.skip.some(d => d == n)
    }

    pinsMacros(scene) {
        let startX = -this.size.width / 2 + M2_PADDING * this.scale;
        let startY = this.size.height / -2
        const context: CanvasRenderingContext2D = new THREE.Shape();

        const extrudeSettings = {
            depth: 4,
            steps: 2,
        }


        const height = 3 * this.scale;
        const width = 0.35 * this.scale;

        context.moveTo(0, 0)
        context.lineTo(0, height)
        context.lineTo(width, height)
        context.lineTo(width, 0)
        context.lineTo(0, 0);

        const geometry = new THREE.ExtrudeGeometry(context, extrudeSettings);

        const connectorWidth = CONNECTOR_WIDTH * this.scale
        const hubHeight = HUB_HEIGHT * this.scale;


        let n = 0;
        for (let i = 0; i < this.config.connectorsBySide; i++) {
            n++
            if(!this.isSkip(n))
                pinArray(geometry, scene, startX + connectorWidth * i, startY, this.scale)

        }

        for (let i = 0; i < this.config.connectorsBySide; i++) {
            n++
            let pos = connectorWidth * (this.config.connectorsBySide - i) - M2_PADDING * this.scale * 2;
            if(!this.isSkip(n))
                pinArray(geometry, scene, startX + pos-1, startY + hubHeight+5*this.scale, -1 * this.scale)
        }
    }


    render() {
        let startX = -this.size.width / 2;
        let startY = this.size.height / -2;
        const camera = new THREE.OrthographicCamera(this.size.width / 2, startX, startY, this.size.height / 2, 1, 1000);
        camera.position.set(0, 0, -10); // Position the camera on the opposite side (-10 units along the z-axis)
        camera.lookAt(0, 0, 0); // Make the camera look at the origin (0, 0, 0)

        const scene = createScene();
        this.pinsMacros(scene);
        this.shapeMacros(scene);


        this.renderer.render(scene, camera);
    }
}
