import { Injectable } from '@nestjs/common';
import { BookRepository } from './book-repository.port';
import { BookAlreadyExistsError } from './book-already-exists.error';

@Injectable()
export class AddBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(book: { title: string }) {
    if (await this.bookRepository.doesBookExist(book.title)) {
      throw new BookAlreadyExistsError(book.title);
    }
    return this.bookRepository.save(book);
  }
}
