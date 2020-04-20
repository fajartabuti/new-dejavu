import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public href: string = "";

  constructor( public router: Router ) 
  {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if( e.url.includes("match")){
          this.href = 'MATCHES';
        }
        if( e.url.includes("team")){
          this.href = 'OUR TEAMS';
        }
        if( e.url.includes("tournament")){
          this.href = 'TOURNAMENTS';
        }
        if( e.url.includes("about-us")){
          this.href = 'ABOUT US';
        }
        if( e.url.includes("faq")){
          this.href = 'FAQ\'S';
        }
        if( e.url.includes("contact")){
          this.href = 'CONTACT';
        }
      }
    });
  }

  ngOnInit() {
  }
}
