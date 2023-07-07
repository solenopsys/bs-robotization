import {BladeConfig, HubConf, ModuleConf, ModuleSize} from "./diagram-data";
import {DiagramConfig, Rect} from "./renderer-data";


const SIZES_MAP: { [key: string]: number } = {
    "XS": 2,
    "S": 4,
    "M": 8,
    "L": 16,
    "XL": 32,
    "XXL": 64,
}

export const STANDARD_WIDTH = 4;
export const STANDARD_GAP = 2;
export const PADDING = 6;


function hubTransform(hub: HubConf, x: number, y: number): Rect {
    return {
        x,
        y,
        width: STANDARD_WIDTH,
        height: hub.sideConnectors * STANDARD_WIDTH + (hub.sideConnectors - 1) * STANDARD_GAP,
        color: "red"
    }
}

function modTransform(mod: ModuleConf, xHub: number, y: number, right: boolean): Rect {
    let moduleWidth = SIZES_MAP[mod.len];
    return {
        x: right ? xHub + STANDARD_WIDTH + STANDARD_GAP : xHub - moduleWidth - STANDARD_GAP,
        y,
        width: moduleWidth,
        height: mod.width * STANDARD_WIDTH + (mod.width - 1) * STANDARD_GAP,
        color: "red"
    }
}

function findMaxWidth(modules: ModuleConf[]): number {
    let mx = 0;
    modules.forEach((mod) => {
        const curW = SIZES_MAP[mod.len]
        if (curW > mx) {
            mx = curW;
        }
    });
    return mx;
}

export function transformData(conf: BladeConfig): DiagramConfig {

    let modules: Rect[] = [];

    const leftMax = findMaxWidth(conf.leftIdiModules);
    const rightMax = findMaxWidth(conf.rightIdiModules);
    let hubsHeight = 0;
    let hubsCount = 0;

    let xHub = leftMax + PADDING + STANDARD_GAP;

    conf.hubs.forEach((hub, index) => {
        let rect = hubTransform(hub, xHub, PADDING + hubsHeight);
        modules.push(rect);
        hubsHeight += rect.height;
        hubsCount++;
    });

    let leftY = PADDING;
    conf.leftIdiModules.forEach((mod) => {
        let rect = modTransform(mod, xHub, leftY, false);
        leftY = leftY + rect.height + STANDARD_GAP;
        modules.push(rect);
    });

    let rightY = PADDING;
    conf.rightIdiModules.forEach((mod, index) => {
        let rect = modTransform(mod, xHub, rightY, true);
        modules.push(rect);
    });

    return {
        diagramSize: {
            width: leftMax + rightMax + 2 * PADDING + STANDARD_WIDTH,
            height: hubsHeight + (hubsCount - 1) * STANDARD_GAP + 2 * PADDING
        },
        modules: modules,
        lines: [],
        contacts: [],
        texts: []
    }
}