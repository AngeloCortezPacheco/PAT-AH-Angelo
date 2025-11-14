import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { UserAlert } from './user-alert.entity';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  alert_id: string;

  @Column({ type: 'varchar', length: 50 })
  alert_type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  severity_level: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  issued_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  effective_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expires_at: Date;

  @Column({ type: 'jsonb', nullable: true })
  affected_region: {
    type: string;
    coordinates: number[] | number[][];
    properties?: Record<string, any>;
  };

  @OneToMany(() => UserAlert, userAlert => userAlert.alert)
  user_alerts: UserAlert[];
}
