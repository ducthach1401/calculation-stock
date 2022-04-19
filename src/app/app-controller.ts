import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app-service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async Show(@Res() res: Response) {
    res
      .status(HttpStatus.OK)
      .sendFile(join(__dirname, '..', 'public', 'html', 'home.html'));
  }
}
