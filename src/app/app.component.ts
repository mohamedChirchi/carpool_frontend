import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from './script-loader.service';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { DarkModeService } from './dark-mode.service';
import { CssLoaderService } from './css-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'carpool_frontend';
  constructor(
    private router: Router,
    private scriptLoaderService: ScriptLoaderService,
    private cssLoaderSerice: CssLoaderService,
    private darkModeService: DarkModeService,
  ) { }


  ngOnInit() {
    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadJSandCssFiles();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadJSandCssFiles();
      }
    });
 */

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadJSandCssFiles();
      }
    });

    this.updateDarkModeClass();
  }
/*   loadJSandCssFiles() {
    const cssPromises = [
      this.cssLoaderSerice.loadCss('assets/css/plugins/bootstrap.min.css'),
      this.cssLoaderSerice.loadCss('assets/css/plugins/fontawesome.min.css'),
      this.cssLoaderSerice.loadCss('assets/css/plugins/slick.css'),
      this.cssLoaderSerice.loadCss('assets/css/style.css')
    ];
  
    const jsPromises = [
      this.scriptLoaderService.loadScript('assets/js/plugins/jquery.min.js'),
      this.scriptLoaderService.loadScript('assets/js/plugins/jquery.slick.min.js'),
      this.scriptLoaderService.loadScript('assets/js/plugins/isotope.pkg.min.js'),
      this.scriptLoaderService.loadScript('assets/js/main.js')
    ];
  
    Promise.all([...cssPromises, ...jsPromises])
      .then(() => {
        console.log('All files are reloaded');
        this.loader.hide();
      })
      .catch((error) => {
        console.error('Error loading files:', error);
        this.loader.hide(); // Handle errors by hiding the loader
      });
  } */
  
  loadJSandCssFiles() {
    this.cssLoaderSerice.loadCss('assets/css/plugins/bootstrap.min.css')
      .then(() => {
        console.log('bootstrap.min.css is reloaded');
      })
    this.cssLoaderSerice.loadCss('assets/css/plugins/fontawesome.min.css')
      .then(() => {
        console.log('fontawesome.min.css is reloaded');
      })
    this.cssLoaderSerice.loadCss('assets/css/plugins/slick.css')
      .then(() => {
        console.log('slick.css is reloaded');
      })
    this.cssLoaderSerice.loadCss('assets/css/style.css')
      .then(() => {
        console.log('style.css is reloaded');
      })

    this.scriptLoaderService.loadScript('assets/js/plugins/jquery.min.js')
      .then(() => {
        console.log('jquery.min.js is reloaded');
      })
    this.scriptLoaderService.loadScript('assets/js/plugins/jquery.slick.min.js')
      .then(() => {
        console.log('slick.min.js is reloaded');
      })
    this.scriptLoaderService.loadScript('assets/js/plugins/isotope.pkg.min.js')
      .then(() => {
        console.log('isotope.js is reloaded');
      })
    this.scriptLoaderService.loadScript('assets/js/main.js')
      .then(() => {
        console.log('main.js is reloaded');
      })
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
    this.updateDarkModeClass();
  }

  private updateDarkModeClass() {
    const body = document.getElementsByTagName('body')[0];
    if (this.darkModeService.getIsDarkMode()) {
      body.classList.add('cs-dark');
    } else {
      body.classList.remove('cs-dark');
    }
  }
}

