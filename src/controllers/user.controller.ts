import { UserService } from "@services/user/user.service";
import { User } from "@services/user/user";
import { Item } from "@services/item/item";

const userService = new UserService();

export const getUsers = (req, res) => {
  const id: string = req.params.id;

  if (id !== undefined) {
    userService.getUser(id)
      .then((user: User) => {
        if (!user) return res.sendStatus(404);
        res.json(user);
      });
  } else {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;

    userService.getUsers(limit, offset)
      .then((users: User[]) => res.json(users));
  }
}

export const getUserPurchases = (req, res) => {
  const userId: string = req.params.userId;
  const purchaseId: number = req.params.purchaseId;

  if (userId === undefined) return res.sendStatus(400);

  if (purchaseId) {
    userService.getUserPurchase(userId, purchaseId)
      .then((user: User) => {
        if (!user) return res.sendStatus(404);
        res.json(user);
      });
  } else {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;

    userService.getUserPurchases(req.params.userId, limit, offset)
      .then((userPurchase: User) => res.json(userPurchase));
  }
}

export const createUser = (req, res) => {
  if (!req.body) return res.sendStatus(400);

  userService.createUser(req.body)
    .then((user: User) => {
      res.status(201).json(user);
    }).catch(() => res.status(409).json({}));
}

export const updateUser = (req, res) => {
  if (!req.body) return res.sendStatus(400);

  userService.updateUser(req.body)
    .then((user: User) => {
      if (!user) return res.sendStatus(404);
      res.json(user);
    });
}

export const createPurchase = (req, res) => {
  const userId: string = req.params.userId;
  const { najs, ...itemData } = req.body;
  const item: Item = itemData;
  if (userId === undefined || !item) return res.sendStatus(400);

  userService.createPurchase(userId, item, !!najs)
    .then((userPurchase: User) => res.json(userPurchase));
}

export const getFeedPurchases = (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 20;

  userService.getFeedPurchases(limit, offset)
    .then((feedPurchases: User[]) => res.json(feedPurchases));
}

export const getArchivedUsers = (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 1000;
  userService.getArchivedUsers(limit, offset)
    .then((users: User[]) => res.json(users));
}

export const disableUser = (req, res) => {
  const id: string = req.params.id;
  userService.disableUser(id)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(500));
}

export const restoreUser = (req, res) => {
  const id: string = req.params.id;
  userService.restoreUser(id)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(500));
}

export const createRepayment = (req, res) => {
  const userId: string = req.params.userId;
  const amount: number = parseInt(req.body.amount, 10);
  if (!userId || !amount || amount <= 0) return res.sendStatus(400);

  userService.createRepayment(userId, amount)
    .then(() => res.status(201).json({}))
    .catch(() => res.status(500).json({}));
}

export const deleteUserPurchase = (req, res) => {
  const userId: string = req.params.userId;
  const purchaseId: number = req.params.purchaseId;

  userService.deleteUserPurchase(userId, purchaseId)
    .then(() => res.status(202).json({}))
    .catch(() => res.status(410).json({}));
}