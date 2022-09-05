import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { loadModules, setDefaultOptions } from 'esri-loader';
import { ArcgisApiService } from '../service/arcgis-apiservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  username: string;
  mapLoaded: boolean;
  lat = 0;
  lng = 0;
  sceneView: any;

  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  constructor(
    private geolocation: Geolocation,
    private arcgisService: ArcgisApiService
  ) {
    this.username = 'Paonessa';
  }
  ngOnInit() {
    this.getUserPosition();
    this.mapLoaded = false;
    setTimeout(() => {
      this.loadMap(4.17);
    }, 3000);
  }

  test() {
    this.arcgisService.loaded$.subscribe((loaded) => {
      if (loaded) {
        this.arcgisService
          .constructMap({ basemap: 'streets-night-vector', elevation: false })
          .then((map) => {
            this.arcgisService
              .constructSceneView({
                map: map,
                container: 'mapViewNode',
                center: [this.lng, this.lat],
                zoom: 18,
              })
              .then((sceneView) => (this.sceneView = sceneView));
          });
      }
    });
  }

  getUserPosition() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        console.log(this.lat, this.lng);
      })
      .catch((error) => {
        alert(error);
      });
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
        zoom: 15,
        center: [this.lng, this.lat],
        ui: {
          components: ['attribution'],
        },
      });

      var pointGraphic1 = new Graphic({
        geometry: {
          type: 'point',
          longitude: this.lng,
          latitude: this.lat,
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

      var graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      setTimeout(() => {
        this.mapLoaded = true;
      }, 1000);
      view.when(() => {
        view.graphics.add(pointGraphic1);
        view.popup.actions = [];
        // graphicsLayer.addMany([pointGraphic2]);
        console.log('mapLoaded.loadedSuccess');
      });
    });
  }
}
