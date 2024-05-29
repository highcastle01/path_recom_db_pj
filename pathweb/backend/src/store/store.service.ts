import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}

  async getAllStores(): Promise<StoreEntity[]> {
    return this.storeRepository.find();
  }

  // async getStoreOne(storeId: number): Promise<StoreEntity[]>{
  //   const store = await this.storeRepository.findOne({ where: { storeId } });
  //   if (!store) {
  //     throw new NotFoundException(`Store with id ${storeId} not found`);
  //   }
  //   return store;
  // }

  async create(storeData: Partial<StoreEntity>): Promise<StoreEntity> {
    const store = this.storeRepository.create(storeData);
    return this.storeRepository.save(store);
  }

  async getStoreById(id: number): Promise<StoreEntity> {
    return this.storeRepository.findOne({ where: { id } });
  }
//이미지 추가.
  async updateStoreImage(storeId: number, imageUrl: string): Promise<void> {
    await this.storeRepository.update(storeId, { imageUrl });
  }
  //가게 추가

  async findImageById(id: number): Promise<string> {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store.imageUrl;
  }

  async searchStores(criteria: any): Promise<StoreEntity[]> {
    const query = this.storeRepository.createQueryBuilder('store');

    if (criteria.people) {
      query.andWhere('store.seat / 2 >= :people', { people: criteria.people });
    }
    if (criteria.types && criteria.types.length) {
      query.andWhere('store.type IN (:...types)', { types: criteria.types });
    }

    if (criteria.locations && criteria.locations.length) {
      query.andWhere('store.location IN (:...locations)', { locations: criteria.locations });
    }

    if (criteria.timeRange) {
      query.andWhere('store.opentime <= :startTime AND store.closedtime >= :endTime', {
        startTime: criteria.timeRange.startTime,
        endTime: criteria.timeRange.endTime,
      });
    }

    if (criteria.priceRange) {
      query.andWhere('store.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: criteria.priceRange.min,
        maxPrice: criteria.priceRange.max,
      });
    }
    if (criteria.detailTypes && criteria.detailTypes.length) {
      query.andWhere('store.detailtype IN (:...detailTypes)', { detailTypes: criteria.detailTypes });
    }

    return query.getMany();
  }
}
