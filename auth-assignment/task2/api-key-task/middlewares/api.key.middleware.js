const clients = require("../data/clients.js");

function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    if(!apiKey){ 
        return res.status(401).json({
            error : "Missing X-API-KEY header"
        });
    }

    const client = clients.find(a => a.apiKey === apiKey);

    if(!client){ 
        return res.status(401).json({
            error : "Invalid API key"
        });
    }

    req.client = client;

    next();
}

module.exports = apiKeyMiddleware;