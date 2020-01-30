import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  ngOnInit() {
  }

  scrollToVideos() {
    document.getElementById('videosection').scrollIntoView();
  }

  scrollToMatches() {
    document.getElementById('matchsection').scrollIntoView();
  }
}
