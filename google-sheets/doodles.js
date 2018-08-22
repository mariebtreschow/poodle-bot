const GoogleSpreadsheet = require('google-spreadsheet');
const _ = require('lodash')

const doc = new GoogleSpreadsheet('1Fm16jiOYLe0KfbQA5WQmVYqSGuu5OuiOA66q3h09cHE');

function get () {
    return new Promise((resolve, reject) => {
        return doc.getRows(1, (err, rows) => {
            const doodles = _.map(rows, (row) => {
                return row.fact
            })
            const item = doodles[Math.floor(Math.random()*doodles.length)];
            resolve(item)
        })
    })
}

module.exports = {
    get
}
