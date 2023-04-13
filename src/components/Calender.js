import React, { useEffect } from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
function Calender({ calender, setCalender }) {
	

	const convertedDate = (dateData = []) => {
		const data = dateData?.map((dat) => {
			let date;
			date = moment(dat._d).format('YYYY-MM-DD');
			return date;
		});

		return data;
	};

	const onChangeHandler = (val) => {
		const ret = convertedDate(val);
		setCalender(ret);
	};
	return (
		<div>
			<RangePicker onChange={(val) => onChangeHandler(val)} />
		</div>
	);
}

export default Calender;
