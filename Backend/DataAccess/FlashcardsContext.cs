using Microsoft.EntityFrameworkCore;
using System;
using Models;
using System.Collections.Generic;

namespace DataAccess;

public class FlashcardDbContext : DbContext
{
    public DbSet<Flashcard> Flashcards { get; set; }

    public FlashcardDbContext(DbContextOptions<FlashcardDbContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Flashcard>(entity => {
            entity.HasKey(e => e.Id);
            // entity.HasProperty(e => e.Id)
            //     .HasColumnName("id");
            // entity.HasProperty(e => e.Question)
            //     .HasColumnType("nvarchar")
            //     .HasColumnName("question");
            // entity.HasProperty(e => e.Answer)
            //     .HasColumnType("nvarchar")
            //     .HasColumnName("answer");
            // entity.ToTable("flashcards");
        });
    }
}