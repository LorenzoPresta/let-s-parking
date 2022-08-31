import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { loadModules, setDefaultOptions } from 'esri-loader';
import { version } from 'typescript';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  username: string;
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  constructor() {
    this.username = 'Paonessa';
  }
  ngOnInit() {
    this.loadMap(4.18);
  }

  loadMap(version) {
    setDefaultOptions({ version });
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
    ]).then(([Map, MapView, Graphic, GraphicsLayer]) => {
      let map = new Map({
        basemap: 'streets-night-vector',
      });

      let view = new MapView({
        container: this.mapViewEl.nativeElement,
        map: map,
        zoom: 10,
        center: [16.253, 39.295],
        ui: {
          components: ['attribution'],
        },
      });

      var pointGraphic1 = new Graphic({
        geometry: {
          type: 'point',
          longitude: 16,
          latitude: 39,
        },
        symbol: {
          type: 'simple-marker',
          color: [40, 119, 226],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
        },
      });
      var pointGraphic2 = new Graphic({
        geometry: {
          type: 'point',
          longitude: -51,
          latitude: 41,
        },
        symbol: {
          type: 'simple-marker',
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
        },
      });

      var graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      view.when(() => {
        view.graphics.add(pointGraphic1);
        view.popup.actions = [];
        graphicsLayer.addMany([pointGraphic2]);
        console.log('component.loaded');
      });
    });
  }
}
