import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // to add routing functionality
import { HeroesComponent } from './heroes/heroes.component'; // destination of the routes
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

/*
	Routes tell the Router which view to display when a user clicks 
	a link or pastes a URL into the browser address bar.

	A typical Angular Route has two properties:

	- path: a string that matches the URL in the browser address bar.
	- component: the component that the router should create when navigating to this route.
*/
const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'heroes', component: HeroesComponent },
	{ path: 'hero/detail', component: HeroDetailComponent },
	{ path: 'hero/detail/:id', component: HeroDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
  	RouterModule
  ]
})
export class AppRoutingModule { }
