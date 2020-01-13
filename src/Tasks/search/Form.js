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
		status: {
			elementType: 'select',
			elementConfig: {
				label: 'Κατάσταση',
				options: []
			},
			value: ''
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
		ip: {
			elementType: 'input',
			elementConfig: {
				label: 'IP',
			},
			value: ''
		},
		tech: {
			elementType: 'input',
			elementConfig: {
				label: 'Τεχνικός',
			},
			extra: {
				autoComplete: 'techs'
			},
			value: ''
		}
	}

	return formElements
}

export default formElements