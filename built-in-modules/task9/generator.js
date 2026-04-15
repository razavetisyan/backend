
const path = require("path"); 

function generator(file) {

    const extention = path.extname(file);

    const name = path.basename(file, extention);

    return `${name}_backup${extention}`;
}

module.exports = generator;