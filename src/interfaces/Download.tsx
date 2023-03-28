import { useState } from 'react';
import { useSelector } from 'react-redux';

const useDownload = ({ url, filename }: { url: string; filename: string }) => {
	const auth = useSelector((state) => state?.authPayReducer?.auth);
	const access_token = auth?.access_token;

	const calDownload = async () => {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		console.log('responsetopolo:', res);

		const blob = await res.blob();
		const newBlob = new Blob([blob]);

		const blobUrl = window.URL.createObjectURL(newBlob);

		const link = document.createElement('a');
		link.href = blobUrl;
		link.setAttribute('download', `${filename}`);
		document.body.appendChild(link);

		link.click();

		// clean up Url
		window.URL.revokeObjectURL(blobUrl);
	};

	return { calDownload };
};

export default useDownload;
