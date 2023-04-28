import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashcardService } from './flashcard.service';
import { Card } from './flashcards/flashcards.component';

describe('FlashcardService', () => {
  let service: FlashcardService;
  let httpMock : HttpTestingController;
  let fcs : Card[] = [
    { id: 1, question: "hello?", answer: "hi", viewAnswer: false},
    { id: 2, question: "hello?", answer: "hi again", viewAnswer: false},
    { id: 3, question: "hello?", answer: "bye", viewAnswer: false}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FlashcardService
      ]
    });
    service = TestBed.inject(FlashcardService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all flashcards', () => {
    service.getFC().subscribe(data => {
      expect(data).toEqual(fcs);
    })

    const req = httpMock.expectOne('https://staging-flashcards.azurewebsites.net/api/Flashcard/')
    expect(req.request.method).toBe('GET')
    req.flush(fcs);
  })

  it('should add a flashcard to db', () => {
    service.addFC(fcs[0]).subscribe(data => {
      expect(data).toEqual(fcs[0])
    })
    const req = httpMock.expectOne('https://staging-flashcards.azurewebsites.net/api/Flashcard/')
    expect(req.request.method).toBe('POST')
    req.flush(fcs[0]);
  })

  it('should delete flashcard from db', () => {
    service.deleteFC(fcs[1].id).subscribe(data => {
      expect(data).toEqual(fcs[1])
    })
    const req = httpMock.expectOne('https://staging-flashcards.azurewebsites.net/api/Flashcard/' + fcs[1].id)
    expect(req.request.method).toBe('DELETE')
    req.flush(fcs[1]);
  })

  it('should edit a fc in db', () => {
    service.editFC(fcs[2]).subscribe(data => {
      expect(data).toEqual(fcs[2])
    })
    const req = httpMock.expectOne('https://staging-flashcards.azurewebsites.net/api/Flashcard/')
    expect(req.request.method).toBe('PUT')
    req.flush(fcs[2]);
  })

});
