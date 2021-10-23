import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
 
  constructor(public router: Router) {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'xx-xxxxx-xx',
                 { page_path: event.urlAfterRedirects }
        );
      }
    });
  }
 
  title = 'AliExpress Watch Filer';

  routerLinks = [
    { path: '', label: 'AliExpress Watch Finder' },
  ];

}
