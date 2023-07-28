import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConfigLog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: new Date().toLocaleString() })
  date: string;

  //  {#1, haustür, 120.0.0.1}
  @Column({ nullable: true })
  modifiedOnDoor: string;

  //  {#1, hannes123, hannes, huber, 0667 99021131,...}
  @Column({ nullable: true })
  modifier: string;

  //DELETE
  @Column()
  action: string;

  //USER
  @Column()
  modifiedTable: string;

  //  {#1, hannes123, hannes, huber, 0667 99021131,...}
  @Column({ nullable: true })
  oldValue: string;

  @Column({ nullable: true })
  newValue: string;
}
