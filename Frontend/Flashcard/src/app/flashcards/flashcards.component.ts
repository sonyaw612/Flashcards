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

  addFCForm : FormGroup = this.fb.group({
    question: new FormControl("", Validators.required),
    answer : new FormControl("", Validators.required)
  })
  editFCForm : FormGroup = this.fb.group({
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
  addingFC : boolean = false;
  editingFC : boolean = false;

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
    this.addingFC = !this.addingFC;
  }

  addFC(event : Event) {
    this.tempCard.question = this.addFCForm.controls['question'].value;
    this.tempCard.answer = this.addFCForm.controls['answer'].value;
    
    this._service.addFC(this.tempCard).subscribe(data => {
      console.log(data)
      this.cards.push(data)
      this.addFCForm.controls['question'].setValue('')
      this.addFCForm.controls['answer'].setValue('')
      this.closeFCForm()
    });
  }

  closeFCForm() {
    this.addingFC = false;
  }

  deleteFC(id : any) {
    this._service.deleteFC(id).subscribe(data => {
      console.log(data)
      this.cards.splice(this.cards.findIndex(c => c.id == data.id), 1)
    })
  }

  openEditFCForm(id : number) {
    if(!this.editingFC) this.editingFC = !this.editingFC;
    var editFCCard = this.cards.find(fc => fc.id == id)
    if(editFCCard) {
      this.editFCForm.controls['question'].setValue(editFCCard.question)
      this.editFCForm.controls['answer'].setValue(editFCCard.answer)
      this.tempCard.id = id;
    }
  }

  editFC(id : any) {
    this.tempCard.question = this.editFCForm.controls['question'].value
    this.tempCard.answer = this.editFCForm.controls['answer'].value
    console.log(this.tempCard);
    this._service.editFC(this.tempCard).subscribe(data => {
      var index = this.cards.findIndex(c => c.id == data.id)
      this.cards[index].question = data.question;
      this.cards[index].answer = data.answer;
      this.closeEditFCForm()
    })
  }

  closeEditFCForm() {
    this.editingFC = false;
  }

}

export class Card {
  id! : number;
  question : string = "";
  answer : string = "";
  viewAnswer : boolean = false;
}