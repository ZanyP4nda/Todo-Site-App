import Popup from 'reactjs-popup';
import React from 'react';

class TaskEditPopup extends React.Component {
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

	// Called when done button is clicked
	handleDoneBtnClick = (e) => {
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
			<Popup open={this.props.isOpen} closeonDocumentClick onOpen={this.onOpenPopup} onClose={this.closePopup}>
				<div className="popup-content-container">
					<span>
						<input type="text" className={this.state.inputCSSClass} placeholder="Enter your task" value={this.state.task} onChange={this.handleInputChange} />
						<button className="done-btn" onClick={this.handleDoneBtnClick}>DONE</button>
					</span>
				</div>
			</Popup>
		);
	}
}

export default TaskEditPopup;
