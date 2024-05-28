import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RatingEntity } from '../../rating/entities/rating.entity';

@Entity()
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  detailtype: string;

  @Column()
  location: string;

  @Column()
  seat: string;

  @Column()
  price: string;

  @Column()
  opentime: number;

  @Column()
  closedtime: number;

  @OneToMany(() => RatingEntity, ratingEntity => ratingEntity.store)
  ratings: RatingEntity[];

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;
}
