/*

SMNotice {
	int at
	int reply
	int mail
}

*/

function $parse(html) {
	var rsp = {code: 0, data: getNotice(html), message: ''};
	console.log(rsp);
	window.location.href = 'newsmth://' + encodeURIComponent(JSON.stringify(rsp));
}


function getNotice(html) {
	var notice = {
		__type: 'SMNotice',
		at: 0,
		reply: 0,
		mail: 0
	};

	try {
		var body = html.match(/<body>(.*)<\/body>/i)[1];
		var div = document.createElement('div');
		div.innerHTML = body;

		document.body.appendChild(div);

		var as = div.querySelectorAll('a');
		for (var i = 0; i != as.length; ++i) {
			var a = as[i];
			if (a.pathname == '/mail') {
				if (a.innerHTML.match(/邮箱\(.+/)) {
					notice.match = 1;
				}
			}

			if (a.pathname == '/refer/at') {
				var matches = a.innerHTML.match(/\((\d+)\)/);
				if (matches && !isNaN(Number(matches[1]))) {
					notice.at = Number(matches[1]);
				}
			}

			if (a.pathname == '/refer/reply') {
				var matches = a.innerHTML.match(/\((\d+)\)/);
				if (matches && !isNaN(Number(matches[1]))) {
					notice.reply = Number(matches[1]);
				}
			}
		}
	} catch (ignore) {
		console.log(ignore);
	}

	console.log(notice);
	return notice;
}