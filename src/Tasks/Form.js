const formElements = (editForm) => {
	let formElements = {
		client: {
			elementType: 'input',
			elementConfig: {
				label: 'Πελάτης',
				required: true,
			},
			extra: {
				autoComplete: 'clients',
				addButton: true
			},
			value: ''

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
		type_of_device: {
			elementType: 'select',
			elementConfig: {
				label: 'Τύπος',
				options: []
			},
			value: ''
		},
		observations: {
			elementType: 'input',
			elementConfig: {
				label: 'Παρατηρήσεις',
				multiline: true,
				id: "standard-multiline-static",
				rows: "2"
			},
			value: ''
		},
		tech: {
			elementType: 'input',
			elementConfig: {
				label: 'Τεχνικός',
				required: true
			},
			extra: {
				autoComplete: 'techs',
				addButton: true
			},
			value: ''
		}
	}

	if (editForm) {
		formElements = {
			...formElements,

			tech_diagnosis: {
				elementType: 'input',
				elementConfig: {
					label: 'Τεχνική Διάγνωση',
					multiline: true,
					id: "standard-multiline-static",
					rows: "2"
				},
				value: ''
			},
			briefing: {
				elementType: 'checkbox',
				elementConfig: {
					label: 'Ενημέρωση Πελάτη'
				},
				value: false
			},
			status: {
				elementType: 'select',
				elementConfig: {
					label: 'Κατάσταση',
					options: []
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
			spare_parts_cost: {
				elementType: 'input',
				elementConfig: {
					label: 'Κόστος Ανταλλακτικών',
				},
				value: ''
			},
			task_cost: {
				elementType: 'input',
				elementConfig: {
					label: 'Κόστος Εργασίας',
				},
				value: ''
			}
		}
	}

	return formElements
}

export default formElements