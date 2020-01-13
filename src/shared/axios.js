import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {initializeSelect, initializeInstance, initializeFormFromQueryParams} from './utils'
import {store} from '../index'
import * as actions from '../store/actions/index'

export const initializeState = ([...requests], [...inputIdentifiers], state, setState, params) => {
	let updatedState = {...state}
	axios.all([...requests])
		.then(axios.spread((...responses) => {
			let updatedForm = {...updatedState["form"]}
			let pop_outs = undefined
			for (let [counter, response] of responses.entries()) {
				if ([...inputIdentifiers][counter]) {
					updatedForm = initializeSelect(
						response.data,
						[...inputIdentifiers][counter],
						updatedForm
					)
				} else {
					[pop_outs, updatedForm] = initializeInstance(updatedForm, response.data)
				}
				
			}
			if (params) {
				updatedForm = initializeFormFromQueryParams(params, updatedForm)
			}

			updatedState = {
				...pop_outs,
				form: updatedForm
			}
			setState(updatedState)
		}))
		.catch(error => {
			console.log(error)
		})
}

export const axiosCreate = (app, data, history, showModal) => {
	axios.post(API_ROOT + app + '/create', data, getAxiosConfig())
		.then(response => {
			if (showModal) {
				showModal()
				return store.dispatch(actions.showMessage("Αποθηκεύτηκε", "success"))
			}
			history.push('/' + app)
			store.dispatch(actions.showMessage("Αποθηκεύτηκε", "success"))
		})
		.catch(error => {
			store.dispatch(actions.showMessage("Σφάλμα", "error"))
		})
}

export const axiosEdit = (app, id, data, history) => {
	axios.put(API_ROOT + app + '/edit/' + id, data, getAxiosConfig())
		.then(response => {
			history.push('/' + app)
			store.dispatch(actions.showMessage("Αποθηκεύτηκε", "success"))
		})
		.catch(error => {
			store.dispatch(actions.showMessage("Σφάλμα", "error"))
		})
}

export const axiosDelete = async (app, id, history) => {
	await axios.delete(API_ROOT + app + '/delete/' + id, getAxiosConfig())
		.then(response => {
			history.push('/' + app)
			store.dispatch(actions.showMessage("Διαγράφηκε", "success"))
		})
		.catch(error => {
			store.dispatch(actions.showMessage("Σφάλμα", "error"))
		})
}

export const getAxiosConfig = () => {
	const state = store.getState()
	const config = {
		headers: {
			Authorization: "Token " + state.auth.token
		}
	}
	return config
}

export const techReportSent = (app, id, data) => {
	axios.patch(API_ROOT + app + '/edit/' + id, data, getAxiosConfig())
}