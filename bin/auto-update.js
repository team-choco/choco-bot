const { exec, spawn } = require('child_process');
const checkForUpdate = require('update-check');

const pkg = require('../package.json');

let instances = [];

exports.checkForUpdate = async () => {
  try {
    return await checkForUpdate({
      name: pkg.name,
      version: pkg.version,
    });
  } catch (error) {
    console.error(`Failed to check for updates: ${error}`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    return exports.checkForUpdate(pkg);
  }
}

exports.autoUpdate = async (args) => {
  const version = await exports.checkForUpdate();

  if (version) {
    console.log(`Updating to ${pkg.name}@${version.latest}...`);

    await new Promise((resolve, reject) =>
      exec(`npm install -g ${pkg.name}@${version.latest}`, (error, stdout, stderr) => {
        if (stderr) reject(stderr);
        else resolve(stdout);
      }),
    );

    console.log(`Successfully Updated!`);

    console.log(`Starting up bot...`);
    instances.push(spawn(`choco-bot start ${args}`, {
      stdio: ['pipe', process.stdout, process.stderr],
    }));
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));

  exports.autoUpdate(args);
}
