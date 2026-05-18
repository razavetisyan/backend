const apiKeyMiddleware = require("./api.key.middleware");

function requirePermission(permission){ 
    return (req, res, next) => {
        const client = req.client;

        if(!client){ 
            return res.status(401).json({
                error : "Unauthorized client"
            });
        }

        const hasPermission = client.permissions.includes(permission);

        if(!hasPermission){ 
            return res.status(403).json({
                error : `Missing ${permission} permission`
            });
        }

        next();
    }
}

module.exports = requirePermission;