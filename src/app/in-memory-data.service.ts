import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
  	const heroes = [
  		{ id: 11, name: 'Dr Nice' },
  		{ id: 12, name: 'Stormenta' },
  		{ id: 13, name: 'Bombasto' },
  		{ id: 14, name: 'Clear Blast' },
  		{ id: 15, name: 'Ugo Lin' },
  		{ id: 16, name: 'Glass' },
  		{ id: 17, name: 'Deprecated' },
  		{ id: 18, name: 'Number 18' },
  		{ id: 19, name: 'ITom' },
  		{ id: 20, name: 'Babasonic' }
  	];
  	return {heroes};
  }

  genId(heroes: Hero[]): number {
  	return heroes.length > 0 ?  Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
