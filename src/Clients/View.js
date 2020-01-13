import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const View = (props) => {
	const phone_numbers = props.phone_numbers ? (
		props.phone_numbers.map(phone_number => (
			<TableRow key={phone_number}>
				<TableCell onClick={() => props.deletePhoneNumber(phone_number)}>
					{phone_number}
				</TableCell>
			</TableRow>
		))
	) : null
	return phone_numbers
}

export default View