import { Router } from "express";
const webHooksRouter = Router();

webHooksRouter.post("/", (req, res) => {
  console.log("Webhook received:", req.body?.repository?.full_name || "");

  return res.status(200);
});

export default webHooksRouter;
