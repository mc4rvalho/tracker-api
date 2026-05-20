import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dash: DashboardService) {}

  @Get('totals')
  @ApiOperation({ summary: 'Get total aggregates for user dashboard' })
  async getTotals() {
    return await this.dash.getTotals();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get user analytics and top genres' })
  async getAnalytics() {
    return await this.dash.getAnalytics();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent user activity timeline' })
  async getRecentActivity() {
    return await this.dash.getRecentActivity();
  }
}
