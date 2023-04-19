import { AdminRepository } from 'src/domain/interface/AdminRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { AdminM } from 'src/domain/model/AdminM';

export class createUserByAdminUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly adminRepository: AdminRepository,
  ) {}
  async execute(user: AdminM): Promise<AdminM> {
    const the_user = new AdminM();
    the_user.email = user.email;
    the_user.roles = user.roles;
    const result = await this.adminRepository.createUserByAdmin(the_user);
    this.logger.log('', 'User have been inserted by admin');
    return result;
  }
}
