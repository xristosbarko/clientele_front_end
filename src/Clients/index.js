import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Search from './search/Search'
import { NavLink } from 'react-router-dom'
import SearchList from './SearchList'

class Clients extends Component {
	render () {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					component={NavLink} to="/clients/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Πελάτη
				</Button>
				<Search location={this.props.location} history={this.props.history} />
				<SearchList location={this.props.location} history={this.props.history} />
			</div>
		)
	}
}

export default Clients
