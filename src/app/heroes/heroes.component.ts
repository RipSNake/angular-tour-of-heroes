import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	
	heroes: Hero[];

	// selectedHero: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
  	this.getHeroes();
  }
/*
  onSelect(hero: Hero): void {
		if(this.selectedHero === hero) { // to deselect hero
			this.selectedHero = undefined;
			this.messageService.add('HeroesComponent: Deselected Hero id='+hero.id);
		} else {
			this.selectedHero = hero;
			this.messageService.add(`HeroesComponent: Selected Hero id=${hero.id}`);
		}
	}
*/
  getHeroes(): void {
  	this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string):void {
  	name = name.trim();
  	if(!name) {
  		return;
  	} else {
  		this.heroService.addHero({name} as Hero).subscribe(
  			hero => { this.heroes.push(hero)}
  		)
  	}
  }

  deleteHero(hero: Hero): void {
    console.log(hero);
    this.heroes = this.heroes.filter(h => h !== hero); // Elimina de la lista al hero que coincida con el que pasamos por parametro
    // Another alternative:
    // Inside the subscribe of the next heroService.deteleHero call, we can make a call
    // to 'this.getHeroes()' and update again the list of heroes of our server
    this.heroService.deleteHero(hero).subscribe();
  }
}
