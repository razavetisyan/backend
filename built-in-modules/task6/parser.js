const { log } = require("console");

function configParser(fileContent){
   let split = fileContent.split(/\r?\n/);
    
   let result = {};

   split.forEach(row => {
    if(row.trim() === "" || row[0] === "#") {
        return;
    }
    
    const [key, value] = row.split("=");

    result[key] = value;
   });

   return result;
}

module.exports = configParser;
