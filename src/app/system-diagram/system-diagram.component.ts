import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DiagramLayout} from "./refactoring/layout";
import {BASE_THEME} from "./refactoring/config";
import {drawItem} from "./refactoring/abstract";

export interface DiagramConfig {
    hubs: any[];
    leftIdiModules: any[];
    rightIdiModules: any[];
    powerGroup: any[];
}


@Component({
    selector: 'system-diagram',
    templateUrl: './system-diagram.component.html',
    styleUrls: ['./system-diagram.component.css']
})
export class SystemDiagramComponent implements OnInit {
    @ViewChild("2dDraw", {static: true})
    draw2DElement!: ElementRef<HTMLCanvasElement>;


    @Input()
    config: DiagramConfig


    ngAfterViewInit(): void {

        this.render();
    }


    ngOnInit(): void {

    }

    render() {
        const canvas = this.draw2DElement.nativeElement;


        let theme = BASE_THEME;
        const dl = new DiagramLayout(theme)
        let transformData = dl.transformData(this.config);

        transformData.diagramSize;
        canvas.width = transformData.diagramSize.width;
        canvas.height = transformData.diagramSize.height;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        transformData.draws.forEach(d => drawItem(ctx, d, theme.gridPitch));


    }
}
