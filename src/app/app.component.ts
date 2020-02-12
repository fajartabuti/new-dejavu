import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent{
  title = 'new-dejavu';

  constructor( public router: Router ) { }
  
  @HostListener('contextmenu', ['$event'])
  
  onRightClick(event) {
    event.preventDefault();
  }
}
