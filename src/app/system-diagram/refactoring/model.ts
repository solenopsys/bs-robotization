export interface Titles {
    title: string
    description: string
}


export interface HubConf extends Titles{
    sideConnectors: number
    skip: number[]
}

export interface ContactConf {
    title: string,
    firstArrow: boolean,
    secondArrow: boolean,
    width:number,
}

export interface TextConf {
    text: string,
    color: string,
    size: number,
    maxWidth: number,
    maxHeight: number,
    bold:boolean
}

export interface TitlesConf extends Titles {
    exWidth: number,
    exHeight: number,
    color: string,
}

export interface Point {
    x: number,
    y: number,
}

export interface RectMin {
    width: number,
    height: number,
}

export interface RectConf extends RectMin, Point {
    color: string,
}


export interface PolygonConf{
    points: Point[]
}

export enum ModuleSize {
    ExtraSmall = "XS",//16
    Small = "S",// 26
    Medium = "M",// 30
    Large = "L",// 38
    ExtraLarge = "XL", // 42
    DoubleExtraLarge = "XXL" // 60
}

export enum PowerLineType {
    PcbLines = "PCB", // small power
    Tube = "TUBE", // middle power
    Rod = "ROD", // big power
    Sheet = "SHEET", // large power
}


