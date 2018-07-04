const spawner = require('child_process');
const fs = require('fs');
var disclosureFile = fs.createWriteStream("target/DISCLOSURE.TXT");

disclosureFile.once('open', function (fd) {

    var disclosureGenerator = spawner.exec('yarn licenses generate-disclaimer',
        function (err, stdout, stderr) {
            disclosureFile.write(stdout);
        });

    disclosureGenerator.on('close', (code) => {
        disclosureFile.end();

        if (code === 0) {
            console.log('Disclosure generation process exited ok.');
        } else {
            console.log('Disclosure generation process exited with code ${code}.');
        }

    });
});