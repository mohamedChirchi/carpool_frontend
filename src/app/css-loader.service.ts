import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssLoaderService {
  loadCss(href: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = href;
      link.onload = (event: Event) => resolve();
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }
}
