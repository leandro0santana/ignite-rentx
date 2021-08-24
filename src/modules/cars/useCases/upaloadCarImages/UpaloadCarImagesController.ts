import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpaloadCarImagesUseCase } from "./UpaloadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UpaloadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images = request.files as IFiles[];

    const upaloadCarImagesUseCase = container.resolve(UpaloadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await upaloadCarImagesUseCase.execute({ car_id, images_name });

    return response.status(201).send();
  }
}

export { UpaloadCarImagesController };
