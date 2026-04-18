import express, { Router } from "express";

import * as userController from "./controllers/user.controller";
import * as itemController from "./controllers/item.controller";
import * as purchaseController from "./controllers/purchase.controller";
import * as statisticsController from "./controllers/statistics.controller";
import * as systembolagetController from "./controllers/systembolaget.controller";
import * as multipliersController from "./controllers/multipliers.controller";

const router: Router = express.Router();

router.get("/users/purchases", userController.getFeedPurchases);
router.get("/users/archived", userController.getArchivedUsers);
router.put("/users/:id/restore", userController.restoreUser);
router.delete("/users/:id/disable", userController.disableUser);
router.get("/users/:id?", userController.getUsers);
router.get("/users/:userId/purchases/:purchaseId?", userController.getUserPurchases);
router.post("/users", userController.createUser);
router.post("/users/:userId/purchases", userController.createPurchase);
router.post("/users/:userId/repayment", userController.createRepayment);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:userId/purchases/:purchaseId", userController.deleteUserPurchase);

router.get("/items/barcodes/:barcode", itemController.getBarcodeItem);
router.get("/items/popular", itemController.getPopularItems);
router.get("/items/archived", itemController.getArchivedItems);
router.get("/items/:id?", itemController.getItems);
router.post("/items", itemController.createItem);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);
router.put("/items/:id/restore", itemController.restoreItem);

router.get("/statistics/highscore", statisticsController.getMonthlyHighscore);

router.get("/systembolaget", systembolagetController.searchItem);
router.get("/systembolaget/image", systembolagetController.getImage);

router.get("/purchases", purchaseController.getPurchases);
router.get("/purchases/:id", purchaseController.getPurchase);


router.get("/settings/multipliers", multipliersController.getMultipliers);
router.put("/settings/multipliers", multipliersController.updateMultipliers);
router.post("/settings/multipliers/apply", multipliersController.applyMultipliers);

router.get("/health", (req, res) => {
  res.json({ status: "okeeey" });
});

export default router;