import React, { useState } from 'react';
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
	const [name, setName] = useState('');
	const [list, setList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
	//**************** functions ****************//
	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({ show, type, msg });
	};
	const clearList = () => {
		showAlert(true, 'danger', 'empty list');
		setList([]);
	};
	const removeItem = id => {
		showAlert(true, 'danger', 'item removed');
		setList(list.filter(item => item.id !== id));
	};
	const editItem = id => {
		const specificItem = list.find(item => item.id === id);
		setIsEditing(true);
		setEditId(id);
		setName(specificItem.title);
	};
	const handleSubmit = e => {
		e.preventDefault();
	};
	return (
		<section className='section-center'>
			<form className='grocery-form' onSubmit={handleSubmit}>
				{alert.show && (
					<Alert {...alert} removeAlert={showAlert} list={list} />
				)}

				<h3>grocery list</h3>
				<div className='form-control'>
					<input
						type='text'
						className='grocery'
						placeholder='e.g. eggs'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'submit'}
					</button>
				</div>
			</form>
			<h2>List</h2>
			<button className='clear-btn'>clear items</button>
		</section>
	);
}

export default App;
