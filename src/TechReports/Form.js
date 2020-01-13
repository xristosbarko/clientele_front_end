const formElements = (editForm) => {
	let formElements = {
		filename: {
			elementType: 'input',
			elementConfig: {
				label: 'Όνομα Αρχείου',
				required: true
			},
			value: ''
		},
		task_dty: {
			elementType: 'input',
			elementConfig: {
				label: 'Αριθμός ΔΤΥ',
				required: true
			},
			extra: {
				autoComplete: 'tasksDTY',
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
		ip: {
			elementType: 'input',
			elementConfig: {
				label: 'IP'
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
		spare_parts: {
			elementType: 'input',
			elementConfig: {
				label: 'Ανταλλακτικά',
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
			},
			value: ''
		},
		comment: {
			elementType: 'input',
			elementConfig: {
				label: 'Σχόλιο',
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
			},
			value: ''
		},
		text: {
			elementType: 'input',
			elementConfig: {
				label: 'Κείμενο',
				required: true,
				multiline: true,
				id: "standard-multiline-static",
				rows: "5",
				fullWidth: true
			},
			value: 'σε έλεγχο που κάναμε για διάγνωση βλαβών διαπιστώσαμε ότι για την απρόσκοπτη επαναλειτουργία του θα πρέπει να αντικατασταθούν τα κάτωθι ανταλλακτικά:'
		},
		generate_pdf: {
			elementType: 'checkbox',
			elementConfig: {
				label: 'Δημιουργία PDF'
			},
			value: false
		},
	}
	return formElements
}

export default formElements