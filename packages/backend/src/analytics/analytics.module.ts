import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { PersonalRecord, Workout, User as UserEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalRecord, Workout, UserEntity])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}