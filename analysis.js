const fileProcessor = require("./fileProcessor");
const statsHandler = require("./statisticsHandler");

const analysis = {
  stats: {
    uniqueIP: {},
    uniqueIPCount: 0,
    urlFreq: {},
  },

  async loadFile(file) {
    try {
      const fileContents = await fileProcessor.readFile(file);
      fileContents.forEach((line) => {
        statsHandler.processIPs(this.stats, line);
        statsHandler.processPathData(this.stats, line);
      });
    } catch (err) {
      console.error("Error reading file:", err);
      throw err;
    }
  },

  getUniqueIPs() {
    return statsHandler.getUniqueIPs(this.stats);
  },

  getMostVisitedURLs(count) {
    return statsHandler.getMostVisitedURLs(this.stats, count);
  },

  getTopIPs(count) {
    return statsHandler.getTopIPs(this.stats, count);
  },
};

module.exports = analysis;
