import { MultipliersRepository, Multipliers } from "@repositories/multipliers/multipliers.repository";

export class MultipliersService {
  private multipliersRepository: MultipliersRepository;

  constructor() {
    this.multipliersRepository = new MultipliersRepository();
  }

  getMultipliers(): Promise<Multipliers> {
    return this.multipliersRepository.getMultipliers();
  }

  updateMultipliers(multipliers: Multipliers): Promise<Multipliers> {
    return this.multipliersRepository.updateMultipliers(multipliers)
      .then(() => this.multipliersRepository.getMultipliers());
  }

  applyMultipliers(multipliers: Multipliers): Promise<any> {
    return this.multipliersRepository.applyMultipliers(multipliers);
  }
}
