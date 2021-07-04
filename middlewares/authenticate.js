const logger = (req, res, next) => {
    console.log('Authenticating...');
    next();
}

module.exports = logger;