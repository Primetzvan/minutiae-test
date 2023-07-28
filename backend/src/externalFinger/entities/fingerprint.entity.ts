import { Column, Entity, PrimaryColumn } from "typeorm";
import { Blob } from "buffer";


@Entity()
export class Fingerprint {
  @PrimaryColumn()
  id: number;

  @Column("blob")
  template: Blob;
}
