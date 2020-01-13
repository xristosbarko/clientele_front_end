const formElements = () => {
	let formElements = {
		username: {
			elementType: 'input',
			elementConfig: {
				label: 'Όνομα Χρήστη',
			},
			value: ''
		},
		password: {
			elementType: 'input',
			elementConfig: {
				label: 'Κωδικός',
				id: "standard-adornment-password",
				type: "password"
			},
			value: ''
		}
	}

	return formElements
}

export default formElements