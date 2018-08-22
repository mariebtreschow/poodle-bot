const GoogleSpreadsheet = require('google-spreadsheet');
const _ = require('lodash')

const doc = new GoogleSpreadsheet('13ET2fjPPKrmZ1XSptQK45EHZmq1hbs218PCUlt6zERc');

function get () {
    return new Promise((resolve, reject) => {
        return doc.getRows(1, (err, rows) => {
            const doodles = _.map(rows, (row) => {
                return row.doodles
            })
            const item = doodles[Math.floor(Math.random()*doodles.length)];
            resolve(item)
        })
    })
}

module.exports = {
    get
}
