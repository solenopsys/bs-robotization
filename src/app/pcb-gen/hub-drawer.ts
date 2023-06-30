export const HUB_HEIGHT = 25;
export const CONNECTOR_WIDTH = 25;
export const M2_HEIGHT = 4;
export const M2_PADDING = 2.5;

export function pcbSize(sideConnectorsCount:number, scale: number){
    return {
        width:sideConnectorsCount*CONNECTOR_WIDTH*scale,
        height:(HUB_HEIGHT+M2_HEIGHT*2)*scale
    }
}

interface DrawFunction {
    (context: CanvasRenderingContext2D, startX: number, startY: number, scale: number): { x: number, y: number };
}

function drawConnector(context: CanvasRenderingContext2D, startX: number, startY: number, scale: number) {
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

function drawLine(context: CanvasRenderingContext2D, startX: number, startY: number, scale: number) {

    const m2Width = (CONNECTOR_WIDTH) * scale;
    let nextX = m2Width + startX;

    context.lineTo(nextX, startY);
    return {x: nextX, y: startY};
}


export function drawM2(context: CanvasRenderingContext2D, startX: number, startY: number, connectors: number, scale: number,skip:number[]) {
    const hubHeight = HUB_HEIGHT * scale;
    const connectorWidth = CONNECTOR_WIDTH * scale




    context.moveTo(startX, startY);

    let n=0

    for (let i = 0; i < connectors; i++) {
        n++
        const df: DrawFunction = skip.some(d=>d==n) ? drawLine : drawConnector;
        df(context, startX + connectorWidth * i, startY, scale);
    }

    context.lineTo(startX + connectors * connectorWidth, startY + hubHeight);


    for (let i = 0; i < connectors; i++) {
        n++
        let pos = connectorWidth * (connectors - i);
        const df: DrawFunction =  skip.some(d=>d==n) ? drawLine : drawConnector;
        df(context, startX + pos, startY + hubHeight, -1 * scale);
    }

    context.lineTo(startX, startY);
}