import { Controller, Get, Query } from '@nestjs/common';
import { AddBookUseCase } from './add-book.usecase';

@Controller()
export class AppController {
  constructor(private readonly addBookUseCase: AddBookUseCase) {}

  @Get()
  getHello(@Query() query?: { title: string }): string {
    return `
<!DOCTYPE html>
<html>
  <head>
    <title>Crafty Reads</title>
  </head>
  <body>
    <form>
    ${query?.title ? '<p>Book added</p>' : ''}
      <label for="title">Title</label>
      <input type="text" id="title" name="title">
      <button type="submit">Add book</button>
    </form>
  </body>
</html>`;
  }
}
