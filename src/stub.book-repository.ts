import { BookRepository } from './book-repository.port';

export class StubBookRepository implements BookRepository {
  lastSavedBook: { title: string } | undefined;

  async save(book: { title: string }): Promise<void> {
    this.lastSavedBook = book;
  }
}
