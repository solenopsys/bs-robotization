import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {HubConf, ModuleSize, Point, PowerLineType, RectMin, Titles} from "../model";
import {DrawElement} from "../abstract";

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
    leftIdiModules: (ModuleConf|undefined)[]
    rightIdiModules: (ModuleConf|undefined)[]
    powerGroup: string[][]
}


export interface Line {
    width: number,
    points: Point[]
}

export interface DiagramConfig {
    draws: DrawElement[];
    diagramSize: RectMin;
}

export interface RendererEvent {
    type: string,
    conf: any
}




export interface Config {
    modules: { [key: string]: string }
    name: string
    instances: { [key: string]: string }
}

export async function cascadeLoad(http: HttpClient, configUrl: string ) {
    const modules = {};
    const conf = await firstValueFrom(http.get<Config>(configUrl))
    for (let key in conf.modules) {
        modules[key] = await firstValueFrom(http.get<string>(conf.modules[key]))
    }

    conf.modules=modules;

    return conf;
}
