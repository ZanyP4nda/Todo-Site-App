import React from 'react';
import axios from 'axios';
import Task from 'src/components/Task.js';

class TaskSpace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		}
	}
	componentDidMount() {
		this.getTasks();
	}

	// GET tasks from REST api
	getTasks = () => {
		axios.get('http://127.0.0.1:8000/api/tasks').then((response) => {
			this.setState({tasks: response.data});
		});
	}

	renderTasks = () => {
		return this.state.tasks.map((task) => {
			return(
			<div>
				<Task key={task.task} task={task.task} />
				<br />
			</div>
			);
		});
	}

	render() {
		return(
			<div className="taskspace">
				<div>
					{this.renderTasks()}
				</div>
			</div>
		);
	}
}

export default TaskSpace;
