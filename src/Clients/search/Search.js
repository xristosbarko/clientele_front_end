import FormElements from './Form'
import queryString from 'query-string'
import SearchHoc from '../../shared/Search'
import {initializeFormFromQueryParams} from '../../shared/utils'

class Search extends SearchHoc {
	state = {
		form: FormElements()
	}

	componentDidMount () {
		this.setState({
			form: initializeFormFromQueryParams(queryString.parse(this.props.location.search), this.state.form)
		})
	}
}

export default Search