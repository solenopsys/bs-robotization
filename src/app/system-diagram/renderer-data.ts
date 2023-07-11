export interface Point {
    x: number,
    y: number,
}

export interface RectMin {
    width: number,
    height: number,
}

export interface Rect extends RectMin, Point {
    color: string,
}

export interface Contact {
    left: true,
    right: true,
    width: number,
    vertical: true,
}

export interface Text {
    point: Point,
    text: string,
    color: string,
    size: number,
    vertical: boolean,
    maxWidth: number,
    maxHeight: number,
    bold:boolean
}

export interface Line {
    width: number,
    points: Point[]
}

export interface DiagramConfig {
    diagramSize: RectMin
    modules: Rect[]
    lines: Line[]
    contacts: Contact[]
    texts: Text[]
}

export interface RendererEvent {
    type: string,
    conf: any
}

