const fs = require("fs");

const { exec } = require("child_process");

const installDependenciesAndBuild = (directory) =>
  exec(`cd ./${directory} && rm -rf package-lock.json && npm install && npm run build`, (error, stdout, stderr) => {
    
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    
    console.log(`stdout: ${stdout}`);
  });

const buildPackages = () => 
  fs.readdir("./", function(err, items) {
      if (err != null) {
        throw err.message;
      } 
   
      for (var i=0; i<items.length; i++) {
        if(items[i].endsWith(".js")) continue;
        installDependenciesAndBuild(items[i]);
      }
  });


buildPackages();
