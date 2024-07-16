import { AddBookUseCase } from './add-book.usecase';
import { BookAlreadyExistsError } from './book-already-exists.error';
import { InMemoryBookRepository } from './in-memory.book-repository';

describe('Feature: Adding a book', () => {
  test('Example: User can add a book', async () => {
    const bookRepository = new InMemoryBookRepository();

    const addBook = new AddBookUseCase(bookRepository);

    await addBook.execute({ title: 'Clean Code' });

    expect(bookRepository.lastSavedBook).toEqual({
      title: 'Clean Code',
    });
  });

  test('Example: User cannot add a book that already exists', async () => {
    const bookRepository = new InMemoryBookRepository();
    bookRepository.booksByTitle.set('Clean Code', { title: 'Clean Code' });
    const addBook = new AddBookUseCase(bookRepository);

    const addingBook = addBook.execute({ title: 'Clean Code' });

    await expect(addingBook).rejects.toThrow(
      new BookAlreadyExistsError('Clean Code'),
    );
  });
});
