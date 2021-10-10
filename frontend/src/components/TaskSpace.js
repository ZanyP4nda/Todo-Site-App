import React from 'react';
import axios from 'axios';

import Task from 'src/components/Task.js';
import TaskPopup from 'src/components/TaskPopup.js';
import ConfirmPopup from 'src/components/ConfirmPopup.js';

import clearIcon from 'src/images/trash-can-icon.png';

class TaskSpace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			view: 0,
			isPopupOpen: false,
			isConfirmPopupOpen: false
		}
	}
	componentDidMount() {
		this.getTasks();
	}

	// GET tasks from REST api
	getTasks = () => {
		axios.get('/api/tasks').then((response) => {
			this.setState({tasks: response.data});
		});
	}

	// Map tasks from JSON array to JSX elements
	renderTasks = () => {
		return this.state.tasks.map((task) => {
			if(this.state.view == 0) {
				if(task.is_completed == false) {
					return(
					<div key={task.pk}>
						<Task task={task} getTasks={this.getTasks.bind(this)}/>
						<br />
					</div>
					);
				}
			} else {
				if(task.is_completed) {
					return(
					<div key={task.pk}>
						<Task task={task} getTasks={this.getTasks.bind(this)}/>
						<br />
					</div>
					);
				}
			}
		});
	}

	// Called when view checkbox is changed
	handleViewChange = (e) => {
		let newView = parseInt(e.target.id);	
		if(this.state.view != newView) {
			this.setState({view: newView});
		}
	}

	// Called when create button is clicked
	handleCreateClick = (e) => {
		e.preventDefault();
		this.setState({isPopupOpen: true});
	}

	// Called by TaskPopup when done button is clicked
	newTask = (newTask) => {
		// POST new task to API
		axios.post('/api/tasks/', {
			task: newTask,
			is_completed: false
		}).then(() => {
			this.getTasks();
		});
	}

	// Call by TaskPopup when popup is closed
	onPopupClose = () => {
		this.setState({isPopupOpen: false});
	}

	// Called when clear btn is clicked
	handleClearClick = (e) => {
		e.preventDefault();
		this.setState({isConfirmPopupOpen: true});
	}	

	// Call by ConfirmPopup when closed
	onConfirmPopupClose = () => {
		this.setState({isConfirmPopupOpen: false});
	}

	// Called by ConfirmPopup when option chosen
	clearPopupOutput = (isConfirmClear) => {
		if(isConfirmClear) {
			//GET tasks to be safe
			this.getTasks();
			// DELETE all tasks
			for(let i=0; i < this.state.tasks.length; i++) {
				axios.delete(`/api/tasks/${this.state.tasks[i].pk}`).then(() => {
					this.getTasks();
				});	
			}
		}
	}

	render() {
		return(
			<div>
				<span className="top-container">
					<span className="view-container">
						<fieldset className="switch">
							<label id="0" className={this.state.view == 0 ? "checked-label" : "unchecked-label"} onClick={this.handleViewChange}>
								UNCOMPLETED
							</label>
							<label id="1" className={this.state.view == 1 ? "checked-label" : "unchecked-label"} onClick={this.handleViewChange}>
								COMPLETED
							</label>
						</fieldset>
						<div className="toggle-container">
							<span className={this.state.view == 0 ? "toggle-uncompleted" : "toggle-completed"} />
						</div>
					</span>
					<div className="create-btn-container">
						<button className="create-btn" onClick={this.handleCreateClick}>+</button>
					</div>
				</span>
				<div className="taskspace">
					<div>
						{this.renderTasks()}
					</div>
				</div>
				<div className="clear-btn-container">
					<button className="clear-btn" onClick={this.handleClearClick}><img src={clearIcon} alt="CLEAR" height="35" width="35" /></button>
				</div>
			<TaskPopup 
			isOpen={this.state.isPopupOpen} updateTask={this.newTask} onClose={this.onPopupClose.bind(this)} closeOnDocumentClick task="" title="NEW TASK" />

			<ConfirmPopup isOpen={this.state.isConfirmPopupOpen} onClose={this.onConfirmPopupClose.bind(this)} confirmPopupOutput={this.clearPopupOutput} />
			</div>
		);
	}
}

export default TaskSpace;
