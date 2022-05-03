import Popup from 'reactjs-popup';
import React from 'react';

class ConfirmPopup extends React.Component {
	constructor(props) {
		super(props);
	}

	// Called when popup is closed
	closePopup = () => {
		//Call Task's function
		this.props.onClose();
	}

	// Called when either option is clicked
	handleOptionClick = (e) => {
		if(parseInt(e.target.id) == 1) {
			this.props.confirmPopupOutput(true);
		} else {
			this.props.confirmPopupOutput(false);
		}
		this.closePopup();
	}	

	render() {
		return(
			<Popup open={this.props.isOpen} closeonDocumentClick onClose={this.closePopup} className="confirm-popup">
				<div className="confirm-popup-content-container">
					<h2 className="confirm-popup-message">Clear all tasks?</h2>
					<div className="confirm-popup-btn-container">
						<button id="1" className="confirm-popup-yes-btn" onClick={this.handleOptionClick}>YES</button>
						<button id="0" className="confirm-popup-no-btn" onClick={this.handleOptionClick}>NO</button>
					</div>
				</div>
			</Popup>
		);
	}
}

export default ConfirmPopup;
