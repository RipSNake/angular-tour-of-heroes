import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs'; // For simulating HTTP responses
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Get Heroes from the server */
  getHeroes(): Observable<Hero[]> {
  	return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id is not found */
  getHero(id: number): Observable<Hero> {
  	return this.http.get<Hero>(this.heroesUrl + '/' + id).pipe(
        tap(_ => this.log('fetched Hero id' + id)),
        catchError(this.handleError<Hero>('getHero id: ' + id))
      );
  }

  /** POST hero. To add a hero to our server's hero list */
  addHero(hero: Hero) {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
        tap( (newHero: Hero) => this.log('added Hero with id ' + newHero.id)),
        catchError(this.handleError<Hero>('add hero Error'))
      );
  }

  /** PUT update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
        tap(_ => this.log('updated hero id: ' + hero.id)),
        catchError(this.handleError<any>('update hero id' + hero.id))
      )
  }

  /** DELETE the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap( _ => this.log(`deleted hero id: ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  /** GEt Heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    // if the term is empty, return empty hero array
    if(!term.trim()){
      return of([]);
    }
    // if there's a term to look for: request the url with the naame query
    return this.http.get<Hero[]>(this.heroesUrl+'/?name='+term).pipe(
      tap( x => x.length ?
        this.log('found heroes matching: '+term) :
        this.log(`no heroes found matching${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
  *  Handle Http operation that failed
  *  Let the app continue
  *  @param operation - name of the operation that failed
  *  @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T); 
    }
  }
}

/*
  HttpClient methods return one value

  All HttpClient methods return an RxJS Observable of something.
  HTTP is a request/response protocol. You make a request, it returns a single response.

--------------------------------------------

  HttpClient.get() returns response data

  HttpClient.get() returns the body of the response as an untyped JSON object by default. 
  Applying the optional type specifier, <Hero[]> , adds TypeScript capabilities, 
  which reduce errors during compile time.
*/