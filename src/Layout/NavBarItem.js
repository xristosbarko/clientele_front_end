import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const NavBarItem = (props) => {
	const style = {color: '#40A4C8'}
	let active = false
	if (props.item.url === '/' && props.location.pathname.startsWith('/events')) {
		active = true
	}

	return (
		<Button
			color="inherit"
			component={NavLink} to={props.item.url}
			exact={props.item.url === '/' ? true : false}
			activeStyle={style}
			style={active ? style : null}
		>
			{props.item.name}
		</Button>
	)
}

export default withRouter(NavBarItem)