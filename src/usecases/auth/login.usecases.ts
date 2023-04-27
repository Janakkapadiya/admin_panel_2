import { IBcryptService } from 'src/domain/adepters/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from 'src/domain/adepters/jwt.interface';
import { JWTConfig } from 'src/domain/config/jwt.interface';
import { UserRepository } from 'src/domain/interface/UserRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async getCookieWithJwtToken(email: string) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${email} have been logged.`,
    );
    const payload: IJwtServicePayload = { email: email };
    const secret = this.jwtConfig.getJwtSecret();
    const token = this.jwtTokenService.createToken(payload, secret);
    return `Authentication=${token}; HttpOnly; Path=/}`;
  }

  async validateUserForLocalStragtegy(email: string, pass: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserForJWTStragtegy(email: string) {
    const user = await this.userRepository.findByEmail(email);
    console.log(user);
    if (!user) {
      return null;
    }
    return user;
  }
}
