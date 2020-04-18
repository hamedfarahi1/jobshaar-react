const axios = require('axios').default;
var JSSoup = require('jssoup').default;
const express = require('express')
const url = require('url');

const performance = require('perf_hooks').performance;
const createParams = (str) => {
	str = str.substr(1)
	str = str.split('keywords').join('filters[keywords][0]')
		.split('locations').join('filters[locations][]')
		.split('job_categories').join('filters[job_categories][]')
		.split('sort').join('sort_by')
	return str;
}

const app = express()

var
	persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
	fixNumbers = function (str) {
		if (typeof str === 'string') {
			for (var i = 0; i < 10; i++) {
				str = str.replace(persianNumbers[i], i);
			}
		}
		return str
			.split(',').join('')
			.split('فرصت ‌شغلی').join('')
			.split(' ').join('')
			.split('\n').join('');
	};

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://188.40.195.134:8081"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.get('/', function (req, res, next) {
	createResp(req, res);
})

function createResp(req, resp) {
	let params = createParams(req.url)
	var t0 = performance.now()
	let response = {
		data: [],
		totalCount: 0,
		resTime: 0
	}
	axios.get('https://jobinja.ir/jobs' + params).then(
		res => {
			var soup = new JSSoup(res.data);
			const totalCount = soup.find('span', 'c-jobSearchState__numberOfResultsEcho');
			var str = totalCount.text;
			const list = soup.find('ul', 'o-listView__list');
			if (list) {
				const array = list.
					findAll('li', 'o-listView__item');
				for (i = 0; i < array.length; i++) {
					let ele = array[i].find('a', 'c-jobListView__titleLink');
					response.data.push({
						title: ele.text.split('\n').join(''),
						href: ele.attrs['href']
					})
				}
				response.totalCount = +fixNumbers(str)
			}

			response.resTime = performance.now() - t0
			return resp.send(response)
		},
		err => resp.send(err)
	)

}
app.listen(3000, () => console.log('Server running on port 3000!'))
