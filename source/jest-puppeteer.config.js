// jest-puppeteer.config.js
module.exports = {
    launch: {
        headless: true,
        slowMo: 500,
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
};
