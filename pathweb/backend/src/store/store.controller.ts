import { Controller, Post, Get, Query, Param, Body, UploadedFile, UseInterceptors, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StoreService } from './store.service';
import { StoreEntity } from './entities/store.entity';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';

import { extname, join } from 'path';

@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly configService: ConfigService,
  ) {}

  @Get('all')
  async getAllStores(): Promise<StoreEntity[]> {
    return this.storeService.getAllStores();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() storeData: Partial<StoreEntity>
  ): Promise<{ url: string }> {
    const imageUrl = `/uploads/${file.filename}`;
    const newStoreData = { ...storeData, imageUrl };
    console.log(newStoreData); // 요청 본문을 로깅하여 Postman에서 데이터가 올바르게 전달되었는지 확인
    await this.storeService.create(newStoreData);
    return { url: `http://localhost:3000${imageUrl}` };
  }

  @Post('upload/:storeId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async updateFile(
    @Param('storeId') storeId: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ imageUrl: string }> {
    const imageUrl = `/uploads/${file.filename}`;
    await this.storeService.updateStoreImage(storeId, imageUrl);
    return { imageUrl: `${this.configService.get<string>('BASE_URL')}${imageUrl}` };
  }

  @Get('image/:id')
  async findImageById(@Param('id') id: number): Promise<{ imageUrl: string }> {
    const imageUrl = await this.storeService.findImageById(id);
    if (!imageUrl) {
      throw new NotFoundException('Image not found');
    }
    return { imageUrl };
  }

  @Get('search')
  async searchStores(
    @Query('people') peopleStr: string,
    @Query('type1') type1: string,
    @Query('type2') type2: string,
    @Query('type3') type3: string,
    @Query('location1') location1: string,
    @Query('location2') location2: string,
    @Query('location3') location3: string,
    @Query('location4') location4: string,
    @Query('startTime') startTimeStr: string,
    @Query('endTime') endTimeStr: string,
    @Query('price') priceStr: string,
    @Query('detailType1') detailType1: string = '',
    @Query('detailType2') detailType2: string = '',
    @Query('detailType3') detailType3: string = '',
  ): Promise<StoreEntity[]> {
    const people = parseInt(peopleStr, 10);
    const startTime = parseInt(startTimeStr, 10);
    const endTime = parseInt(endTimeStr, 10);
    const price = parseInt(priceStr, 10);

    const detailTypes = [detailType1, detailType2, detailType3].filter(Boolean);

    const searchCriteria: any = {};

    if (!isNaN(people)) searchCriteria.people = people;
    if (!isNaN(startTime) && !isNaN(endTime)) {
      searchCriteria.timeRange = { startTime, endTime };
    }
    if (!isNaN(price)) {
      searchCriteria.price = price;
    }
    if (detailTypes.length) searchCriteria.detailTypes = detailTypes;

    searchCriteria.types = [type1, type2, type3].filter(Boolean);
    searchCriteria.locations = [location1, location2, location3, location4].filter(Boolean);

    const stores = await this.storeService.searchStores(searchCriteria);

    console.log(stores);

    return stores
      .filter(store => store.price <= searchCriteria.price) // 쿼리스트링으로 넘어온 price 값보다 작은 store만 포함
      .map(store => ({
        ...store,
        imageUrl: store.imageUrl ? `${process.env.BASE_URL}${store.imageUrl}` : null
      }));
  }
}
