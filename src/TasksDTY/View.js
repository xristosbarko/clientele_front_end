import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const View = (props) => {
	let view = null

	if (props.tech_report) {
		view = (
			<>
				<h3>Τεχνική Έκθεση</h3>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>No</TableCell>
							<TableCell>PDF</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>{props.tech_report.id}</TableCell>
							<TableCell>
								{props.tech_report.pdf ? 
									<a href={props.tech_report.pdf} target="_blank" rel="noopener noreferrer">
										Εμφάνιση
									</a> : "Δεν έχει δημιουργηθεί ακόμη το pdf αρχείο."}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</>
		)
	}

	return view
}

export default View
