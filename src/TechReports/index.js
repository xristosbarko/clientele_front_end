import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Search from './search/Search'
import { NavLink } from 'react-router-dom'
import TechReportList from './TechReportList'

class TechReports extends Component {
	render () {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					component={NavLink} to="/techReports/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Τεχνικής Έκθεσης
				</Button>
				<Search location={this.props.location} history={this.props.history} />
				<TechReportList location={this.props.location} history={this.props.history} />
			</div>
		)
	}
}

export default TechReports