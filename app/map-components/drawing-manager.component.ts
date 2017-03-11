import {Component, ViewChild, OnInit} from '@angular/core';
//noinspection TypeScriptCheckImport
import { DrawingManager } from 'ng2-map';

let templateStr: string = `
  <h1>Drawing Manager</h1>
  <ng2-map zoom="8" center="-34.397, 150.644">
    <drawing-manager
      [drawingMode]="'marker'"
      [drawingControl]="true"
      [drawingControlOptions]="{
        position: 2,
        drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
       }"
      [circleOptions]="{
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        editable: true,
        zIndex: 1
      }"></drawing-manager>
  </ng2-map>
  selectedOverlay: {{selectedOverlay}} <br/>
  <button (click)="deleteSelectedOverlay()">Delete Selected Overlay</button>
  <code>
    <br/><b>HTML</b>
    <pre>{{templateStr | htmlCode:'-code'}}</pre>
    <br/><b>ngOnInit function</b>
    <pre>{{ngOnInit | jsCode}}</pre>
    <br/><b>deleteSelectedOverlay function</b>
    <pre>{{deleteSelectedOverlay | jsCode}}</pre>
  </code>
`;
@Component({
  template: templateStr
})
export class DrawingManagerComponent implements OnInit {
  templateStr: string = templateStr;
  selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;

  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {
      let drawingManagerEvents: string[]  = this.drawingManager['outputs'];
      drawingManagerEvents.forEach(eventName => {
        google.maps.event.addListener(dm, eventName, event => {
          google.maps.event.addListener(event.overlay, 'click', () => {
            this.selectedOverlay = event.overlay;
          });
        });
      });
    });
  }

  deleteSelectedOverlay() {
    this.selectedOverlay.setMap(null);
    delete this.selectedOverlay;
  }
}
