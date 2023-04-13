import { useState } from 'react';

function useCalender() {
	const [calender, setCalender] = useState(['', '']);

	return {
		calender,
		setCalender,
	};
}

export default useCalender;
