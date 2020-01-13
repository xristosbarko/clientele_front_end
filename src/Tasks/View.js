import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const View = (props) => {
	const phone_numbers = props.phone_numbers ? (
		props.phone_numbers.map(phone_number => (
			<TableRow  key={phone_number}>
				<TableCell>{phone_number}</TableCell>
			</TableRow>
		))
	) : null

	const briefings = props.briefings ? (
		props.briefings.map(briefing => (
			<TableRow  key={briefing}>
				<TableCell>{briefing}</TableCell>
			</TableRow>
		))
	) : null

	return (
		<>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Τηλέφωνα</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{phone_numbers}
				</TableBody>
			</Table>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Ενημερώσεις Πελάτη</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{briefings}
				</TableBody>
			</Table>
			<div>
				<a href={props.pdf} target="_blank" rel="noopener noreferrer">
					{props.status === 1 ? "Δελτίο Παραλαβής Υλικού Προς Έλεγχο" : "Δελτίο Τεχνικού Ελέγχου"}
				</a>
			</div>
		</>
	)
}

export default View
