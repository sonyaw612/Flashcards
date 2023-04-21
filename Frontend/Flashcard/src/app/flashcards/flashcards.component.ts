import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {
  cards : Card[] = [
  // { question : "What is my name?",
  //   answer : "Sonya",
  //   viewAnswer: false  
  // },
  // { question : "What is my favorite color?",
  //   answer : "Red",
  //   viewAnswer: false  
  // },
  // { question : "What is my favorite cuisine?",
  //   answer : "Japanese",
  //   viewAnswer: true  
  // }
  ];

  fcForm : FormGroup = this.fb.group({
    question: new FormControl("", Validators.required),
    answer : new FormControl("", Validators.required)
  })

  tempCard : Card = {
    id: 0,
    question: "",
    answer: "",
    viewAnswer: false
  };  

  toggleCards : boolean = true; // if true show card view
  addFC : boolean = false;

  constructor(private _service : FlashcardService, private fb : FormBuilder) {}
  
  ngOnInit(): void {
    // get all flashcards
    this._service.getFC().subscribe(data => {
      this.cards = data;
      this.cards.forEach(element => {
        console.log(element)
        element.viewAnswer = false;
      });
    });
  }

  toggleView() {
    this.toggleCards = !this.toggleCards;
  }

  toggleCardAnswer(fc : Card) {
    console.log(fc.question)
    fc.viewAnswer = !fc.viewAnswer;
  }

  openFCForm() {
    this.addFC = !this.addFC;
  }

  addFCForm(event : Event) {
    this.tempCard.question = this.fcForm.controls['question'].value;
    this.tempCard.answer = this.fcForm.controls['answer'].value;
    
    this._service.addFC(this.tempCard).subscribe(data => {
      console.log(data)
    });
  }

  deleteFC(id : any) {
    this._service.deleteFC(id).subscribe(data => {
      console.log(data)
    })
  }

  editFC(id : any) {
    var fcEdit = this.cards.find(fc => fc.id == id);
    // if(fcEdit) fcEdit.answer = "hallelujah";
    console.log(fcEdit);
    this._service.editFC(fcEdit? fcEdit : {}).subscribe(data => {
      console.log(data)
    })
  }

}

export class Card {
  id? : number;
  question? : string = "";
  answer? : string = "";
  viewAnswer? : boolean = false;
}