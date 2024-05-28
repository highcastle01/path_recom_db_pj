import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany , ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { StoreEntity } from '../../store/entities/store.entity';

@Entity()
@Unique(['user', 'store']) // 사용자와 상점의 조합이 유일함을 보장

export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => UserEntity, user => user.ratings)
  user: UserEntity;

  @ManyToOne(() => StoreEntity, store => store.ratings)
  store: StoreEntity;
}