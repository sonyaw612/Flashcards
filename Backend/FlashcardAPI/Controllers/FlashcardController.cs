using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Services;
using Models;

namespace Controllers.FlashcardAPI;

[ApiController]
[Route("/api/[controller]")]
public class FlashcardController : ControllerBase {

    private readonly FCService _service;

    public FlashcardController(FCService service) {
        _service = service;
    }

    // get all fcs
    [HttpGet]
    public List<Flashcard> GetAllFC() {
        return _service.GetAllFCs();
    }

    // get fc by id
    [HttpGet]
    [Route("{id}")]
    public Flashcard GetFC(int id) {
        return _service.GetFC(id);
    }

    // create fc
    [HttpPost]
    public Flashcard CreateFC(Flashcard fc) {
        return _service.CreateFC(fc);
    }

    // edit fc
    [HttpPut]
    public Flashcard EditFC(Flashcard fc) {
        return _service.EditFC(fc);
    }

    // delete fc
    [HttpDelete("{id}")]
    public Flashcard DeleteFC(int id) {
        return _service.DeleteFC(id);
    }

}