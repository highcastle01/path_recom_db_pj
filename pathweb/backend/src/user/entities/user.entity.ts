import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RatingEntity } from '../../rating/entities/rating.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => RatingEntity, ratingEntity => ratingEntity.user)
  ratings: RatingEntity[];
}
