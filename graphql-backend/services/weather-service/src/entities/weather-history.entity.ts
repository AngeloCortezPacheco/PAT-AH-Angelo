import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('weather_history')
export class WeatherHistory {
  @PrimaryGeneratedColumn('uuid')
  history_id: string;

  @Column('jsonb')
  location: {
    name: string;
    latitude: number;
    longitude: number;
    coordinates: [number, number];
  };

  @Column({ type: 'timestamp with time zone' })
  recorded_time: Date;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  temperature_celsius: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  humidity_percentage: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  precipitation_mm: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  wind_speed_kmh: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}