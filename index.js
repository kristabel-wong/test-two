const analysis = require("./analysis");

async function analyseFile() {
  try {
    await analysis.loadFile("programming-task-example-data.log");
    console.log("The number of unique IP addresses:", analysis.getUniqueIPs());
    console.log("Top 3 most visited URLs", analysis.getMostVisitedURLs(3));
    console.log("Top 3 most active IP addresses", analysis.getTopIPs(3));
  } catch (error) {
    console.error("Error analyzing file:", error);
  }
}

analyseFile();
