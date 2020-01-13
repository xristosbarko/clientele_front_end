const formElements = (editForm) => {
	let formElements = {
		date_from: {
			elementType: 'date',
			elementConfig: {
				label: 'Από',
			},
			value: null
		},
		date_to: {
			elementType: 'date',
			elementConfig: {
				label: 'Έως',
			},
			value: null
		},
		client: {
			elementType: 'input',
			elementConfig: {
				label: 'Πελάτης',
			},
			extra: {
				autoComplete: 'clients'
			},
			value: ''
		},
		department: {
			elementType: 'input',
			elementConfig: {
				label: 'Τμήμα',
			},
			extra: {
				autoComplete: 'departments'
			},
			value: ''
		},
		ip: {
			elementType: 'input',
			elementConfig: {
				label: 'IP',
			},
			value: ''
		}
	}

	return formElements
}

export default formElements