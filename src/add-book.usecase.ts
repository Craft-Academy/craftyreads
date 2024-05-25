import { BookRepository } from './book-repository.port';

export class AddBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  execute(book: { title: string }) {
    return this.bookRepository.save(book);
  }
}
