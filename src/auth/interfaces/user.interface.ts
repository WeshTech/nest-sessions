import { BusinessType, UserRole } from 'src/users/schemas/registration.schema';

export interface userInterface {
  email: string;
  role: UserRole;
  business: BusinessType;
  isVerified: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
