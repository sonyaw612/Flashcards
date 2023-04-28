import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashcardsComponent } from './flashcards.component';
import { FlashcardService } from '../flashcard.service';
import { Card } from './flashcards.component';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('FlashcardsComponent', () => {
  let component: FlashcardsComponent;
  let fixture: ComponentFixture<FlashcardsComponent>;
  let service : FlashcardService;
  let fcs : Card[] = [
    { id: 1, question: "hello?", answer: "hi", viewAnswer: false},
    { id: 2, question: "hello?", answer: "hi again", viewAnswer: false},
    { id: 3, question: "hello?", answer: "bye", viewAnswer: false}
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsComponent);
    service = TestBed.inject(FlashcardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.cards).toEqual([]);
    expect(component.tempCard.id).toBe(0);
    expect(component.tempCard.question).toBe("")
    expect(component.tempCard.answer).toBe("")
    expect(component.tempCard.viewAnswer).toBeFalse()
    expect(component.toggleCards).toBeTrue()
    expect(component.addingFC).toBeFalse()
    expect(component.editingFC).toBeFalse()
  })

  it('should execute OnInit', () => {
    spyOn(service, 'getFC').and.returnValue(of(fcs))
    component.ngOnInit();
    expect(service.getFC).toHaveBeenCalled()
  })

  it('should toggle card view', () => {
    component.toggleView()
    expect(component.toggleCards).toBeFalse()
  })

  it('should toggle card\'s answer', () => {
    component.toggleCardAnswer(fcs[0])
    expect(fcs[0].viewAnswer).toBeTrue()
    component.toggleCardAnswer(fcs[0])
    expect(fcs[0].viewAnswer).toBeFalse()
  })

  it('should open flashcards form', () => {
    component.openFCForm();
    expect(component.addingFC).toBeTrue()
  })

  it('should add flashcard to flashcard form group', () => {
    spyOn(service, 'addFC').and.returnValue(of(fcs[0]))
    spyOn(component, 'closeFCForm').and.callThrough()
    
    component.addFCForm.controls['question'].setValue(fcs[0].question)
    component.addFCForm.controls['answer'].setValue(fcs[0].answer)
    
    expect(component.addFCForm).toBeTruthy()
    
    component.addFC(new Event('addFC'))

    expect(component.tempCard.question).toBe(fcs[0].question)
    expect(component.tempCard.answer).toBe(fcs[0].answer)
    expect(service.addFC).toHaveBeenCalled()
    expect(component.closeFCForm).toHaveBeenCalled()
    expect(component.addingFC).toBeFalse()
    // expect(component.addFCForm).toBeFalsy()
  })

  it('should close form to add flashcard', () => {
    component.closeFCForm()
    expect(component.addingFC).toBeFalse()
  })

  it('should delete flashcard', () => {
    spyOn(service, 'deleteFC').and.returnValue(of(fcs[1]))
    component.deleteFC(fcs[1])
    expect(service.deleteFC).toHaveBeenCalled()
  })

  it('should open edit flashcard form', () => {
    component.openEditFCForm(fcs[1].id)
    expect(component.editingFC).toBeTrue()
  })

  it('should execute edit flashcard', () => {
    spyOn(service, 'editFC').and.callThrough()
    component.editFCForm.controls['question'].setValue(fcs[1].question);
    component.editFCForm.controls['answer'].setValue(fcs[1].answer);
    
    component.editFC(fcs[1].id)
    expect(service.editFC).toHaveBeenCalled()
    expect(component.tempCard.question).toEqual(fcs[1].question)
    expect(component.tempCard.answer).toEqual(fcs[1].answer)
  })

  it('should close editing flashcards form', () => {
    component.closeEditFCForm()
    expect(component.editingFC).toBeFalse()
  })

});
