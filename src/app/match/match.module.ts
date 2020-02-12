import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchRoutingModule } from './match-routing.module';
import { MatchComponent } from './match.component';
import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  declarations: [MatchComponent, JwPaginationComponent],
  imports: [
    CommonModule,
    MatchRoutingModule
  ],
  exports: [MatchComponent],
})
export class MatchModule { }
