import {AbstractElement, TitlesElement} from "../abstract";
import {ModuleConf} from "../old/loader";
import {HubConf, TextConf} from "../model";


export class ModuleElement extends TitlesElement<ModuleConf> {
    constructor(conf: ModuleConf) {
        super()
        this.conf = conf
    }

    draw(ctx): void {

    }
}