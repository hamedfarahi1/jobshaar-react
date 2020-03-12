import React from 'react';
import { useParams } from 'react-router-dom';

function JobDetail() {
	let { id } = useParams()
	return (
		<div>
			fuckkkkk  : { id}
		</div>
	)
}

export { JobDetail }