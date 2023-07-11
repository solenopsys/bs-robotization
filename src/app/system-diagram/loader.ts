import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {RendererController} from "./renderers";


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
