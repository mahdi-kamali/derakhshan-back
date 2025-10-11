import { Router } from "express";
import { exec } from "child_process";

const webHooksRouter = Router();

// Projects configuration
const projects = [
  {
    name: "derakhshan-back",
    dir: "/home/dppackde/derakhshan-back",
    deployScript: "deploy",
  },
  {
    name: "derakhshan-front",
    dir: "/home/dppackde/derakhshan-front",
    deployScript: "deploy",
  },
  {
    name: "derakhshan-penel",
    dir: "/home/dppackde/derakhshan-penel",
    deployScript: "deploy",
  },
];

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
    // Deploy all projects sequentially
    for (const project of projects) {
      console.log(`\n📦 Running deploy for ${project.name}...`);
      const deployResult = await runCommand(
        `npm run ${project.deployScript}`,
        project.dir,
      );
      console.log(deployResult);
    }

    // After all deploys, do a single global PM2 restart
    console.log("\n🔄 Restarting all PM2 apps globally...");
    const pm2Result = await runCommand("pm2 restart all", "/home/dppackde");
    console.log(pm2Result);

    res
      .status(200)
      .send("✅ All projects deployed and PM2 restarted globally!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to deploy projects");
  }
});

export default webHooksRouter;
