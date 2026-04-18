import { MultipliersService } from "@services/multipliers/multipliers.service";
import { Multipliers } from "@repositories/multipliers/multipliers.repository";

const multipliersService = new MultipliersService();

export const getMultipliers = (req, res) => {
  multipliersService.getMultipliers()
    .then((multipliers: Multipliers) => res.json(multipliers));
}

export const updateMultipliers = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  multipliersService.updateMultipliers(req.body)
    .then((multipliers: Multipliers) => res.json(multipliers));
}

export const applyMultipliers = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  multipliersService.applyMultipliers(req.body)
    .then(() => res.sendStatus(204));
}
