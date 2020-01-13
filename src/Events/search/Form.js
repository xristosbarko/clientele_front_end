const formElements = (editForm) => {
	let formElements = {
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
		}
	}

	return formElements
}

export default formElements