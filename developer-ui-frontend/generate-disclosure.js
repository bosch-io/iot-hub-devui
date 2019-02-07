/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
const spawner = require("child_process");
const fs = require("fs");
const disclosureFile = fs.createWriteStream("build/DISCLOSURE.TXT");

disclosureFile.once("open", () => {
  const disclosureGenerator = spawner.exec(
    "yarn licenses generate-disclaimer",
    (err, stdout) => {
      disclosureFile.write(stdout);
    }
  );

  disclosureGenerator.on("close", code => {
    disclosureFile.end();

    if (code === 0) {
      console.log("Disclosure generation process exited ok.");
    } else {
      console.log("Disclosure generation process exited with code ${code}.");
    }
  });
});
