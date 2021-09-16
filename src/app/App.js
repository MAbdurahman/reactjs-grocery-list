import React from 'react';
import List from './../components/list/List';
import Alert from './../components/alert/Alert';

const getLocalStorage = () => {
	let list = localStorage.getItem('list');
	if (list) {
		return (list = JSON.parse(localStorage.getItem('list')));
	} else {
		return [];
	}
};

function App() {
	//**************** variables ****************//
	//**************** functions ****************//
	return (
		<div>
			<h2>This is App.js</h2>
		</div>
	);
}

export default App;
