import React from 'react';
import Task from 'src/components/Task.js';

const tasks = [
	{
		task: "Take over the world",
		is_completed: false
	},
	{
		task: "Become batman",
		is_completed: false
	},
	{
		task: "Task name",
		is_completed: false
	},
]

class TaskSpace extends React.Component {
	componentDidMount() {
		console.log(tasks[1].task);
	}

	renderTasks = () => {
		return tasks.map((task) => {
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
			<div class="taskspace">
				<div>
					{this.renderTasks()}
				</div>
			</div>
		);
	}
}

export default TaskSpace;
