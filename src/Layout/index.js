import React, { Component } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

import { connect } from 'react-redux'

class Layout extends Component {
	render () {
		return (
			<>
				{this.props.isAuthenticated ? <NavBar /> : null }
				<br />
				{this.props.children}
				<br />
				<br />
				<Footer />
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout)