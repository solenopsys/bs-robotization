import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'system-diagram',
    templateUrl: './system-diagram.component.html',
    styleUrls: ['./system-diagram.component.css']
})
export class SystemDiagramComponent implements OnInit {
    @ViewChild("2dDraw", {static: true})
    draw2DElement!: ElementRef<HTMLCanvasElement>;


    @Input()
    configUrl: string



    constructor(private http: HttpClient) {

    }

    ngAfterViewInit(): void {
        // this.cascadeLoad().then(() => {
        //     this.render()
        // });
    }



    ngOnInit(): void {

    }

    render() {
        const canvas = this.draw2DElement.nativeElement;
        const context = canvas.getContext('2d');

        const scale = 5

        canvas.width = 800;
        canvas.height = 800;

        // let instances = this.conf.instances;
        //
        // for (let key in instances) {
        //     let instance = instances[key];
        //     let conf = this.modules[instance];
        //     let type = conf['type'];
        //     let renderer = RENDERERS[type];
        //     if(renderer) {
        //         renderer(context, conf);
        //     }else {
        //        console.log("No renderer for type: " + type)
        //     }
        // }



    }
}
