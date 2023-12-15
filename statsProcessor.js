function processIPs(stats, currentLine) {
  if (currentLine !== undefined) {
    let address = currentLine.substring(0, currentLine.indexOf(" "));

    if (address in stats.uniqueIP) {
      stats.uniqueIP[address] += 1; // increment instance
    } else if (address !== "") {
      stats.uniqueIP[address] = 1; // create an instance
      stats.uniqueIPCount++;
    }
  }
}

function processPathData(stats, currentLine) {
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

  if (path in stats.urlFreq) {
    stats.urlFreq[path] += 1; // increment the instance
  } else if (path !== "") {
    // ignores all the spaces at the bottom of the log
    stats.urlFreq[path] = 1; // create an instance
  }
}

function sortData(data) {
  const info = Object.entries(data);
  return info.sort((a, b) => b[1] - a[1]);
}

module.exports = {
  processIPs,
  processPathData,
  sortData,
};
