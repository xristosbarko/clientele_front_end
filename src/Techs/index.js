import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
// import Search from './Search'
import { NavLink } from 'react-router-dom'
import TechList from './TechList'

class Techs extends Component {
	render () {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					component={NavLink} to="/techs/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Τεχνικού
				</Button>
				<TechList location={this.props.location} history={this.props.history} />
			</div>
		)
	}
}

export default Techs
