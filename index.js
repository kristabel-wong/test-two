const analysis = require("./analysis");

async function analyseFile() {
  try {
    await analysis.loadFile("programming-task-example-data.log");
    const uniqueIPCount = analysis.getUniqueIPs();
    console.log("The number of unique IP addresses:", uniqueIPCount);
    console.log("Top 3 most visited URLs", analysis.getMostVisitedURLs(3));
    console.log("Top 3 most active IP addresses", analysis.getTopIPs(3));
  } catch (error) {
    console.error("Error analyzing file:", error);
  }
}

// can also do a .then() .catch(), or a callback with (err) => { if (err) {} code...}

analyseFile();
