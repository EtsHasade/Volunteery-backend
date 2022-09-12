const fs = require('fs')

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const styles = {    // styles for the message log
    Reset: "\x1b[0m",
    error: "\x1b[31m", // red
    warn: "\x1b[33m",  // yellow
    info: "\x1b[32m",  // green
    debug: "\x1b[34m", // blue
}

//define the time format
function getTime() {
    let now = new Date();
    return now.toUTCString();
}

function doLog(line, level = 'Debug') {
    const styledMsg = (msg)=> `${styles[level.toLowerCase()]}${msg}${styles.Reset}`;
    if (typeof line !== 'string') line = JSON.stringify(line)
    console.log(styledMsg(`${level}:\n${line}`));
    line = `${getTime()} - ${level} - ${line}\n`
    fs.appendFileSync('./logs/backend.log', line);
}

module.exports = {
    debug(line) {
        doLog(line, "Debug")
    },
    info(line) {
        doLog(line, "Info")
    },
    warn(line) {
        doLog(line, "Warn")
    },
    error(line) {
        doLog(line, "Error")
    }
}