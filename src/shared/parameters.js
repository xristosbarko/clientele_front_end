export const paramsToUrl = (url, locationParams, hiddenParams) => {
	let updatedParams = ''

	if (hiddenParams) {
		for (let param in hiddenParams) {
			let exists = false
			for (let locParam in locationParams) {
				if (param === locParam && locationParams[locParam] !== undefined) {
					exists = true
					break
				}
			}
			if (!exists) {
				updatedParams += '&' + param + '=' + hiddenParams[param]
			}
		}
	}

	for (let param in locationParams) {
		if (locationParams[param]) {
			updatedParams += '&' + param + '=' + locationParams[param]
		}
	}

	url += updatedParams.replace('&', '?')
	return url
}

export const changePageParams = (page, stateParams) => {
	let updatedParams = ''

	for (let param in stateParams) {
		if (stateParams[param]) {
			if (param === 'page') {
				updatedParams += '&' + param + '=' + (page + 1)
			} else {
				updatedParams += '&' + param + '=' + stateParams[param]
			}
		}
	}
	updatedParams = updatedParams.replace('&', '?')
	return updatedParams
}