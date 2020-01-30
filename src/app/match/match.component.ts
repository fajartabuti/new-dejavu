import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
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
  UpcomingMatchData: any[];
  RecentMatchData: any[];
  today = new Date();
  todayFormated = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
  priorDate = new Date().setDate(this.today.getDate()-30);
  priortodayFormated = formatDate(this.priorDate, 'yyyy-MM-dd', 'en-US', '+0530');

  constructor(private db: AngularFireDatabase){

  }

  ngOnInit() {
    this.matchesRef = this.db.list('matches-list', ref => {
      let q = ref.orderByChild('match_date').startAt(this.priortodayFormated);
      return q;
    });

    this.matchesRef.snapshotChanges().subscribe(matches => {
      this.MatchData = [];
      matches.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.MatchData.push(a as Match)
      })
      // /* Data table */
      // this.dataSource = new MatTableDataSource(this.MatchData);
      // /* Pagination */
      setTimeout(() => {
        this.MatchData = this.MatchData.sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime())
        this.UpcomingMatchData = this.MatchData.filter(item => item.match_date >= this.todayFormated);
        this.RecentMatchData = this.MatchData.filter(item => item.match_date < this.todayFormated);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

}
