import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('progress')
  async getProgress(
    @Req() req,
    @Query('exerciseId') exerciseId?: string,
    @Query('period') period?: string,
  ) {
    return this.analyticsService.getProgressAnalytics(
      req.user.id,
      exerciseId,
      period
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('personal-records')
  async getPersonalRecords(@Req() req) {
    return this.analyticsService.getPersonalRecords(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('workout-history')
  async getWorkoutHistory(
    @Req() req,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.analyticsService.getWorkoutHistory(
      req.user.id,
      limit ? parseInt(limit.toString()) : 10,
      offset ? parseInt(offset.toString()) : 0,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@Req() req) {
    return this.analyticsService.getUserStats(req.user.id);
  }
}