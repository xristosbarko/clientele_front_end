import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
// import Search from './Search'
import { NavLink } from 'react-router-dom'
import DepartmentList from './DepartmentList'

class Departments extends Component {
	render () {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					component={NavLink} to="/departments/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Τμήματος
				</Button>
				<DepartmentList location={this.props.location} history={this.props.history} />
			</div>
		)
	}
}

export default Departments
