using DataAccess;
using Models;

namespace Services;

public class FCService {
    private readonly FlashcardDbContext _context;

    public FCService(FlashcardDbContext context) {
        _context = context;
    }

    // get all flashcards
    public List<Flashcard> GetAllFCs() {
        return _context.Flashcards.ToList();
    }

    // get all flashcards
    public Flashcard GetFC(int id) {
        return _context.Flashcards.Where(fc => fc.Id == id).SingleOrDefault();
    }

    // create a flashcard
    public Flashcard CreateFC(Flashcard fc) {
        _context.Flashcards.Add(fc);
        _context.SaveChanges();
        return fc;
    }

    // edit a flashcard
    public Flashcard EditFC(Flashcard fc) {
        _context.Flashcards.Update(fc);
        _context.SaveChanges();
        return fc;
    }

    // delete a flashcard
    public Flashcard DeleteFC(int id) {
        var deleteFC = _context.Flashcards.Where(e => e.Id == id).Single();
        _context.Flashcards.Remove(deleteFC);
        _context.SaveChanges();
        return deleteFC;
    }
    
}