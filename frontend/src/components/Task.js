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
		let tempTask = this.state.task;
		tempTask.is_completed = !tempTask.is_completed; // Toggle is_completed
		axios.put(`http://127.0.0.1:8000/api/tasks/${tempTask.pk}/`, tempTask).then(() => {
			this.props.getTasks();
		});
	}

	// Called when edit button is clicked
	handleEditClick = (e) => {
		//Open Popup
		this.setState({isPopupOpen: true});
	}

	// Called when delete button is clicked
	handleDeleteClick = (e) => {
		//DELETE to API
		axios.delete(`http://127.0.0.1:8000/api/tasks/${this.state.task.pk}/`).then(() => {
			this.props.getTasks();
		});
	}

	// Called by TaskEditPopup when popup is closed
	handlePopupClose = () => {
		this.setState({isPopupOpen: false});
	}

	// Called by TaskEditPopup when task is edited
	updateTask = (editTask) => {
		if(this.state.task.task != editTask)  {
			// PUT edited task to API
			let tempTask = this.state.task;
			tempTask.task = editTask;
			axios.put(`http://127.0.0.1:8000/api/tasks/${tempTask.pk}/`, tempTask).then(() => {
				this.props.getTasks();
			});
		}
	}

	render() {
		return(
			<div>
				<div className="task-container">
					<div>
						<span className={this.state.task.is_completed ? "task-complete" : "task"} onClick={this.handleTaskClick}>{this.state.task.task}</span>
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
