const formElements = (editForm) => {
	let formElements = {
		client: {
			elementType: 'input',
			elementConfig: {
				label: 'Πελάτης',
				required: true
			},
			extra: {
				autoComplete: 'clients',
				addButton: true
			},
			value: ''
		},
		date: {
			elementType: 'date',
			elementConfig: {
				label: 'Ημερομηνία',
				required: true
			},
			value: new Date()
		},
		department: {
			elementType: 'input',
			elementConfig: {
				label: 'Τμήμα'
			},
			extra: {
				autoComplete: 'departments',
				addButton: true
			},
			value: ''
		},
		info: {
			elementType: 'input',
			elementConfig: {
				label: 'Πληροφορίες',
				required: true,
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
			},
			value: ''
		}
	}

	if (editForm) {
		formElements = {
			...formElements,

			status: {
				elementType: 'select',
				elementConfig: {
					label: 'Κατάσταση',
					options: []
				},
				value: ''
			}
		}
	}
	return formElements
}

export default formElements