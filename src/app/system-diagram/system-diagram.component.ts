import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {diagramConfigToStream, RendererController} from "./renderers";
import {transformData} from "./transformer";

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
        // this.cascadeLoad().then(() => {
        //     this.render()
        // });

        this.render();
    }


    ngOnInit(): void {

    }

    render() {
        const canvas = this.draw2DElement.nativeElement;


        const scale = 20

        const diagramConfig = transformData(this.config)
        let events = diagramConfigToStream(diagramConfig);

        console.log(events)

        let rendererController = new RendererController(canvas, scale);

        for (let event of events) {
            rendererController.execute(event)
        }


    }
}
