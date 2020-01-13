const formElements = (editForm) => {
	let formElements = {
		date_from: {
			elementType: 'date',
			elementConfig: {
				label: 'Από'
			},
			value: null
		},
		date_to: {
			elementType: 'date',
			elementConfig: {
				label: 'Έως'
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
		},
		type_of_device: {
			elementType: 'select',
			elementConfig: {
				label: 'Τύπος',
				options: []
			},
			value: ''
		},
		sent: {
			elementType: 'select',
			elementConfig: {
				label: 'ΤΕ',
				options: [
					{
						id: 0,
						name: 'Όλες'
					},
					{
						id: 1,
						name: 'Απεσταλμένες'
					},
					{
						id: 2,
						name: 'Μη απεσταλμένες'
					}
				]
			},
			value: 0
		},
	}

	return formElements
}

export default formElements