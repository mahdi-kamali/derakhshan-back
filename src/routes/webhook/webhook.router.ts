import { Router } from "express";
import { exec } from "child_process";

const webHooksRouter = Router();

// Helper to run shell commands
const runCommand = (cmd: string, cwd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd }, (err, stdout, stderr) => {
      if (err) reject(stderr);
      else resolve(stdout);
    });
  });
};

webHooksRouter.post("/", async (req, res) => {
  console.log("Webhook received:", req.body?.repository?.full_name || "");

  try {
    await runCommand("pm2 restart all", "/home/dppackde");
    res
      .status(200)
      .send("✅ All projects deployed and PM2 restarted globally!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to deploy projects");
  }
});

export default webHooksRouter;
