import { Injectable } from '@angular/core';
import { loadModules, loadScript } from 'esri-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ArcgisApiService {
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loaded$.subscribe((loaded) => {
      if (!loaded) {
        loadScript({
          // use a specific version of the JSAPI
          url: 'https://js.arcgis.com/4.7/',
        })
          .then(() => {
            this.loaded$.next(true);
          })
          .catch((err) => this.loaded$.next(true));
      }
    });
  }

  constructMap(opts: { basemap: any; elevation: boolean }): Promise<any[]> {
    return new Promise((resolve, reject) => {
      loadModules(['esri/Map']).then(([Map]) => {
        const map = new Map({
          basemap: opts.basemap,
        });
        if (opts.elevation) {
          map.ground = 'world-elevation';
        }
        resolve(map);
      });
    });
  }

  constructSceneView(opts: {
    center: number[];
    zoom: number;
    container: string;
    map: any;
    padding?: any;
  }): Promise<any[]> {
    return new Promise((resolve, reject) => {
      loadModules(['esri/views/SceneView']).then(([SceneView]) => {
        const view = new SceneView({
          center: opts.center,
          zoom: opts.zoom,
          map: opts.map,
          container: opts.container,
          padding: opts.padding ? opts.padding : {},
        });
        view.when(() => {
          resolve(view);
        });
      });
    });
  }
}
