import { Component, OnInit } from '@angular/core';
import { faqitem } from '../faqitem';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  faqitem = faqitem;
}
