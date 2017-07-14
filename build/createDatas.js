const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

const dev = path.join(cwd, 'docs/examples');
const findfiles = function(ipath, deep = false, json = {}) {
    fs.readdirSync(ipath).forEach(function(sPath) {
        var fileName = path.join(ipath, sPath);


        if (fs.statSync(fileName).isDirectory() && sPath != '') {
            if (deep && sPath !== 'node_modules') findfiles(fileName, deep, json);
        } else {
            var fileInfo = fs.statSync(fileName),
                basename = path.basename(path.dirname(fileName)),
                extname = path.extname(fileName).replace(/^\./, ''),
                relName = path.relative(dev, fileName),
                category = relName.split(path.sep)[0];

            /**
             * [if 以文件名后缀分类]
             */
            if (!json[extname]) {
                json[extname] = {};
            }

            /**
             * [if demo列表]
             */
            if (!json[extname]['list']) {
                json[extname]['list'] = [];
            }

            if (!/^_/.test(basename) && !/^_/.test(category)) {
                json[extname]['list'].push({
                    link: relName,
                    basename: basename,
                    birthtime: Date.parse(fileInfo.birthtime),
                    updateTime: Date.parse(fileInfo.mtime),
                    visitTime: Date.parse(fileInfo.atime),
                    changeTime: Date.parse(fileInfo.atime),
                    category: category
                })
            }

            /**
             * 数据长度
             */
            json[extname]['total'] = json[extname]['list'].length;

            /**
             * [if demo分类]
             */
            if (!json[extname]['category']) {
                json[extname]['category'] = {};
            }

            if (!/^_/.test(category)) {
                json[extname][`category`][category] = `/${category}`;
            }
        }
    })
    return json;
};

const data = findfiles(dev, true).html;
data.path = process.env.NODE_ENV === 'production' ? 'build' : 'dev';

fs.writeFile(path.join(cwd, 'src/datas/files.json'), JSON.stringify(data), function(err) {
    if (!err) console.log("写入成功！");
})
