import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ViewColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { Exclude } from "class-transformer";

@Entity()
export class Finger {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  externalId: string;

  @Column({ unique: true, nullable: true })
  sessionId: string;

  @Column({ nullable: true })
  sessionExpires: Date;

  @Column({ default: 'running' })
  status: FingerStatus;

  @OneToOne(() => User, (user) => user.finger, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userUuid' })
  user: User;
  @Exclude()
  @ViewColumn()
  userUuid: string;
}

Finger.prototype.toString = function fingerToString() {
  return `ExternalId: #${this.externalId}, Status: ${this.status}, User: { #${this.userUuid} }`;
};

export enum FingerStatus {
  RUNNING = 'running',
  OK = 'ok',
  FAILED = 'failed',
}
