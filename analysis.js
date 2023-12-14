const fs = require("fs");

const analysis = {
  stats: {
    uniqueIP: {},
    uniqueIPCount: 0,
    urlFreq: {},
  },

  loadFile: function (file) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file);

      readStream.on("data", (chunk) => {
        this.fileContents = chunk.toString().split(/\r?\n/);
        this.fileContents.forEach((line) => {
          // console.log(line);
          this.processIPs(line);
          this.processPathData(line);
        });
      });

      readStream.on("end", () => {
        resolve();
      });

      readStream.on("error", (err) => {
        reject(err); // Reject the Promise if there's an error
      });
    });
  },

  fileContents: [],

  processIPs: function (currentLine) {
    if (currentLine !== undefined) {
      let address = currentLine.substring(0, currentLine.indexOf(" "));

      if (address in this.stats.uniqueIP) {
        this.stats.uniqueIP[address] += 1; // increment instance
      } else if (address !== "") {
        this.stats.uniqueIP[address] = 1; // create an instance
        this.stats.uniqueIPCount++;
      }
    }
  },

  processPathData: function (currentLine) {
    const fullURL = currentLine.substring(
      currentLine.indexOf("GET ") + 4,
      currentLine.indexOf(" HTTP")
    );

    let path = "";

    // CLEAN THE DATA - DROP THE HTTP
    if (fullURL.startsWith("http")) {
      const url = new URL(fullURL);
      path = url.pathname;
    } else {
      path = fullURL;
    }

    if (path in this.stats.urlFreq) {
      this.stats.urlFreq[path] += 1; // increment the instance
    } else if (path !== "") {
      // ignores all the spaces at the bottom of the log
      this.stats.urlFreq[path] = 1; // create an instance
    }
  },

  getUniqueIPs: function () {
    return this.stats.uniqueIPCount;
  },

  sortData: function (data) {
    const info = Object.entries(data);
    return info.sort((a, b) => b[1] - a[1]);
  },

  getTopIPs: function (count) {
    const arrayOfEntries = this.sortData(this.stats.uniqueIP);
    return arrayOfEntries.slice(0, count);
  },

  getMostVisitedURLs: function (count) {
    const sortedURLs = this.sortData(this.stats.urlFreq);
    return sortedURLs.slice(0, count);
  },
};

module.exports = analysis;
