import { Purchase } from "@services/purchase/purchase";

export class User {
  id: string = null;
  email?: string = null;
  firstname: string = null;
  lastname: string = null;
  debt: number = null;
  lobare: number = null;
  admin: boolean = null;
  totalDebt: number = null;
  purchases?: Purchase[];
}
