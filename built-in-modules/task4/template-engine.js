
function parseTemplate(template, obj) {
    let result = template;

    for(let key in obj) {
        let value = obj[key];

        let parsed = `{{${key}}}`;

        while(result.includes(parsed)) {
            result = result.replace(parsed, value);
        }
    }

    return result;
}

module.exports = parseTemplate;