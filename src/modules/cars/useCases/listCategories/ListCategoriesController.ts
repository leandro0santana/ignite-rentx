import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategorieUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategorieUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
