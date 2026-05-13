import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dash: DashboardService) {}

  @Get('totals')
  async getTotals() {
    return await this.dash.getTotals();
  }

  // @Get('analytics')
  // async getAnalytics() {
  //   return await this.dash.getAnalytics();
  // }

  @Get('recent')
  async getRecentActivity() {
    return await this.dash.getRecentActivity();
  }
}
