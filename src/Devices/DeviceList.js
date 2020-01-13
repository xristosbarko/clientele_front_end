import React, { Component } from 'react'
import DeviceDetails from './DeviceDetails'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {getAxiosConfig} from '../shared/axios'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class DeviceList extends Component {
	state = {
		devices: []
	}

	componentDidMount () {
		let url = 'devices/'

		axios.get(API_ROOT + url, getAxiosConfig())
			.then(response => {
				this.setState({
					devices: response.data,
				})
			})
			.catch(error => {
				console.log(error)
		})
	}

	render () {
		const { devices } = this.state

		return (
			<>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Εργασίες</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{devices.map(device => {
							if (device.app === 1) {
								return (
									<DeviceDetails device={device} key={device.id} history={this.props.history} />
								)
							} else { return null }
						})}
					</TableBody>
				</Table>
				<br />
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Τεχνικές Εκθέσεις</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{devices.map(device => {
							if (device.app === 2) {
								return (
									<DeviceDetails device={device} key={device.id} history={this.props.history} />
								)
							} else { return null }
						})}
					</TableBody>
				</Table>
			</>
		)
	}
}

export default DeviceList
