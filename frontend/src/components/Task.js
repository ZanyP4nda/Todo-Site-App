import React from 'react';
import axios from 'axios';
import TaskEditPopup from 'src/components/TaskEditPopup.js';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: {},
			isPopupOpen: false
		}
	}
	componentDidMount() {
		this.setState({task: this.props.task});
	}

	// Called when task is clicked
	handleTaskClick = (e) => {
		//PUT task is_complete=True
		let newTask = this.state.task;
		newTask.is_completed = true;
		axios.put(`http://127.0.0.1:8000/api/tasks/${newTask.pk}/`, newTask);
	}

	// Called when edit button is clicked
	handleEditClick = (e) => {
		//Open Popup
		this.setState({isPopupOpen: true});
	}

	// Called when delete button is clicked
	handleDeleteClick = (e) => {
		//DELETE to API
	}

	// Called by TaskEditPopup when popup is closed
	handlePopupClose = () => {
		this.setState({isPopupOpen: false});
	}

	// Called by TaskEditPopup when task is edited
	updateTask = (newTask) => {
		if(this.state.task.task != newTask)  {
			// PUT to API
		}
	}

	render() {
		return(
			<div>
				<div className="task-container">
					<div>
						<span className="task" onClick={this.handleTaskClick}>{this.state.task.task}</span>
					</div>
					<div className="btns-container">
						<button className="edit-btn" onClick={this.handleEditClick}>EDIT</button>
						<button className="delete-btn" onClick={this.handleDeleteClick}>DELETE</button>
					</div>
				</div>

				<TaskEditPopup 
				isOpen={this.state.isPopupOpen} onClose={this.handlePopupClose.bind(this)} task={this.state.task.task} updateTask={this.updateTask.bind(this)}
				className="popup" />
			</div>
		);
	}
}

export default Task;
