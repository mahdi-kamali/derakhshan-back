import { Router } from "express";
import { exec } from "child_process";

const webHooksRouter = Router();

// Projects configuration
const projects = [
  { name: "derakhshan-back", dir: "/home/dppackde/derakhshan-back", buildScript: "build", startScript: "start" },
  { name: "derakhshan-front", dir: "/home/dppackde/derakhshan-front", buildScript: "build", startScript: "start" },
  { name: "derakhshan-penel", dir: "/home/dppackde/derakhshan-penel", buildScript: "build", startScript: "start" },
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
    for (const project of projects) {
      console.log(`\n📦 Updating ${project.name}...`);

      // Pull latest updates
      console.log("Pulling latest code...");
      const pullResult = await runCommand("git pull origin main", project.dir);
      console.log(pullResult);

      // Install dependencies
      console.log("Installing dependencies...");
      const installResult = await runCommand("npm install --force", project.dir);
      console.log(installResult);

      // Build project using its own script
      console.log("Building project...");
      const buildResult = await runCommand(`npm run ${project.buildScript}`, project.dir);
      console.log(buildResult);
    }

    // Restart all PM2 apps (your PM2 apps should already use npm start scripts)
    console.log("\n🔄 Restarting all PM2 apps...");
    const pm2Result = await runCommand("pm2 restart all", "/home/dppackde");
    console.log(pm2Result);

    res.status(200).send("✅ Projects updated, built, and restarted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to update projects");
  }
});

export default webHooksRouter;
