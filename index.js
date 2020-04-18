const axios = require('axios').default;
var JSSoup = require('jssoup').default;
const express = require('express')
const performance = require('perf_hooks').performance;


const app = express()

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "188.40.195.134:3000"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.get('/', function (req, res, next) {
	createResp(req, res);
})

function createResp(req, resp) {
	var t0 = performance.now()
	let response = `
	<html>
	<head>
	<style>
	body {
		direction:rtl
	}	
31
32
33
* {margin: 0; padding: 0; }
 
div {
  margin: 20px;
}
 
ul {
  list-style-type: none;
  width: 500px;
}
 
h3 {
  font: bold 20px/1.5 Helvetica, Verdana, sans-serif;
}
 
li img {
  float: left;
  margin: 0 15px 0 0;
}
 
li p {
  font: 200 12px/1.5 Georgia, Times New Roman, serif;
}
 
li {
  padding: 10px;
  overflow: auto;
}
 
li:hover {
  background: #eee;
  cursor: pointer;
}
	</style>
	</head>
	<body>
	<ul>
	
	
	`
	axios.get('https://jobinja.ir/jobs').then(
		res => {
			var soup = new JSSoup(res.data);
			const array = soup.find('ul', 'o-listView__list').
				findAll('li', 'o-listView__item');
			for (i = 0; i < array.length; i++) {
				let ele = array[i].find('a', 'c-jobListView__titleLink');
				response = response + `
				<li>
     
      <h3>${ele}</h3>
      <p>برای مشاهده بر روی عنوان کلیک کنید</p>
    </li>
				`;
			}
			response = response + '</ul></body></html>'
			var t1 = performance.now()
			response = `مدت زمان پردازش  ${t1 - t0} milis` + response
			return resp.send(response)
		},
		err => resp.send(err)
	)

}
app.listen(3000, () => console.log('Server running on port 3000!'))
