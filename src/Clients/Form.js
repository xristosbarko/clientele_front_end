const formElements = () => {
	let formElements = {
		last_name: {
			elementType: 'input',
			elementConfig: {
				label: 'Επώνυμο',
				required: true,
			},
			value: ''

		},
		first_name: {
			elementType: 'input',
			elementConfig: {
				label: 'Όνομα',
				required: true,
			},
			value: ''
		},
		city: {
			elementType: 'input',
			elementConfig: {
				label: 'Πόλη',
			},
			value: ''
		},
		address: {
			elementType: 'input',
			elementConfig: {
				label: 'Διεύθυνση',
			},
			value: ''
		},
		phone_number: {
			elementType: 'input',
			elementConfig: {
				label: 'Τηλέφωνο',
			},
			value: '',
			addPhoneNumberButton: true
		},
		fax: {
			elementType: 'input',
			elementConfig: {
				label: 'fax',
			},
			value: ''
		},
		email: {
			elementType: 'input',
			elementConfig: {
				label: 'email',
			},
			value: ''
		},
		info: {
			elementType: 'input',
			elementConfig: {
				label: 'Σχόλια',
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
			},
			value: '',
		},
		responsible: {
			elementType: 'input',
			elementConfig: {
				label: 'Υπεύθυνος',
			},
			value: ''
		}
	}

	return formElements
}

export default formElements