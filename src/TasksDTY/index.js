import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Search from './search/Search'
import { NavLink } from 'react-router-dom'
import TaskDTYList from './TaskDTYList'

class TasksDTY extends Component {
	render () {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					component={NavLink} to="/tasksDTY/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Εργασίας ΔΤΥ
				</Button>
				<Search location={this.props.location} history={this.props.history} />
				<TaskDTYList location={this.props.location} history={this.props.history} />
			</div>
		)
	}
}

export default TasksDTY