import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  users_tokens: UserTokens[] = [];

  async create({ user_id, expires_date, refresh_token, }: ICreateUserTokenDTO): Promise<UserTokens> {
    const user_token = new UserTokens();

    Object.assign(user_token, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.users_tokens.push(user_token);

    return user_token;
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.users_tokens.find(
      (user_token) => user_token.user_id === user_id && user_token.refresh_token === refresh_token
    );
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.users_tokens.find(
      (user_token) => user_token.refresh_token === refresh_token
    );
  }
  async deteleById(id: string): Promise<void> {
    const user_token = this.users_tokens.find(
      (user_token) => user_token.id === id
    );

    this.users_tokens.splice(
      this.users_tokens.indexOf(user_token)
    );
  }

}

export { UsersTokensRepositoryInMemory }