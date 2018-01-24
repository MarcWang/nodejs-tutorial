const fs = require('fs');
const pdf = require('html-pdf');
const GeneratorHTML = require('./generator');
const createHTML = require('create-html');
const moment = require('moment');

class PackageNitification {
    constructor() {

    }

    async output(values = []) {
        if (values.length === 0) {
            return Promise.reject({ status: -1 });
        }

        const opts = {
            scriptAsync: true,
            head: GeneratorHTML.Header(),
            lang: 'en',
            body: ''
        };

        const chunk_size = 4;
        const groups = values
            .map((e, i) => (i % chunk_size === 0) ? values.slice(i, i + chunk_size) : null)
            .filter((e) => e);

        for (let g of groups) {
            opts.body = opts.body + GeneratorHTML.Body(g);
        }
        const html_options = createHTML(opts);
        fs.writeFileSync('sample.html', html_options);
        const html = fs.readFileSync('./sample.html', 'utf8');
        const options = { format: 'Letter' };
        pdf.create(html, options).toFile('./sample.pdf', (err, res) => {
            if (err) return Promise.reject({ status: -2 });
            else return Promise.resolve(res);
        });
    }
}

const mock = () => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                username: `${i}`,
                address: `仁愛路3段${i}號`,
                datetime: moment().format('YYYY/MM/DD HH:mm'),
                type: 'deposit',
                type_others: 'cold'
            });
        }
        return arr;
    }
    // console.log(mock());

const notifier = new PackageNitification();
notifier.output(mock()).then(value => {
    // console.log(value);
}).catch(err => {
    // console.log(err);
});