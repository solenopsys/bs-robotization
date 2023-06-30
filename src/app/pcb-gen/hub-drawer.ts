export const HUB_HEIGHT = 25;
export const CONNECTOR_WIDTH = 25;
export const M2_HEIGHT = 4;
export const M2_PADDING = 2.5;

import * as THREE from "three";


export function pcbSize(sideConnectorsCount: number, scale: number) {
    return {
        width: sideConnectorsCount * CONNECTOR_WIDTH * scale,
        height: (HUB_HEIGHT + M2_HEIGHT * 2) * scale
    }
}

export interface DrawFunction {
    (context: CanvasRenderingContext2D, startX: number, startY: number, scale: number): { x: number, y: number };
}

export function drawConnector(context: CanvasRenderingContext2D, startX: number, startY: number, scale: number) {
    const m2Padding = M2_PADDING * scale;
    const m2Height = M2_HEIGHT * scale;
    const m2Width = (CONNECTOR_WIDTH - M2_PADDING * 2) * scale;
    let nextX = m2Padding + startX;

    context.lineTo(nextX, startY);

    let nextY = startY - m2Height;
    context.lineTo(nextX, nextY);
    nextX = nextX + m2Width;


    context.lineTo(nextX, nextY);

    nextY = nextY + m2Height;
    context.lineTo(nextX, nextY);
    nextX = nextX + m2Padding;
    context.lineTo(nextX, nextY);

    return {x: nextX, y: nextY};
}

export function drawLine(context: any, startX: number, startY: number, scale: number) {

    const m2Width = (CONNECTOR_WIDTH) * scale;
    let nextX = m2Width + startX;

    context.lineTo(nextX, startY);
    return {x: nextX, y: startY};
}

const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700, // Set the base color to gold
    metalness: 1,   // Make the material fully metallic
    //  roughness: 0.2, // Set a moderate roughness for a polished look
});


export function pinArray(geometry, scene, startX, startY,scale) {
    for(let j = 0; j < 40; j++){
        const mesh  =  new THREE.Mesh(geometry, goldMaterial);
        mesh.position.z = -1;
        mesh.position.x = (0.5*scale * j)+startX ;
        mesh.position.y= startY ;
        scene.add(mesh);
    }
}



export class M2Drawer {
    constructor(private connectors: number,
                private scale: number,
                private skip: number[],
                private drawSkip: DrawFunction,
                private draw: DrawFunction
    ) {

    }

    isSkip(n: number) {
        return this.skip.some(d => d == n)
    }

    getDrawFunction(n: number) {
        return this.isSkip(n) ? this.drawSkip : this.draw
    }


    public drawPath(context: CanvasRenderingContext2D, startX: number, startY: number) {
        const hubHeight = HUB_HEIGHT * this.scale;
        const connectorWidth = CONNECTOR_WIDTH * this.scale


        context.moveTo(startX, startY);

        let n = 0

        for (let i = 0; i < this.connectors; i++) {
            n++
            const df: DrawFunction = this.getDrawFunction(n);
            df(context, startX + connectorWidth * i, startY, this.scale);
        }


        context.lineTo(startX + this.connectors * connectorWidth, startY + hubHeight);


        for (let i = 0; i < this.connectors; i++) {
            n++
            let pos = connectorWidth * (this.connectors - i);
            const df: DrawFunction = this.getDrawFunction(n);
            df(context, startX + pos, startY + hubHeight, -1 * this.scale);
        }


        context.lineTo(startX, startY);
    }
}


