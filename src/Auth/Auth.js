import React, {Component} from 'react'
import FormElements from './Form'
import {onChangeHandler, formElementsToArray} from '../shared/utils'
import Grid from '@material-ui/core/Grid'
import RenderForm from '../shared/renderForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../store/actions/index'
import Button from '@material-ui/core/Button'

class Auth extends Component {
	state = {
		form: FormElements()
	}

	componentDidMount() {
		if (!this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath()
		}
	}

	inputChangedHandler = (event, inputIdentifier) => {
		this.setState({
			form: onChangeHandler(event, inputIdentifier, this.state.form)
		})
	}

	auth () {
		const auth = {}
		for (let formElementIdentifier in this.state.form) {
			auth[formElementIdentifier] = this.state.form[formElementIdentifier].value
		}
		return auth
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const auth = this.auth()
		this.props.onAuth(auth.username, auth.password)
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)
		
		// let errorMessage = null

		// if (this.props.error) {
		// 	errorMessage = (
		// 		<p>{this.props.error.message}</p>
		// 	)
		// }

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath}/>
		}

		return (
			<>
				{authRedirect}
				<form onSubmit={this.onSubmitHandler}>
					<Grid container direction="column" justify="center" alignItems="center" spacing={3}>
						<Grid item xs={12}>
							<img style={{height: '150px', width: '150px'}} src={require("./imgs/logo192.png")} alt="logo" />
						</Grid>
						<Grid item xs={12}>
							<Grid container direction="column">
								<RenderForm
									formElementsArray={formElementsArray}
									changed={(event, inputIdentifier) => this.inputChangedHandler(event, inputIdentifier)}
									loadComponent={(inputIdentifier) => this.loadComponent(inputIdentifier)}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								size="small"
								type="submit"
							>
								Σύνδεση
							</Button>
						</Grid>
					</Grid>
					
				</form>
			</>
		)
	}
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)