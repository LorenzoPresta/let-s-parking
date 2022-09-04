import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor() {}
  ionViewDidEnter() {
    if (!document.querySelector('#tab-button-tab3')) {
      document
        .querySelector('#tab-button-tab3')
        .shadowRoot.querySelector('.button-native')
        .setAttribute('style', 'margin-top: -2px');
    }
  }
}
