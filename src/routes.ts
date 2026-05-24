import express, { Router } from "express";

import * as userController from "./controllers/user.controller";
import * as itemController from "./controllers/item.controller";
import * as purchaseController from "./controllers/purchase.controller";
import * as statisticsController from "./controllers/statistics.controller";
import * as systembolagetController from "./controllers/systembolaget.controller";
import * as multipliersController from "./controllers/multipliers.controller";
import * as authController from "./controllers/auth.controller";
import { requireAuth } from "./middleware/auth.middleware";

const router: Router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/set-password", requireAuth, authController.setPassword);

router.get("/users/purchases", userController.getFeedPurchases);
router.get("/users/archived", userController.getArchivedUsers);
router.put("/users/:id/restore", requireAuth, userController.restoreUser);
router.delete("/users/:id/disable", requireAuth, userController.disableUser);
router.get("/users/:id?", userController.getUsers);
router.get("/users/:userId/purchases/:purchaseId?", userController.getUserPurchases);
router.post("/users", requireAuth, userController.createUser);
router.post("/users/:userId/purchases", userController.createPurchase);
router.post("/users/:userId/repayment", requireAuth, userController.createRepayment);
router.post("/users/:userId/charge", requireAuth, userController.createCharge);
router.put("/users/:id", requireAuth, userController.updateUser);
router.delete("/users/:userId/purchases/:purchaseId", requireAuth, userController.deleteUserPurchase);

router.get("/items/barcodes/:barcode", itemController.getBarcodeItem);
router.get("/items/popular", itemController.getPopularItems);
router.get("/items/archived", itemController.getArchivedItems);
router.get("/items/:id?", itemController.getItems);
router.post("/items", requireAuth, itemController.createItem);
router.put("/items/:id", requireAuth, itemController.updateItem);
router.delete("/items/:id", requireAuth, itemController.deleteItem);
router.put("/items/:id/restore", requireAuth, itemController.restoreItem);

router.get("/statistics/highscore", statisticsController.getMonthlyHighscore);

router.get("/systembolaget", systembolagetController.searchItem);
router.get("/systembolaget/image", systembolagetController.getImage);

router.get("/purchases", purchaseController.getPurchases);
router.get("/purchases/:id", purchaseController.getPurchase);

router.get("/settings/multipliers", multipliersController.getMultipliers);
router.put("/settings/multipliers", requireAuth, multipliersController.updateMultipliers);
router.post("/settings/multipliers/apply", requireAuth, multipliersController.applyMultipliers);

router.get("/health", (req, res) => {
  res.json({ status: "okeeey" });
});

export default router;