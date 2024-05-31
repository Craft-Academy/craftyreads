export abstract class BookRepository {
  abstract save(book: { title: string }): Promise<void>;
}
