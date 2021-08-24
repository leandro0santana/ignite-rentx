import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const user_token = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(user_token);

    return user_token;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const user_token = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return user_token;
  }

  async deteleById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
   const user_token = await this.repository.findOne({
     refresh_token,
   });

   return user_token;
  }
}

export { UsersTokensRepository };
