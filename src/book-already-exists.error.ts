export class BookAlreadyExistsError extends Error {
  constructor(bookTitle: string) {
    super(`The book ${bookTitle} already exists`);
  }
}
