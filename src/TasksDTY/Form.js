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
		code_number: {
			elementType: 'input',
			elementConfig: {
				label: 'Αριθμός ΔΤΥ',
				required: true
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
		report_damage: {
			elementType: 'input',
			elementConfig: {
				label: 'Αναφορά Βλάβης',
				required: true,
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
			},
			value: ''
		},
		tech_diagnosis: {
			elementType: 'input',
			elementConfig: {
				label: 'Τεχνική Διάγνωση',
				required: true,
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
			},
			value: ''
		},
		more_info: {
			elementType: 'input',
			elementConfig: {
				label: 'Περισσότερες Πληροφορίες',
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
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
		department: {
			elementType: 'input',
			elementConfig: {
				label: 'Τμήμα',
				required: true
			},
			extra: {
				autoComplete: 'departments',
				addButton: true
			},
			value: ''
		},
		without_tech_report: {
			elementType: 'checkbox',
			elementConfig: {
				label: 'Χωρίς Τεχνική Έκθεση'
			},
			value: false
		},
		scanned_dty: {
			elementType: 'file',
			elementConfig: {
				label: 'Scanned ΔΤΥ',
				accept: '.pdf'
			},
			value: null
		},
	}
	return formElements
}

export default formElements