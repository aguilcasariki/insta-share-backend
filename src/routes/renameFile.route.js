import { Router } from "express";
import renameFile from "../services/renameFile.service.js";

const renameRouter = Router();

renameRouter.post(
  "/rename/:userId",

  (req, res) => {
    console.log(req.body);
    try {
      const { oldName, newName } = req.body;
      const renameRes = renameFile(req.params.userId, oldName, newName, false);
      res.status(200).json({ renameRes });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default renameRouter;
