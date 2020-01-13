import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Search from './search/Search'
import { NavLink } from 'react-router-dom'
import EventList from './EventList'
import Grid from '@material-ui/core/Grid'
import Calendar from './Calendar'

class Events extends Component {
	render () {
		return (
			<div>
				<Button
					style={{marginBottom: 10}}
					variant="contained"
					color="primary"
					component={NavLink} to="/events/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Ειδοποίησης
				</Button>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Calendar />
					</Grid>
					<Grid item xs={6}>
						<Search location={this.props.location} history={this.props.history} />
						<EventList location={this.props.location} history={this.props.history} />
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default Events
