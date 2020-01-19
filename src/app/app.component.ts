import { Component, OnInit } from '@angular/core';
import { ScriptloaderService } from './scriptloader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent implements OnInit{
  title = 'new-dejavu';

  constructor(private scriptLoader: ScriptloaderService) {}

  ngOnInit() {
    // Just call your load scripts function with scripts you want to load
    this.loadScripts();
  }
  
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.scriptLoader.load('jquery','popper.min','bootstrap.min','jquery-ui',
    'jquery.fancybox','owl','appear','wow','scrollbar'
    ,'script').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}
