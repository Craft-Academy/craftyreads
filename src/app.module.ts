import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AddBookUseCase } from './add-book.usecase';
import { InMemoryBookRepository } from './in-memory.book-repository';
import { BookRepository } from './book-repository.port';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: BookRepository,
      useValue: InMemoryBookRepository,
    },
    AddBookUseCase,
  ],
})
export class AppModule {}
