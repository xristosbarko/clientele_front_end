import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { NavLink } from 'react-router-dom'
import DeviceList from './DeviceList'

class Devices extends Component {
	render () {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					component={NavLink} to="/devices/create"
					size="small"
					startIcon={<AddIcon />}>Προσθήκη Συσκευής
				</Button>
				<DeviceList location={this.props.location} history={this.props.history} />
			</div>
		)
	}
}

export default Devices
