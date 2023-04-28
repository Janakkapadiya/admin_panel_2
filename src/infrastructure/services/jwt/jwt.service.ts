import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IJwtService,
  IJwtServicePayload,
} from 'src/domain/adepters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    console.log(decode);
    return decode;
  }

  createToken(payload: IJwtServicePayload, secret: string): string {
    return this.jwtService.sign(payload, {
      secret: secret,
    });
  }
}
