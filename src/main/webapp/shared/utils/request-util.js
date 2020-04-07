export const createRequestOption = (req) => {
	let options = {};
	if (req) {
		Object.keys(req).forEach(key => {
			if (key !== 'sort' && key !== 'filter') {
				options[key] = req[key];
			}
		});
		if (req.sort) {
			options['sort'] = req.sort;
		}
		if (req.filter) {
			req.filter.forEach(item => {
				options[item.key] = item.value;
			});
		}
	}
	return options;
};