import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DiagramLayout} from "./refactoring/layout";
import {BASE_THEME} from "./refactoring/config";

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




        const dl = new DiagramLayout(BASE_THEME)
        let transformData = dl.transformData(this.config);

        transformData.diagramSize;
        canvas.width = transformData.diagramSize.width;
        canvas.height = transformData.diagramSize.height;



    }
}
