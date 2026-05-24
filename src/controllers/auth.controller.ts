import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AuthRepository } from "@repositories/auth/auth.repository";

const repo = new AuthRepository();

export const login = async (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  try {
    const admins = await repo.getAdminUsers();
    for (const admin of admins) {
      if (!admin.password) continue;
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign(
          { userId: admin.user_id, firstname: admin.firstname },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        return res.json({ token });
      }
    }
    return res.status(401).json({ error: "Invalid password" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const setPassword = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ error: "userId and password required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  try {
    const hash = await bcrypt.hash(password, 12);
    const result = await repo.setPassword(userId, hash);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admin user not found" });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
