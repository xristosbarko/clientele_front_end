import React, { Component } from 'react'
import DepartmentDetails from './DepartmentDetails'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {getAxiosConfig} from '../shared/axios'
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

class DepartmentList extends Component {
	state = {
		count: 0,
		params: {
			page: undefined
		},
		departments: []
	}

	componentDidMount () {
		let url = 'departments/'
		let {page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {page}
		url = paramsToUrl(url, locationParams)

		axios.get(API_ROOT + url, getAxiosConfig())
			.then(response => {
				this.setState({
					departments: response.data.results,
					params: locationParams,
					count: response.data.count
				})
			})
			.catch(error => {
				console.log(error)
		})
	}

	componentDidUpdate (prevProps, prevState) {
		let url = 'departments/'
		let {page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {page}
		url = paramsToUrl(url, locationParams)

		if (!_.isEqual(locationParams, this.state.params)) {
			axios.get(API_ROOT + url, getAxiosConfig())
				.then(response => {
					this.setState({
						departments: response.data.results,
						params: locationParams,
						count: response.data.count
					})
				})
				.catch(error => {
					console.log(error)
			})
		}
	}

	changePage (event, page) {
		const url = '/departments'
		const updatedParams = changePageParams(page, this.state.params)
		this.props.history.push(url + updatedParams)
	}

	render () {
		const { count, departments } = this.state
		const page = this.state.params.page
		let pagination = null

		if (count) {
			pagination = (
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[]}
							count={count}
							page={page - 1}
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
							<TableCell>Τμήμα</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{departments.map(department => (
							<DepartmentDetails department={department} key={department.id} history={this.props.history} />
						))}
					</TableBody>
					{pagination}
				</Table>
			</>
		)
	}
}

export default DepartmentList
