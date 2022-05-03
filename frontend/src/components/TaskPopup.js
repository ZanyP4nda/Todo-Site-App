import Popup from 'reactjs-popup';
import React from 'react';

class TaskPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: "",
			inputCSSClass: "edit-input"
		}
	}

	// Called when popup is opened
	onOpenPopup = () => {
		this.setState({task: this.props.task});
		this.setState({inputCSSClass: "edit-input"});
	}

	// Called when popup is closed
	closePopup = () => {
		//Call Task's function
		this.props.onClose();
	}

	// Called when form is submitted
	handleSubmit = (e) => {
		e.preventDefault();
		if(this.checkInput(this.state.task)) {
			this.props.updateTask(this.state.task);
			this.closePopup();
		} else {
			// Change input CSS to error
			this.setState({inputCSSClass: "edit-input--error"});
		}
	}

	// Called when input is changed
	handleInputChange = (e) => {
		this.setState({task: e.target.value});
	}

	// Checks input
	checkInput = (input) => {
		// Regex expression that checks if there is a character that is not whitespace
		if(!/\S/.test(input)) {
			return false;
		}
		return true;
	}

	render() {
		return(
			<Popup open={this.props.isOpen} closeOnDocumentClick onOpen={this.onOpenPopup} onClose={this.closePopup} className="task-popup">
				<div className="task-popup-title">
					<label>{this.props.title}</label>
				</div>
				<div className="task-popup-content-container">
					<form onSubmit={this.handleSubmit}>
						<div className="task-popup-form-container">
							<input type="text" className={this.state.inputCSSClass} placeholder="Task name" value={this.state.task} onChange={this.handleInputChange} />
							<button className="done-btn" type="submit">DONE</button>
							<button className="cancel-btn" type="submit" onClick={this.closePopup}>CANCEL</button>
						</div>
					</form>
				</div>
			</Popup>
		);
	}
}

export default TaskPopup;
