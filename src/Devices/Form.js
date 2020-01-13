const formElements = (editForm) => {
	let formElements = {
		app: {
			elementType: 'select',
			elementConfig: {
				label: 'Εφαρμογή',
				options: []
			},
			value: ''
		},
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