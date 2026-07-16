function auth(roles) {
    return function (req, res, next) {
        const token = res.cookies.token;

        if (!token) {
            return next(new Error("Token not provided"));
        }

        try {
            const decoded = verifyToken(token);
            req.user = decoded;
        } catch (err) {
            return next(err);
        }

        if (roles) {
            if (!roles.includes(req.user.roles)) {
                return next(new Error("Unauthorized"));
            }
        }

        next();
    };
}
