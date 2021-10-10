function checkToken(req, res, next) {
    // console.log(req.headers);
    const header = req.headers['authorization'];
    // console.log(typeof header);
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        console.log(req.token);
        next();
    } else {
        console.log('some more shit');
        res.sendStatus(403);
    }
}

module.exports = {
    checkToken
};
