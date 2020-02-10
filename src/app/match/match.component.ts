import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {formatDate } from '@angular/common';

export interface Match {
  $key: string;
  match_type: string;
  match_title: string;
  match_date: Date;
  rival_logo: string;
  logo_id: string;
}
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchesRef: AngularFireList<any>;
  MatchData: any[];
  hidePagination = false;
  UpcomingMatchData: any[];
  RecentMatchData: any[];
  allItems: Array<any>;
  UpcomingItems: Array<any>;
  today = new Date();
  todayFormatted = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
  priorDate = new Date().setDate(this.today.getDate()-30);
  priorTodayFormatted = formatDate(this.priorDate, 'yyyy-MM-dd', 'en-US', '+0530');
  MatchDataSort: any[];

  constructor(private db: AngularFireDatabase){}

  ngOnInit() {
    this.matchesRef = this.db.list('matches-list', ref => {
      let q = ref.orderByChild('match_date').startAt(this.priorTodayFormatted);
      return q;
    });

    this.matchesRef.snapshotChanges().subscribe(matches => {
      this.MatchData = [];
      matches.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.MatchData.push(a as Match)
      })
      setTimeout(() => {
        this.MatchDataSort = this.MatchData.sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime())
        this.UpcomingMatchData = this.MatchDataSort.filter(item => item.match_date >= this.todayFormatted);
        this.RecentMatchData = this.MatchDataSort.filter(item => item.match_date < this.todayFormatted);
        this.RecentMatchData.splice(5)
        this.hidePagination = this.UpcomingMatchData.length < 5 ? true : false;
      }, 0);
    })
  }

  onChangeAllMatchesPage(allItems: Array<any>) {
    this.allItems = allItems;
  }

  onChangeUpMatchesPage(UpcomingItems: Array<any>) {
    this.UpcomingItems = UpcomingItems;
  }
}
