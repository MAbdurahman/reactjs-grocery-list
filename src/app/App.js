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
	const [alert, setAlert] = useState({ show: false, msg: '', type:'' });
	//**************** functions ****************//
	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({ show, type, msg });
	};
	const clearList = () => {
		showAlert(true, 'danger', 'list cleared!');
		setList([]);
	};
	const removeItem = id => {
		showAlert(true, 'danger', 'item removed!');
		setList(list.filter(item => item.id !== id));
	};
	const editItem = id => {
		const specificItem = list.find(item => item.id === id);
		setIsEditing(true);
    showAlert(true, 'caution', 'editing item!');
		setEditId(id);
		setName(specificItem.title);
	};
	const handleSubmit = e => {
    e.preventDefault();
		if (!name) {
			showAlert(true, 'danger', 'enter an item!');
		} else if (name && isEditing) {
			setList(
				list.map(item => {
					if (item.id === editId) {
						return { ...item, title: name };
					}
					return item;
				})
			);
			setName('');
			setEditId(null);
			setIsEditing(false);
			showAlert(true, 'success', 'successful edit');
		} else {
			// showAlert(true, 'success', 'item added');
			const newItem = { id: new Date().getTime().toString(), title: name };

			setList([...list, newItem]);
			setName('');
		}
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

			{list.length > 0 && (
				<div className='grocery-container'>
					<List items={list} removeItem={removeItem} editItem={editItem} />
					<button className='clear-btn' onClick={clearList}>
						clear items
					</button>
				</div>
			)}
		</section>
	);
}

export default App;
