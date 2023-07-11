export interface Titles {
    title: string
    description: string
}

export interface HubConf extends Titles{
    sideConnectors: number
    skip: number[]
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

export interface ModuleConf extends Titles{
    len: ModuleSize

    width: number
    ioConnectors: { [key: string]: number }
    powerConnectors: string[]
}

export interface PowerLine {
    name: string,
    type: PowerLineType,
}

export interface BladeConfig {
    hubs: HubConf[]
    leftIdiModules: ModuleConf[]
    rightIdiModules: ModuleConf[]
    powerGroup: string[][]
}