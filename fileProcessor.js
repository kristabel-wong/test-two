const fs = require("fs");

function readFile(file) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(file);
    let data = "";

    readStream.on("data", (chunk) => {
      data += chunk;
    });

    readStream.on("end", () => {
      const fileContents = data.split(/\r?\n/);
      resolve(fileContents);
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = { readFile };
