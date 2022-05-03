const User = require('../models/user');
/* const {wrapAsync} = require('../server'); */

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        throw new Error("Need to login first");
    }
    next();
}

module.exports.isAgent = wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user.agent && !user.agent.equals(req.session.userId)) {
        /* throw new ExpressError("Not an authorized agent for this author", 401); */
        throw new Error("Invalid email and/or password");
    }
    next();
});