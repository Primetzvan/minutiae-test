import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GateLog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: new Date().toLocaleString() })
  created: string;

  //  {#1, haustür, 120.0.0.1}
  @Column()
  door: string;

  //  {#1, hannes123, hannes, huber, 0667 99021131,...}
  @Column()
  entrant: string;

  @Column()
  event: LogStatus;

  // has no button rights
  @Column({ nullable: true })
  failReason: string;
}

export enum LogStatus {
  FAILED = 'failed',
  OPEN = 'open',
  CLOSE = 'close',
}
