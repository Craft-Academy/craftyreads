import * as elements from 'typed-html';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddBookUseCase } from './add-book.usecase';
import { Layout } from './components/layout';
import { AddBookForm } from './components/add-book-form';

@Controller()
export class AppController {
  constructor(private readonly addBookUseCase: AddBookUseCase) {}

  @Get()
  index(): string {
    return (
      <Layout>
        <AddBookForm inputPlaceholder="Enter book title" />
      </Layout>
    );
  }

  @Post()
  async addBook(@Body() body: { title: string }) {
    try {
      await this.addBookUseCase.execute({ title: body.title });
      return (
        <AddBookForm
          inputPlaceholder="Enter book title"
          toast={{
            type: 'success',
            title: 'Book added',
            message: 'The book has been added to the list',
          }}
        />
      );
    } catch (error) {
      return (
        <AddBookForm
          inputPlaceholder="Enter book title"
          toast={{
            type: 'error',
            title: 'Book not added',
            message: (error as any).message,
          }}
        />
      );
    }
  }
}
