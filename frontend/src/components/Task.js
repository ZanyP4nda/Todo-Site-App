import React from 'react';

class Task extends React.Component {
	render() {
		return(
			<div className="task-container">
				<div>
					<span className="task">Take over the world</span>
				</div>
				<div className="btns-container">
					<button className="edit-btn">EDIT</button>
					<button className="delete-btn">DELETE</button>
				</div>
			</div>
		);
	}
}

export default Task;
