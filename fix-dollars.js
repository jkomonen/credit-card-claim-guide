const fs = require('fs')
let data = fs.readFileSync('src/data/cards.json', 'utf8')

data = data.replace(/,000,000/g, '$1,000,000')
data = data.replace(/,000/g, '$1,000')
data = data.replace(/150\/day/g, '$150/day')

fs.writeFileSync('src/data/cards.json', data, 'utf8')
console.log('Fixed dollar amounts')
