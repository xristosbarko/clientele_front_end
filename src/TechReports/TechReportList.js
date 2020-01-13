import React, { Component } from 'react'
import TechReportDetails from './TechReportDetails'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {getAxiosConfig, axiosDelete, techReportSent} from '../shared/axios'
import queryString from 'query-string'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import {paramsToUrl, changePageParams} from '../shared/parameters'
import _ from 'lodash'

class TechReportList extends Component {
	state = {
		count: 0,
		params: {
			date_from: undefined,
			date_to: undefined,
			client: undefined,
			department: undefined,
			ip: undefined,
			type_of_device: undefined,
			sent: undefined,
			page: undefined			
		},
		techReports: [],
		update: false
	}

	componentDidMount () {
		let url = 'techReports/'
		let {date_from, date_to, client, department, ip, type_of_device, sent, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {date_from, date_to, client, department, ip, type_of_device, sent, page}
		url = paramsToUrl(url, locationParams)

		axios.get(API_ROOT + url, getAxiosConfig())
			.then(response => {
				this.setState({
					count: response.data.count,
					params: locationParams,
					techReports: response.data.results
				})
				
			})
			.catch(error => {
				console.log(error)
		})
	}

	componentDidUpdate () {
		let url = 'techReports/'
		let {date_from, date_to, client, department, ip, type_of_device, sent, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {date_from, date_to, client, department, ip, type_of_device, sent, page}
		url = paramsToUrl(url, locationParams)

		if (!_.isEqual(locationParams, this.state.params) || this.state.update) {
			axios.get(API_ROOT + url, getAxiosConfig())
				.then(response => {
					this.setState({
						count: response.data.count,
						params: locationParams,
						techReports: response.data.results,
						update: false
					})
				})
				.catch(error => {
					console.log(error)
			})
		}
	}

	changePage (event, page) {
		const url = '/techReports'
		const updatedParams = changePageParams(page, this.state.params)
		this.props.history.push(url + updatedParams)
	}

	onSentHandler (tech_report_id, sent) {
		const data = {
			sent
		}
		techReportSent("techReports", tech_report_id, data)
	}

	deleteTechReport = (tech_report_id) => {
		axiosDelete("techReports", tech_report_id, this.props.history)
			.then(res => {
				this.setState({
					update: true
				})
			})
	}

	render () {
		const { count, techReports } = this.state
		const page = this.state.params.page
		let pagination = null

		if (count) {
			pagination = (
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[]}
							count={count}
							page={page ? parseInt(page) -1 : 0}
							rowsPerPage={10}
							onChangePage={(event, page) => this.changePage(event, page)}
						/>
					</TableRow>
				</TableFooter>
			)
		}

		return (
			<>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Αριθμός</TableCell>
							<TableCell>Πελάτης</TableCell>
							<TableCell>Τμήμα</TableCell>
							<TableCell>Τύπος</TableCell>
							<TableCell>Ημερομηνία</TableCell>
							<TableCell>Δ.Τ.Υ.</TableCell>
							<TableCell>PDF</TableCell>
							<TableCell>Απεστάλη</TableCell>
							<TableCell>Διαγραφή</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{techReports.map(tech_report => (
							<TechReportDetails
								key={tech_report.id}
								tech_report={tech_report}
							 	history={this.props.history}
							 	sent={(tech_report_id, sent) => this.onSentHandler(tech_report_id, sent)}
							 	deleteTechReport={(tech_report_id) => this.deleteTechReport(tech_report_id)} />
						))}
					</TableBody>
					{pagination}
				</Table>
			</>
		)
	}
}

export default TechReportList
