
function appendTimestamp(text) {
    let time = new Date().toLocaleString();

    return `${time} ${text} \n`;
}

module.exports = appendTimestamp;