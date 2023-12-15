const fs = require("fs");

function readFile(file, processChunks) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(file);

    readStream.on("data", (chunk) => {
      chunk
        .toString()
        .split(/\r?\n/)
        .forEach((line) => {
          processChunks(line);
        });
    });

    readStream.on("end", () => {
      resolve();
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = { readFile };
