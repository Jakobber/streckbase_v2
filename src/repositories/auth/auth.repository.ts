import { BaseRepository } from "../base.repository";

interface AdminUser {
  user_id: string;
  firstname: string;
  password: string | null;
}

export class AuthRepository extends BaseRepository {
  constructor() {
    super();
  }

  getAdminUsers(): Promise<AdminUser[]> {
    return this.dbQuery(
      "SELECT user_id, firstname, password FROM Users WHERE admin = 1 AND enabled = 1"
    );
  }

  setPassword(userId: string, hashedPassword: string): Promise<any> {
    return this.dbQuery(
      "UPDATE Users SET password = ? WHERE user_id = ? AND admin = 1",
      [hashedPassword, userId]
    );
  }
}
