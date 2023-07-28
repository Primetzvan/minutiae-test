import { Controller, Get, Param } from "@nestjs/common";
import { LogsService } from "./logs.service";

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('config')
  async getAllConfigLogs() {
    return this.logsService.findAllConfig();
  }

  @Get('gate')
  async getAllGateLogs() {
    return this.logsService.findAllGate();
  }
}