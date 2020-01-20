import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FaqComponent} from './faq/faq.component';
import { HomeComponent} from './home/home.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
