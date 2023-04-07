import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LogInWithCredentialsGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // check the email and the password
      await super.canActivate(context);
      // initialize the session
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
      return true;
    } catch (err) {
      throw new HttpException(
        'Unauthorized request, input could have been missmatched',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
