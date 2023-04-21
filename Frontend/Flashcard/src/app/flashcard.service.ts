import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './flashcards/flashcards.component';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  apiRoot : string = "http://localhost:5296/";

  constructor(private http : HttpClient) { }

  public getFC() : Observable<Array<Card>> {
    return this.http.get(this.apiRoot) as Observable<Array<Card>>;
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
