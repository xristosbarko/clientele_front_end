import React from 'react'
import FormElement from './formElements'

export const onChangeHandler = (event, inputIdentifier, form) => {
	const updatedForm = {
		...form
	}
	const updatedFormElement = { 
		...updatedForm[inputIdentifier]
	}
	if (updatedFormElement.elementType === "checkbox") {
		updatedFormElement.value = event.target.checked
	} else if (updatedFormElement.elementType === "date") {
		updatedFormElement.value = event
	} else if (updatedFormElement.elementType === "file") {
		updatedFormElement.value = event.target.files[0]
	} else {
		updatedFormElement.value = event.target.value
	}
	updatedForm[inputIdentifier] = updatedFormElement
	return updatedForm
}

export const initializeSelect = (data, inputIdentifier, form) => {
	const updatedForm = {
			...form
		}
		const updatedFormElement = {
			...updatedForm[inputIdentifier]
		}
		updatedFormElement.value = data[0].id

		const updatedElementConfig = {
			...updatedFormElement["elementConfig"]
		}
		updatedElementConfig.options = data
		
		updatedForm[inputIdentifier] = updatedFormElement
		updatedForm[inputIdentifier]["elementConfig"] = updatedElementConfig
		return updatedForm
}

export const initializeInstance = (form, data) => {
	const updatedForm = {
		...form
	}

	let pop_outs = {}
	for (let field in data) {
		if (!(field in updatedForm)) {
			pop_outs[field] = data[field]
		}
	}

	let updatedFormElement = null
	for (let formElementIdentifier in updatedForm) {
		updatedFormElement = {
			...updatedForm[formElementIdentifier]
		}
		if (formElementIdentifier === 'client' && typeof(data[formElementIdentifier]) === 'object') {
			updatedFormElement.value = data[formElementIdentifier]['full_name']
			pop_outs["phone_numbers"] = data[formElementIdentifier]['phone_numbers']
		} else if (!data[formElementIdentifier]) {
			if (!(updatedForm[formElementIdentifier].elementType === 'checkbox')) {
				updatedFormElement.value = ''
			}
		} else {
			updatedFormElement.value = data[formElementIdentifier]
		}

		updatedForm[formElementIdentifier] = updatedFormElement
	}

	return [{...pop_outs}, {...updatedForm}]
}

export const initializeFormFromQueryParams = (params, form) => {
		const updatedForm = {
					...form
				}
		let updatedFormElement = null
		for (let param in params) {
			if (param !== 'page') {
				updatedFormElement = { 
					...updatedForm[param]
				}
				updatedFormElement.value = params[param]

				updatedForm[param] = updatedFormElement
			}
		}
		return updatedForm
	}

export const formElementsToArray = (form) => {
	const formElementsArray = []
		for (let key in form) {
			formElementsArray.push({
				id: key,
				config: form[key]
			})
		}
		return formElementsArray
}

export const SaveButton = () => {
	return (
		<FormElement
			elementType="button"
			elementConfig={{type: "submit"}}
			value="Αποθήκευση"
		/>
	)
}

export const DeleteButton = (props) => {
	return (
		<FormElement
			elementType="button"
			elementConfig={{
				onClick: () => props.deleteInstance()
			}}
			value="Διαγραφή"
		/>
	)
}