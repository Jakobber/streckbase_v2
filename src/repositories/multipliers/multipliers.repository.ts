import { BaseRepository } from "./../base.repository";

export interface Multipliers {
  xlob: number;
  andra: number;
  najs: number;
}

export class MultipliersRepository extends BaseRepository {
  constructor() {
    super();
  }

  getMultipliers(): Promise<Multipliers> {
    return this.dbQuery("SELECT name, value FROM multipliers")
      .then((rows: any[]) => {
        const result: Multipliers = { xlob: 1.0, andra: 1.0, najs: 1.0 };
        rows.forEach((row: any) => { result[row.name] = parseFloat(row.value); });
        return result;
      });
  }

  updateMultipliers(multipliers: Multipliers): Promise<any> {
    return Promise.all([
      this.dbQuery("UPDATE multipliers SET value = ? WHERE name = 'xlob'", [multipliers.xlob]),
      this.dbQuery("UPDATE multipliers SET value = ? WHERE name = 'andra'", [multipliers.andra]),
      this.dbQuery("UPDATE multipliers SET value = ? WHERE name = 'najs'", [multipliers.najs])
    ]);
  }

  applyMultipliers(multipliers: Multipliers): Promise<any> {
    return this.dbQuery(
      `UPDATE Items SET
        price_xlob = ROUND(price * ?),
        price_andra = ROUND(price * ?),
        price_najs = ROUND(price * ?)
       WHERE enabled = 1`,
      [multipliers.xlob, multipliers.andra, multipliers.najs]
    );
  }
}
