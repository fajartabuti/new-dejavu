import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  scrollToVideos(e) {
    document.getElementById('videosection').scrollIntoView();
  }

  scrollToMatches(e) {
    document.getElementById('matchsection').scrollIntoView();
  }
}
