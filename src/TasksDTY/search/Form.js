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
		task_dty: {
			elementType: 'input',
			elementConfig: {
				label: 'Αριθμός'
			},
			extra: {
				autoComplete: 'tasksDTY'
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