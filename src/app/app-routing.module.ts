import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScriptloaderService } from './scriptloader.service';
import { Router, NavigationEnd } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'match', loadChildren: () => import('./match/match.module').then(m => m.MatchModule) },
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
  { path: 'team', loadChildren: () => import('./team/team.module').then(m => m.TeamModule) },
  { path: '404', component: PagenotfoundComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/404'},
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
    this.scriptLoader.load('script')
    .then(data => {
      console.log('script loaded');
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}