namespace fcTests;

public class UnitTest1
{

    List<Flashcard> flashcards = new List<Flashcard>{
        new Flashcard { Id = 1, Question = "Question 1", Answer = "Answer 1" },
        new Flashcard { Id = 2, Question = "Question 2", Answer = "Answer 2" },
        new Flashcard { Id = 3, Question = "Question 3", Answer = "Answer 3" }
    };

    [Fact]
    public void Test1()
    {
        Assert.Equal(true, true);
    }

    [Fact]
    public void GetAllFCs_ReturnsAllFlashcards()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<FlashcardDbContext>()
            .UseInMemoryDatabase(databaseName: "GetAllFCs")
            .Options;
        var dbContext = new FlashcardDbContext(options);
        var fcService = new FCService(dbContext);

        dbContext.Flashcards.AddRange(flashcards);
        dbContext.SaveChanges();

        // Act
        var result = fcService.GetAllFCs();

        // Assert
        Assert.Equal(flashcards.Count, result.Count);
        Assert.Equal(flashcards.Select(fc => fc.Id), result.Select(fc => fc.Id));
        Assert.Equal(flashcards.Select(fc => fc.Question), result.Select(fc => fc.Question));
        Assert.Equal(flashcards.Select(fc => fc.Answer), result.Select(fc => fc.Answer));
    }

    [Fact]
    public void GetFC_ReturnsSingleFCById()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<FlashcardDbContext>()
            .UseInMemoryDatabase(databaseName: "GetFC_DB")
            .Options;
        var dbContext = new FlashcardDbContext(options);
        var fcService = new FCService(dbContext);

        dbContext.Flashcards.AddRange(flashcards);
        dbContext.SaveChanges();

        var expectedFlashcard = flashcards[1];

        // Act
        var result = fcService.GetFC(expectedFlashcard.Id);

        // Assert
        Assert.NotNull(result);
        Assert.IsType<Flashcard>(result);
        Assert.Equal(expectedFlashcard.Id, result.Id);
        Assert.Equal(expectedFlashcard.Question, result.Question);
        Assert.Equal(expectedFlashcard.Answer, result.Answer);
    }

    [Fact]
    public void CreateFC_ReturnsCreatedFlashcard()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<FlashcardDbContext>()
            .UseInMemoryDatabase(databaseName: "CreateFC_DB")
            .Options;

        using (var context = new FlashcardDbContext(options))
        {
            var service = new FCService(context);
            var fc = new Flashcard
            {
                // Set up properties for the new flashcard
                Question = "What is the capital of France?",
                Answer = "Paris"
            };

            // Act
            var result = service.CreateFC(fc);

            // Assert
            Assert.NotNull(result);
            Assert.NotEqual(0, result.Id);
            Assert.Equal("What is the capital of France?", result.Question);
            Assert.Equal("Paris", result.Answer);
        }
    }

    [Fact]
    public void EditFC_ReturnsEditedFlashcard()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<FlashcardDbContext>()
            .UseInMemoryDatabase(databaseName: "EditFC_DB")
            .Options;

        using (var context = new FlashcardDbContext(options))
        {
            var service = new FCService(context);
            var fc = new Flashcard
            {
                // Set up properties for the new flashcard
                Question = "What is the capital of France?",
                Answer = "Paris"
            };

            service.CreateFC(fc);

            // Modify the flashcard
            fc.Answer = "Madrid";

            // Act
            var result = service.EditFC(fc);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("What is the capital of France?", result.Question);
            Assert.Equal("Madrid", result.Answer);
        }

    }

    [Fact]
    public void DeleteFC_ReturnsDeletedFlashcard()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<FlashcardDbContext>()
            .UseInMemoryDatabase(databaseName: "DeleteFC_ReturnsDeletedFlashcard")
            .Options;
        using (var context = new FlashcardDbContext(options))
        {
            var fcService = new FCService(context);
            var fc = new Flashcard { Id = 1, Question = "Question 1", Answer = "Answer 1" };
            fcService.CreateFC(fc);
        }

        using (var context = new FlashcardDbContext(options))
        {
            var fcService = new FCService(context);

            // Act
            var deletedFc = fcService.DeleteFC(1);

            // Assert
            Assert.NotNull(deletedFc);
            Assert.Equal("Question 1", deletedFc.Question);
            Assert.Equal("Answer 1", deletedFc.Answer);
            Assert.Equal(1, deletedFc.Id);
            Assert.Empty(context.Flashcards);
        }
    }
}