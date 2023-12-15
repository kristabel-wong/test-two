const fileProcessor = require("./fileProcessor");
const statsHandler = require("./statsProcessor");

const analysis = {
  stats: {
    uniqueIP: {},
    uniqueIPCount: 0,
    urlFreq: {},
  },

  async loadFile(file) {
    try {
      await fileProcessor.readFile(file, (line) => this.processChunks(line));
    } catch (err) {
      console.error("Error reading file:", err);
      throw err;
    }
  },

  processChunks(line) {
    statsHandler.processIPs(this.stats, line);
    statsHandler.processPathData(this.stats, line);
  },

  getUniqueIPs() {
    return this.stats.uniqueIPCount;
  },

  getMostVisitedURLs(count) {
    const sortedURLs = statsHandler.sortData(this.stats.urlFreq);
    return sortedURLs.slice(0, count);
  },

  getTopIPs(count) {
    const arrayOfEntries = statsHandler.sortData(this.stats.uniqueIP);
    return arrayOfEntries.slice(0, count);
  },
};

module.exports = analysis;
