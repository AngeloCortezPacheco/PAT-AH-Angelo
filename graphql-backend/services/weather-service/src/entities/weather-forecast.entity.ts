import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('weather_forecasts')
export class WeatherForecast {
  @PrimaryGeneratedColumn('uuid')
  forecast_id: string;

  @Column('jsonb')
  location: {
    name: string;
    latitude: number;
    longitude: number;
    coordinates: [number, number];
  };

  @Column({ type: 'timestamp with time zone' })
  forecast_time: Date;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  temperature_celsius: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  humidity_percentage: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  precipitation_prob: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  wind_speed_kmh: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  wind_direction: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}