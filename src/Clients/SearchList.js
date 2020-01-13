import React, { Component } from 'react'
import TaskDetails from './TaskDetails'
import TechReportDetails from './TechReportDetails'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {getAxiosConfig} from '../shared/axios'
import queryString from 'query-string'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {paramsToUrl} from '../shared/parameters'
import _ from 'lodash'

class TaskList extends Component {
	state = {
		params: {
			date_from: undefined,
			date_to: undefined,
			client: undefined,
			department: undefined,
			ip: undefined,		
		},
		results: null
	}

	componentDidMount () {
		let url = 'searches/advanced'
		let {date_from, date_to, client, department, ip} = queryString.parse(this.props.location.search)
		const locationParams = {date_from, date_to, client, department, ip}
		url = paramsToUrl(url, locationParams)

		if (this.props.location.search) {
			url += this.props.location.search

			axios.get(API_ROOT + url, getAxiosConfig())
				.then(response => {
					this.setState({
						params: locationParams,
						results: response.data
					})

				})
				.catch(error => {
					console.log(error)
			})
		}
	}

	componentDidUpdate () {
		let url = 'searches/advanced'
		let {date_from, date_to, client, department, ip} = queryString.parse(this.props.location.search)
		const locationParams = {date_from, date_to, client, department, ip}
		url = paramsToUrl(url, locationParams)

		if (!_.isEqual(locationParams, this.state.params)) {
			axios.get(API_ROOT + url, getAxiosConfig())
				.then(response => {
					this.setState({
						params: locationParams,
						results: response.data
					})
				})
				.catch(error => {
					console.log(error)
			})
		}
	}

	render () {
		const { results } = this.state

		let searchList = null

		if (results) {
			searchList = (
				<>
					<h3>Εργασίες</h3>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Ημερομηνία Ανάθεσης</TableCell>
								<TableCell>Πελάτης</TableCell>
								<TableCell>IP</TableCell>
								<TableCell>Αναφορά Πελάτη Βλάβης</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{results.tasks.map(task => (
								<TaskDetails task={task} key={task.id} history={this.props.history} />
							))}
						</TableBody>
					</Table>
					<h3>Τεχνικές Εκθέσεις</h3>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Ημερομηνία</TableCell>
								<TableCell>Πελάτης</TableCell>
								<TableCell>Τμήμα</TableCell>
								<TableCell>IP</TableCell>
								<TableCell>PDF</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{results.tech_reports.map(tech_report => (
								<TechReportDetails
									key={tech_report.id}
									tech_report={tech_report}
								 	history={this.props.history} />
							))}
						</TableBody>
					</Table>
				</>
			)
		}

		return (
			<>
				{searchList}
			</>
		)
	}
}

export default TaskList
