const Request = require('request');
const Cheerio = require('cheerio');
const page = 'http://invoice.etax.nat.gov.tw';

const GetPage = () => {
    return new Promise((resolve, reject) => {
        Request.get(page, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            if (response && response.statusCode != 200) {
                reject('error code');
                return;
            }
            resolve(body);
        })
    });
}

// id = #ID
// class = .CLASS
// attr = ATTR
const Parser = ($, dom) => {

    const obj = {
        title: undefined,
        year: undefined,
        month_begin: undefined,
        month_end: undefined,
        values: {
            one_thousand: [],
            two_million: [],
            two_hundred_thousand: [],
            two_hundred: []
        },
        interval_time: undefined
    }

    const title = dom.find('h2').last().text().trim();
    obj.title = title;
    const year = title.split('年')[0];
    const months = title.split('年')[1];
    const month_begin = months.split('-')[0];
    const month_end = months.split('-')[1].split('月')[0];
    obj.year = year;
    obj.month_begin = month_begin;
    obj.month_end = month_end;

    dom.find('tr').map((index, element) => {
        const ele = $(element);
        const name = ele.find('.title').text().trim();
        const number = ele.find('.t18Red').text().trim();
        if (name === '特別獎') {
            obj.values.one_thousand.push(number)
        }
        if (name === '特獎') {
            obj.values.two_million.push(number)
        }
        if (name === '頭獎') {
            const numbers = number.split('、');
            numbers.map(n => {
                obj.values.two_hundred_thousand.push(n);
            });
        }
        if (name === '增開六獎') {
            const numbers = number.split('、');
            numbers.map(n => {
                obj.values.two_hundred.push(n);
            });
        }
    });
    const date = dom.find('.date').text().trim();
    obj.interval_time = date;

    console.log(obj);
};

const Scrape = async() => {
    const page = await GetPage().catch(err => {
        console.error(err);
    });

    const $ = Cheerio.load(page);
    const current = $('#area1');
    const previous = $('#area2');
    Parser($, current);
    Parser($, previous);
};

Scrape();