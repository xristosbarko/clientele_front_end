import axios from 'axios'
import { API_ROOT } from '../../appConfig'
import FormElements from './Form'
import {initializeState, getAxiosConfig} from '../../shared/axios'
import queryString from 'query-string'
import SearchHoc from '../../shared/Search'

class Search extends SearchHoc {
	state = {
		form: FormElements()
	}

	componentDidMount () {
		const status = axios.get(API_ROOT + 'tasks/status_choices', getAxiosConfig())

		initializeState(
			[status],
			['status'],
			this.state,
			(state) => this.axiosSetState(state),
			queryString.parse(this.props.location.search)
		)
	}
}

export default Search