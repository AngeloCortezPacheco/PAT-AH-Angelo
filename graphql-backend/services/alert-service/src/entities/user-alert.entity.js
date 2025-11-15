import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Alert } from './alert.entity';

@Entity('user_alerts')
export class UserAlert {
  @PrimaryGeneratedColumn('uuid')
  user_alert_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  alert_id: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  received_at: Date;

  @ManyToOne(() => Alert, alert => alert.user_alerts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alert_id' })
  alert: Alert;
}