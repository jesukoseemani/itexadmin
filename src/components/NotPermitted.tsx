import React from 'react';

function NotPermitted({ title }: { title: string }) {
	return (
		<div
			style={{
				height: '300px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textTransform: 'uppercase',
			}}>
			YOU CURRENTLY DO NOT HAVE PERMISSION TO VIEW {title}
		</div>
	);
}

export default NotPermitted;
