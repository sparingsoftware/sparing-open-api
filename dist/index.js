require('dotenv').config();
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var generateApi = require('swagger-typescript-api').generateApi;
module.exports = function () {
    if (!process.env.OPEN_API_URL) {
        console.log(chalk.yellow('OPEN_API_URL is not defined. Service creation aborted!'));
        return;
    }
    var OUTPUT_NAME = 'index.ts';
    var OUTPUT_PATH = path.resolve(process.cwd(), './service/');
    var TEMPLATES_PATH = path.resolve(__dirname, '../templates/');
    generateApi({
        name: OUTPUT_NAME,
        url: process.env.OPEN_API_URL,
        templates: TEMPLATES_PATH
    }).then(function (_a) {
        var files = _a.files;
        if (!fs.existsSync(OUTPUT_PATH))
            fs.mkdirSync(OUTPUT_PATH);
        files.forEach(function (_a) {
            var content = _a.content, name = _a.name;
            fs.writeFileSync(OUTPUT_PATH + "/" + name, content);
        });
    });
};
//# sourceMappingURL=index.js.map