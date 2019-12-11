import React, { Fragment } from 'react';
import './styles.scss';

const Loader = (props) => {
	const { type } = props;

	return (
		<div className={`loader loader--${type}`}>
			{ type === 'default' && 'Carregando...' }
			{
				type === 'dots' &&
				<Fragment>
					<span></span>
					<span></span>
					<span></span>
				</Fragment>
			}
		</div>
	);
}

export default Loader;