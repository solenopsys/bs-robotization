import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {drawM2, M2_HEIGHT} from "../pcb-gen/hub-drawer";
import {crateRenderer} from "../pcb-gen/three-conf";
import {HubConfig} from "../pcb-gen/pcb-gen.component";


@Component({
  selector: 'helper-render',
  templateUrl: './helper-render.component.html',
  styleUrls: ['./helper-render.component.css']
})
export class HelperRenderComponent {
  @ViewChild("2dDraw", {static: true})
  draw2DElement!: ElementRef<HTMLCanvasElement>;

  @Input()
  config: HubConfig
  ngAfterViewInit(): void {

    this.render()
  }

  render(){
    const canvas = this.draw2DElement.nativeElement;
    const context = canvas.getContext('2d');

    const scale=5

    canvas.width = 1200;
    canvas.height = 300;

    drawM2(context,0,M2_HEIGHT*scale,this.config.connectorsBySide,5,this.config.skip)

    context.fillStyle = 'blue';
    context.fill();
  }
}
