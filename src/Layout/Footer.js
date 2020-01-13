import React from 'react'
import Typography from '@material-ui/core/Typography'

const Footer = () => {

	const footer = {
		position: 'fixed',
		left: 0,
		bottom: 0,
		width: '100%',
		backgroundColor: 'lightGray',
		textAlign: 'center',
	}

	return (
		<div style={footer}>
			<Typography variant="caption" align="center" color="primary">
				Source code: 
				<a href="https://github.com/ChaoticFailer/clientele_front_end" target="_blank" rel="noopener noreferrer">
					clientele_front_end
				</a>
			</Typography>
		</div>
	)
}

export default Footer