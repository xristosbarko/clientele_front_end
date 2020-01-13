const formElements = (editForm) => {
	let formElements = {
		last_name: {
			elementType: 'input',
			elementConfig: {
				label: 'Επώνυμο',
				required: true
			},
			value: ''
		},
		first_name: {
			elementType: 'input',
			elementConfig: {
				label: 'Όνομα',
				required: true
			},
			value: ''
		},
		phone_number: {
			elementType: 'input',
			elementConfig: {
				label: 'Τηλέφωνο',
				required: true
			},
			value: ''
		},
	}
	return formElements
}

export default formElements