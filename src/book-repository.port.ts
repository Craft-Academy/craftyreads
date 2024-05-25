export interface BookRepository {
  save(book: { title: string }): Promise<void>;
}
