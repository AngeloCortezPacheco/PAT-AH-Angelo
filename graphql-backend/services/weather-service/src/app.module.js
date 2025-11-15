import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { RiesgoClimaService } from './riesgo-clima.service';
import { WeatherForecast } from './entities/weather-forecast.entity';
import { WeatherHistory } from './entities/weather-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'agro_dev',
      entities: [WeatherForecast, WeatherHistory],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([WeatherForecast, WeatherHistory]),
    HttpModule,
    ClientsModule.register([
      {
        name: 'ALERT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ALERT_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.ALERT_SERVICE_PORT) || 3004,
        },
      },
    ]),
    PrometheusModule.register(),
  ],
  controllers: [WeatherController],
  providers: [WeatherService, RiesgoClimaService],
})
export class AppModule {}