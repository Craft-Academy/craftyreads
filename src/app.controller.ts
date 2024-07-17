import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddBookUseCase } from './add-book.usecase';

@Controller()
export class AppController {
  constructor(private readonly addBookUseCase: AddBookUseCase) {}

  @Get()
  index(): string {
    return `
<!DOCTYPE html>
<html>
  <head>
    <title>Crafty Reads</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/htmx.org@2.0.1" integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/" crossorigin="anonymous"></script>
  </head>
  <body>
    <main class="container mx-auto px-4 py-8">
      <div id="add-book-form">
        <form action="/" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="post" hx-boost="true" hx-target="#add-book-form" hx-swap="outerHTML">
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
      </div>
    </main>
  </body>
</html>`;
  }

  @Post()
  async addBook(@Body() body: { title: string }) {
    try {
      await this.addBookUseCase.execute({ title: body.title });
      return `
        <div id="add-book-form">
          <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p class="text-sm">Book added</p>
              </div>
            </div>
          </div>
          <form action="/" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="post" hx-boost="true" hx-target="#add-book-form" hx-swap="outerHTML">
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
        </div>
      `;
    } catch (error) {
      return `
        <div id="add-book-form">
          <div role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Book not added
            </div>
          </div>
          <form action="/" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="post" hx-boost="true" hx-target="#add-book-form" hx-swap="outerHTML">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                Title
              </label>
              <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Enter book title" name="title" placeholder="Enter book title" required>
              <p class="text-red-500 text-xs italic mt-2">${(error as any).message}</p>
            </div>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Add Book
            </button>
          </form>
        </div>
      `;
    }
  }
}
