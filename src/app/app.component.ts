import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {fabric} from 'fabric';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FabricJSTests';
  @ViewChild('canvasContainer', {static: true}) public canvasContainer: ElementRef<HTMLCanvasElement>;


  public canvas: fabric.Canvas;

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(this.canvasContainer.nativeElement);


  var points = [
    {"x":20,"y":20},
    {"x":200,"y":20},
    {"x":205,"y":230},
    {"x":20,"y":230}
  ];
  var options = {selectable: true, objectCaching: false};
  var polygon = new fabric.Polygon(points, options);this.canvas.add(polygon);


    points.forEach((point, index) => {
      var circle = new fabric.Circle({
        radius: 5,
        fill: 'green',
        left: point.x,
        top: point.y,
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        name: index.toString()
      });
      this.canvas.add(circle);
    });

    this.canvas.on('object:moving', function (options) {

      console.log(options);

      var objType = options.target.get('type');
      var p = options.target;
      polygon.points[p.name] = {x: p.getCenterPoint().x, y: p.getCenterPoint().y};

      //UNCOMMENT LINES 39 - 42 TO HAVE A WORKAROUND
      // this.canvas.remove(polygon);
      // polygon = new fabric.Polygon(polygon.points, {selectable: false});
      // this.canvas.add(polygon);
      // this.canvas.sendToBack(polygon);
    });

  }





}
