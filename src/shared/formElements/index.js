import React from 'react'
import {InputElement, DateElement, SelectElement, CheckboxElement, FileElement} from './InputElements'
import {ButtonElement} from './ButtonElements'

const FormElement = (props) => {
	let formElement = null

	switch (props.elementType) {
		case ('input'):
			formElement = <InputElement {...props} />
			break
		case ('date'):
			formElement = <DateElement {...props} />
			break
		case ('select'):
			formElement = <SelectElement {...props} />
			break
		case ('checkbox'):
			formElement = <CheckboxElement {...props} />
			break
		case ('button'):
			formElement = <ButtonElement {...props} />
			break
		case ('file'):
			formElement = <FileElement {...props} />
			break
		default:
			console.log("pass elementType to props", formElement)
	}

	return formElement
}

export default FormElement