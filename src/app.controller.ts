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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/htmx.org@2.0.1"></script>
  </head>
  <body>
    <main class="container mx-auto px-4 py-8">
      ${query?.title ? '<p>Book added</p>' : ''}
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" name="title" placeholder="Enter book title" required>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Add Book
        </button>
      </form>
    </main>
  </body>
</html>`;
  }
}
