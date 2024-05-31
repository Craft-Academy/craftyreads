import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AddBookUseCase } from './add-book.usecase';
import { StubBookRepository } from './stub.book-repository';
import { BookRepository } from './book-repository.port';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: BookRepository,
      useValue: StubBookRepository,
    },
    AddBookUseCase,
  ],
})
export class AppModule {}
