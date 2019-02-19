import * as React from 'react'; // Required in order to load Main
import * as ReactDOM from 'react-dom';
import { Main } from '@components/main';
import '@styles/index.scss';

ReactDOM.render(
	<Main />,
	document.getElementById('main')
);
