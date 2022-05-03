import React from 'react';
import axios from 'axios';
import TaskPopup from 'src/components/TaskPopup.js';

const zero_opacity = {opacity: 0};
const full_opacity = {opacity: 1};

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: {},
			isPopupOpen: false,
			isShowButtons: false
		}
	}
	componentDidMount() {
		this.setState({task: this.props.task});
	}

	// Called when cursor hovers over task
	onHover = (e) => {
		console.log("HOVER");
		if(!this.state.isShowButtons) {
			this.setState({isShowButtons: true});
		}
	}

	// Called when cursor stops hovering over task
	onStopHover = (e) => {
		console.log("STOP HOVER");
		if(this.state.isShowButtons) {
			this.setState({isShowButtons: false});
		}
	}

	// Called when task is clicked
	handleTaskClick = (e) => {
		let tempTask = this.state.task;
		tempTask.is_completed = !tempTask.is_completed; // Toggle is_completed
		axios.put(`/api/tasks/${tempTask.pk}/`, tempTask).then(() => {
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
		axios.delete(`/api/tasks/${this.state.task.pk}/`).then(() => {
			this.props.getTasks();
		});
	}

	// Called by TaskPopup when popup is closed
	handlePopupClose = () => {
		this.setState({isPopupOpen: false});
	}

	// Called by TaskPopup when task is edited
	updateTask = (editTask) => {
		if(this.state.task.task != editTask)  {
			// PUT edited task to API
			let tempTask = this.state.task;
			tempTask.task = editTask;
			axios.put(`/api/tasks/${tempTask.pk}/`, tempTask).then(() => {
				this.props.getTasks();
			});
		}
	}

	render() {
		return(
			<div>
				<div className="task-container" onMouseEnter={this.onHover} onMouseLeave={this.onStopHover} >
					<div className="task-label-container">
						<span className={this.state.task.is_completed ? "task-complete" : "task"} onClick={this.handleTaskClick}>{this.state.task.task}</span>
					</div>
					<div className="task-btns-container" style={this.state.isShowButtons ? full_opacity : zero_opacity}>
						<button className="edit-btn" onClick={this.handleEditClick}>EDIT</button>
						<button className="delete-btn" onClick={this.handleDeleteClick}>DELETE</button>
					</div>
				</div>

				<TaskPopup 
				isOpen={this.state.isPopupOpen} onClose={this.handlePopupClose.bind(this)} closeOnDocumentClick task={this.state.task.task} updateTask={this.updateTask.bind(this)} title="EDIT TASK"
				className="task-popup" />
			</div>
		);
	}
}

export default Task;
