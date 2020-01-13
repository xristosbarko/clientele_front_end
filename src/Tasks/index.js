import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Search from './search/Search'
import { NavLink } from 'react-router-dom'
import TaskList from './TaskList'

class Tasks extends Component {
	render () {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					component={NavLink} to="/tasks/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Εργασίας
				</Button>
				<Search location={this.props.location} history={this.props.history} />
				<TaskList location={this.props.location} history={this.props.history} />
			</div>
		)
	}
}

export default Tasks