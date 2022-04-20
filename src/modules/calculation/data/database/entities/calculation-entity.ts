import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock')
export class CalculationEntity {
  @ObjectIdColumn({ generated: true })
  _id: ObjectID;

  @Column()
  code: string;

  @Column()
  eps: number;

  @Column()
  price_rating_1: number;

  @Column()
  price_rating_2: number;

  @Column()
  safe_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('stockEPS')
export class StockEpsEntity {
  @ObjectIdColumn({ generated: true })
  _id: ObjectID;

  @Column()
  name: string

  @Column()
  data: any
}