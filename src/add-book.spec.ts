describe('Feature: Adding a book', () => {
  test('Example: User can add a book', async () => {
    class BookRepository {
      lastSavedBook: { title: string } | undefined;
    }

    const bookRepository = new BookRepository();

    class AddBookUseCase {
      async execute(book: { title: string }) {
        bookRepository.lastSavedBook = book;
      }
    }

    const addBook = new AddBookUseCase();

    await addBook.execute({ title: 'Clean Code' });

    expect(bookRepository.lastSavedBook).toEqual({
      title: 'Clean Code',
    });
  });
});
