import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

describe('AdvertisementController', () => {
  let controller: AdvertisementController;
  let advertisementService: AdvertisementService;

  beforeEach(async () => {
    const mockAdvertisementService = {
      getStats: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertisementController],
      providers: [
        {
          provide: AdvertisementService,
          useValue: mockAdvertisementService,
        },
      ],
    }).compile();

    controller = module.get<AdvertisementController>(AdvertisementController);
    advertisementService =
      module.get<AdvertisementService>(AdvertisementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStats', () => {
    it('should call advertisementService.getStats with the correct DTO', async () => {
      const createAdvertisementDto: CreateAdvertisementDto = {
        advert: 19447497,
        date: '2024-10-10',
      };
      const result = { advert: 19447497, date: '2024-10-10' };

      advertisementService.getStats = jest.fn().mockResolvedValue(result);

      expect(await controller.getStats(createAdvertisementDto)).toBe(result);
      expect(advertisementService.getStats).toHaveBeenCalledWith(
        createAdvertisementDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of advertisements', async () => {
      const result = [{ advert: 19447497, date: '2024-10-10' }];

      advertisementService.findAll = jest.fn().mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(advertisementService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single advertisement', async () => {
      const id = '1';
      const result = { advert: 19447497, date: '2024-10-10' };

      advertisementService.findOne = jest.fn().mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(advertisementService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update and return the advertisement', async () => {
      const id = '1';
      const updateAdvertisementDto: UpdateAdvertisementDto = {
        advert: 19447497,
        date: '2024-10-10',
      };
      const result = { advert: 19447497, date: '2024-10-10' };

      advertisementService.update = jest.fn().mockResolvedValue(result);

      expect(await controller.update(id, updateAdvertisementDto)).toBe(result);
      expect(advertisementService.update).toHaveBeenCalledWith(
        id,
        updateAdvertisementDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove and return the deleted advertisement', async () => {
      const id = '1';
      const result = { advert: 19447497, date: '2024-10-10' };

      advertisementService.remove = jest.fn().mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
      expect(advertisementService.remove).toHaveBeenCalledWith(id);
    });
  });
});
