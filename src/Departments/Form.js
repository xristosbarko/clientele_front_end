const formElements = (editForm) => {
	let formElements = {
		name: {
			elementType: 'input',
			elementConfig: {
				label: 'Όνομα',
				required: true
			},
			value: ''
		}
	}
	return formElements
}

export default formElements