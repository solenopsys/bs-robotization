import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

// export interface Config {
//     modules: { [key: string]: string }
//     name: string
//     instances: { [key: string]: string }
// }
//
// export async function cascadeLoad(http: HttpClient) {
//     const controller = new RendererController()
//     controller.conf = await firstValueFrom(http.get<Config>(this.configUrl))
//     for (let key in this.conf.modules) {
//         controller.modules[key] = await firstValueFrom(http.get<string>(this.conf.modules[key]))
//     }
//
//     return controller;
// }
