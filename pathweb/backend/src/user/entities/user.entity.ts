import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RatingEntity } from '../../rating/entities/rating.entity';

export enum UserRole {
  ADMIN = 'admin',
  STORE_OWNER = 'store_owner',
  CUSTOMER = 'customer',
}

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @OneToMany(() => RatingEntity, ratingEntity => ratingEntity.user)
  ratings: RatingEntity[];
}
