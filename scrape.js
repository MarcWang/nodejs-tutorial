const scrapeIt = require("scrape-it");
const Page = 'http://www.daily-zodiac.com/mobile/zodiac/';
const SignList = [
	'Aries',
	'Taurus',
	'Gemini',
	'Cancer',
	'Leo',
	'Virgo',
	'Libra',
	'Scorpio',
	'Sagittarius',
	'Capricorn',
	'Aquarius',
	'Pisces'];

function scrapeSign(url) {
	return scrapeIt(url, {
		name: '.name p.name',
		date: '.name p.date',
		today: '.content .today li span.date',
		weather: '.content .today li span.weather',
		content: '.content article'
	});
}

let scrape_list = [];
for( const sign of SignList){
	scrape_list.push(scrapeSign(`${Page}${sign}`));
}

Promise.all(scrape_list)
	.then(values => {
		for (const value of values) {
			console.log(value);
		}
	})
	.catch(err => console.log(err));


//http://www.daily-zodiac.com/mobile
