import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LabelImportantTwoToneIcon from '@material-ui/icons/LabelImportantTwoTone'

const View = (props) => {

	let date = new Date()
	const year = date.getFullYear();
	const month = (1 + date.getMonth()).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0')
	date = day + '/' + month + '/' + year;

	const view = (
		<div style={{borderStyle: 'solid'}}>
			<Grid container>
				<Grid item xs={5}>
					<img style={{height: '50px', width: '50px'}} src={require("./imgs/logo192.png")} alt="logo" />
				</Grid>
				<Grid item xs={7}>
					Επωνυμία
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h6" align="center" color="primary">
						ΤΕΧΝΙΚΗ ΕΚΘΕΣΗ No { props.tech_report_id } / { year }
					</Typography>
				</Grid>
			</Grid>
			<Grid container direction="column" spacing={0}>
				<Grid item>
					<Typography><b><u>ΠΡΟΣ</u>: {props.state.taskDTY ? props.state.taskDTY.client.last_name : null}</b></Typography>
				</Grid>
				<Grid item>
					<Typography><LabelImportantTwoToneIcon />{props.state.taskDTY ? props.state.taskDTY.client.first_name : null}</Typography>
				</Grid>
				<Grid item>
					<Typography><LabelImportantTwoToneIcon /><u>Υπ’ όψιν Υπευθύνου Πληροφορικής</u></Typography>
				</Grid>
			</Grid>
			<br />
			<Grid container direction="column" spacing={3}>
				<Grid item>
					<Typography>Κύριοι,</Typography>
				</Grid>
				<Grid item>
					<Typography align="justify">
						<LabelImportantTwoToneIcon />
						Σύμφωνα με το ΔΤΥ υπ.’ Αριθμ. {props.state.taskDTY ? props.state.taskDTY.code_number + ' - ' + props.state.taskDTY.date : null} { props.state.form.text.value }
					</Typography>
				</Grid>
				{props.state.form.spare_parts.value ? (
					<Grid container>
						<Grid item>
							<ul style={{listStyleType: 'none'}}>
								{props.state.form.spare_parts.value.split("\n").map(part => {
									if (part !== '') {
										return <li key={part}>• { part }</li>
									} else {
										return null
									}
								})}
							</ul>
						</Grid>
					</Grid>
				) : null}
				<Grid item xs={12}>
					<Typography>
						Για τις δικές σας ενέργειες
					</Typography>
				</Grid>
				<Grid container alignItems="center" direction="column" spacing={0}>
					<Grid item>
						<Typography>
							"Πόλη", { date }
						</Typography>
					</Grid>
					<Grid item>
						<Typography>
							Με εκτίμηση
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<br />
			<br />
			<br />
			<Grid container>
				<Grid item xs={12}>
					<Typography align="center">
						"Επώνυμο Όνομα"
					</Typography>
				</Grid>
			</Grid>
		</div>
		)

	return view
}

export default View