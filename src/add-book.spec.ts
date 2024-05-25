import { AddBookUseCase } from './add-book.usecase';
import { StubBookRepository } from './stub.book-repository';

describe('Feature: Adding a book', () => {
  test('Example: User can add a book', async () => {
    const bookRepository = new StubBookRepository();

    const addBook = new AddBookUseCase(bookRepository);

    await addBook.execute({ title: 'Clean Code' });

    expect(bookRepository.lastSavedBook).toEqual({
      title: 'Clean Code',
    });
  });
});
