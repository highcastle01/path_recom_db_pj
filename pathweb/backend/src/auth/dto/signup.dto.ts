import { UserRole } from '../../user/entities/user.entity';

export class SignupDto {
  username: string;
  password: string;
  name: string;
  email: string;
  role: UserRole;
}