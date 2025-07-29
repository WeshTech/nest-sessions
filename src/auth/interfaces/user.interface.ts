import { BusinessType, UserRole } from 'src/schemas/user.schema';

export interface userInterface {
  email: string;
  role: UserRole;
  business: BusinessType;
  isVerified: boolean;
  activeSessionId: string | null;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
