public class Secrets {
    private static string _connectionString = "Server=tcp:staging-sw.database.windows.net,1433;Initial Catalog=Flashcards;Persist Security Info=False;User ID=sw-flashcard-staging;Password=SW-F1@5hCarD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

    public static string GetConnectionString() { return _connectionString; }
}