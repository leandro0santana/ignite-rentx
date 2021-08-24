import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UpaloadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,

    @inject("CarsRepository")
    private carRepository: ICarsRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const car = await this.carRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car does not exists!");
    }

    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create({
        car_id,
        image_name,
      });
      await this.storageProvider.save(image_name, "cars");
    });
  }
}

export { UpaloadCarImagesUseCase };
