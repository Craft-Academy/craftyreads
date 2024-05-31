import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `
<!DOCTYPE html>
<html>
  <head>
    <title>Crafty Reads</title>
  </head>
  <body>
    <form>
      <label for="title">Title</label>
      <input type="text" id="title" name="title">
      <button type="submit">Add book</button>
    </form>
  </body>
</html>`;
  }
}
