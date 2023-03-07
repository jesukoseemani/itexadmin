import React, { useState } from 'react';
import styles from './SearchComp.module.scss';
import SearchIcon from '@mui/icons-material/Search';

function SearchComp({ setSearch }: { setSearch: any }) {
	const [inputValue, setInputValue] = useState('');
	return (
		<div className={styles.searchwrapper}>
			<input
				onChange={(e) => setInputValue(e.target.value)}
				className={styles.searchinput}
				type='text'
				value={inputValue}
                placeholder="Search"
			/>
			<div
				onClick={() => setSearch(inputValue)}
				className={styles.searchicon}>
				<SearchIcon style={{color: "green"}}/>
			</div>
		</div>
	);
}

export default SearchComp;
