import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './flashcards/flashcards.component';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  apiRoot : string = "http://staging-flashcards.azurewebsites.net/";

  constructor(private http : HttpClient) { }

  public getFC() : Observable<Array<Card>> {
    const headers= new HttpHeaders()
      .set('Access-Control-Allow-Origin', '')
      // .set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    return this.http.get(this.apiRoot, { 'headers': headers }) as Observable<Array<Card>>;
  }

  public addFC(fc : Card) : Observable<Card> {
    return this.http.post(this.apiRoot, fc) as Observable<Card>;
  }

  public deleteFC(id : number) : Observable<Card> {
    return this.http.delete(this.apiRoot + id) as Observable<Card>;
  }

  public editFC(fc : Card) : Observable<Card> {
    return this.http.put(this.apiRoot, fc) as Observable<Card>;
  }

}
