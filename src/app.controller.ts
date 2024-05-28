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
      <title>Page Title</title>
  </head>
  <body>
      <p>Hello, World!</p>
</body>
</html>`;
  }
}
