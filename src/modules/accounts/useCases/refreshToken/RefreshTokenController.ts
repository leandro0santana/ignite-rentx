import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResfreshTokenUseCase } from "./RefreshTokenUseCase";

class ResfreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.body.token || request.headers["x-acess-token"] || request.query.token;

    const refreshTokenUseCase = container.resolve(ResfreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_token);
  }
}

export { ResfreshTokenController };
