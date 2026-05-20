import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import {
  type AuthUser,
  CurrentUser,
} from '../../auth/decorators/current-user.decorator';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dash: DashboardService) {}

  @Get('totals')
  @ApiOperation({ summary: 'Get total aggregates for user dashboard' })
  async getTotals(@CurrentUser() user: AuthUser) {
    return await this.dash.getTotals(user.userId);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get user analytics and top genres' })
  async getAnalytics(@CurrentUser() user: AuthUser) {
    return await this.dash.getAnalytics(user.userId);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent user activity timeline' })
  async getRecentActivity(@CurrentUser() user: AuthUser) {
    return await this.dash.getRecentActivity(user.userId);
  }
}
