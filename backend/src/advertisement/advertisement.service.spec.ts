import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisementService } from './advertisement.service';
import { getModelToken } from '@nestjs/mongoose';
import { Advertisement } from './entities/advertisement.entity';
import axios from 'axios';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AdvertisementService', () => {
  let service: AdvertisementService;
  let advertisementModel: any;

  beforeEach(async () => {
    advertisementModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdvertisementService,
        {
          provide: getModelToken(Advertisement.name),
          useValue: advertisementModel,
        },
      ],
    }).compile();

    service = module.get<AdvertisementService>(AdvertisementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStats', () => {
    const createAdvertisementDto = {
      advert: 19447497,
      date: '2024-10-10',
    };

    it('should return an existing advertisement if found', async () => {
      const existingAdvertisement = { advert: 19447497, date: '2024-10-10' };
      advertisementModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingAdvertisement),
      });

      const result = await service.getStats(createAdvertisementDto);
      expect(result).toEqual(existingAdvertisement);
      expect(advertisementModel.findOne).toHaveBeenCalledWith(
        createAdvertisementDto,
      );
    });

    it('should create and return a new advertisement if not found', async () => {
      advertisementModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const apiResponse = {
        data: [
          {
            clicks: 100,
            cpc: 0.5,
            ctr: 2,
            days: [
              {
                apps: [
                  { nm: [{ nmId: '1111' }], clicks: 50, cpc: 0.25, ctr: 1.5 },
                ],
              },
            ],
          },
        ],
      };

      mockedAxios.post.mockResolvedValue(apiResponse);

      const newAdvertisement = {
        advert: 19447497,
        date: '2024-10-10',
        save: jest.fn(),
      };
      advertisementModel.save.mockResolvedValue(newAdvertisement);

      const result = await service.getStats(createAdvertisementDto);
      expect(result).toEqual(newAdvertisement);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://app.marketspace.ru/testing-api/adv/v2/fullstats',
        [
          {
            id: createAdvertisementDto.advert,
            dates: [createAdvertisementDto.date],
          },
        ],
      );
    });

    it('should throw an HttpException if axios request fails', async () => {
      mockedAxios.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: 'Invalid request' },
        },
      });

      await expect(service.getStats(createAdvertisementDto)).rejects.toThrow(
        HttpException,
      );
      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });
});
