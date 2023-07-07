import {BladeConfig, ModuleConf, ModuleSize} from "./diagram-data";
import {transformData} from "./transformer";
import {DiagramConfig} from "./renderer-data";

describe('Diagram test', () => {
    let diagramConfig: DiagramConfig;
    beforeEach(() => {
        let hubs = [
            {sideConnectors: 2, skip: [1]},
            {sideConnectors: 3, skip: []}];

        let leftIdiModules: ModuleConf[] = [
            {
                len: ModuleSize.Medium,
                width: 1,
                ioConnectors: {
                    "UIC": 1,
                },
                powerConnectors: ["25v"]
            }
        ];
        let rightIdiModules: ModuleConf[] = [
            {
                len: ModuleSize.Small,
                width: 2,
                ioConnectors: {
                    "UIC1": 1,
                    "UIC2": 1,
                },
                powerConnectors: ["40v"]
                ,
            }];
        let powerGroup = [[
            "25v", "40v"], [
            "25v", "40v"]];


        const bc: BladeConfig = {
            hubs: hubs,
            leftIdiModules: leftIdiModules,
            rightIdiModules: rightIdiModules,
            powerGroup: powerGroup,
        }


        diagramConfig = transformData(bc)
    });
    it('should be 4 modules', () => {
        let actual = diagramConfig.modules.length;
        expect(actual).toBe(4);
    });

    it('should correct modules widths', () => {
        let modules = diagramConfig.modules;
        expect(modules[0].width).toBe(4);
        expect(modules[1].width).toBe(4);
        expect(modules[2].width).toBe(8);
        expect(modules[3].width).toBe(4);
    });

    it('should correct modules heights', () => {
        let modules = diagramConfig.modules;
        expect(modules[0].height).toBe(10);
        expect(modules[1].height).toBe(16);
        expect(modules[2].height).toBe(4);
        expect(modules[3].height).toBe(10);
    })

    it('should correct diagram size', () => {
        let size = diagramConfig.diagramSize;
        expect(size.width).toBe(28);
        expect(size.height).toBe(6 * 2 + 5 * 4 + 4 * 2);
    });

    it('should correct coordinates X', () => {
        let modules = diagramConfig.modules;
        expect(modules[0].x).toBe(16);
        expect(modules[1].x).toBe(16);
        expect(modules[2].x).toBe(6);
        expect(modules[3].x).toBe(22);
    });

    it('should correct coordinates Y', () => {
        let modules = diagramConfig.modules;
        expect(modules[0].y).toBe(6);
        expect(modules[1].y).toBe(16);
        expect(modules[2].y).toBe(6);
        expect(modules[3].y).toBe(6);
    });


});