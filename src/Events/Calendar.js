import React, {Component} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/el'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {getAxiosConfig} from '../shared/axios'

class MyCalendar extends Component {
	state = {
		myEventsList: []
	}

	componentDidMount () {
		let url = 'events/calendar'

		axios.get(API_ROOT + url, getAxiosConfig())
			.then(response => {
				this.setState({
					myEventsList: response.data
				})
				
			})
			.catch(error => {
				console.log(error)
		})
	}

	render () {
		moment.locale('el')
		const localizer = momentLocalizer(moment)
		const messages = {
			today: 'Σήμερα',
			previous: '<<',
			next: '>>',
			showMore: count => '+' + count + ' περισσότερα'
		}

		return (
			<Calendar
				localizer={localizer}
				messages={messages}
				popup={true}
				events={this.state.myEventsList}
				onSelectEvent={event => alert(event.client.full_name + '\n' + event.title)}
				views={['month']}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
			/>
		)
	}
} 

export default MyCalendar