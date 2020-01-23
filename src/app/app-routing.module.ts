import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FaqComponent} from './faq/faq.component';
import { HomeComponent} from './home/home.component';
import { AboutUsComponent} from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { ScriptloaderService } from './scriptloader.service';
import { Router, NavigationEnd } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'team', component: TeamComponent },
  { path: 'match', component: MatchComponent },
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
export class AppRoutingModule { 

  constructor(
    private router: Router,
    private scriptLoader: ScriptloaderService
    ) {
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
           this.loadScripts();
            // Function you want to call here
        }
     });
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.scriptLoader.load('jquery','owl','scrollbar','popper.min','bootstrap.min','jquery-ui',
    'jquery.fancybox','appear','wow','validate','script')
    .then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
  
}
