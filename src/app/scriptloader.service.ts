import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'jquery', src: 'assets/js/jquery.js' },
  { name: 'popper.min', src: 'assets/js/popper.min.js' },
  { name: 'bootstrap.min', src: 'assets/js/bootstrap.min.js' },
  { name: 'jquery-ui', src: 'assets/js/jquery-ui.js' },
  { name: 'jquery.fancybox', src: 'assets/js/jquery.fancybox.js' },
  { name: 'owl', src: 'assets/js/owl.js' },
  { name: 'appear', src: 'assets/js/appear.js' },
  { name: 'wow', src: 'assets/js/wow.js' },
  { name: 'scrollbar', src: 'assets/js/scrollbar.js' },
  { name: 'script', src: 'assets/js/script.js' }
];

declare var document: any;

@Injectable({providedIn: 'root'})

export class ScriptloaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}