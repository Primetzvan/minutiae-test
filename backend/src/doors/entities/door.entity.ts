import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Door {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  doorname: string;

  @Column({ unique: true })
  ip: string;

  @Column({ default: '#70a07c' })
  color: string;

  @ManyToMany(() => User, (user) => user.accesses, { onDelete: 'CASCADE' })
  accessors: User[];
}

Door.prototype.toString = function fingerToString() {
  return `{ #${this.uuid}, name: ${this.doorname}, ip: ${this.ip}  }`;
};
