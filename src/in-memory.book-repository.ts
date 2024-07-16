import { BookRepository } from './book-repository.port';

export class InMemoryBookRepository implements BookRepository {
  booksByTitle = new Map<string, { title: string }>();

  lastSavedBook: { title: string } | undefined;

  async save(book: { title: string }): Promise<void> {
    this.lastSavedBook = book;
    this.booksByTitle.set(book.title, book);
  }

  async doesBookExist(title: string): Promise<boolean> {
    return this.booksByTitle.has(title);
  }
}
