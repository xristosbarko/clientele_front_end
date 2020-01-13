import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ClientSearch from './ClientSearch'
import NavBarItem from './NavBarItem'
import Menu from './Menu'
import Container from '@material-ui/core/Container'

const NavBar = () => {
	const items = [
		{id: 1, url: '/', name: 'Αρχική'},
		{id: 2, url: '/clients', name: 'Πελάτες'},
		{id: 3, url: '/tasks', name: 'Εργασίες'},
		{id: 4, url: '/tasksDTY', name: 'ΔΤΥ'},
		{id: 5, url: '/techReports', name: 'Τεχνικές Εκθέσεις'},
	]

	const logout = {
		url: '/logout', name: 'Αποσύνδεση'
	}

	return (
		<AppBar position="static">
			<Container maxWidth="md">
				<Toolbar>
					{items.map(item => <NavBarItem item={item} key={item.id}/>)}
					<Menu />
					<ClientSearch />
					<NavBarItem item={logout} />
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default NavBar