import React from 'react';

class ViewSelectContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	// Called when view checkbox is changed
	handleViewChange = (e) => {
		let newView = parseInt(e.target.id);	
		if(this.props.view != newView) {
			this.props.updateView(newView);
		}
	}

	render() {
		return(
			<span className="view-select-container">
				<span className="view-container">
					<fieldset className="switch">
						<label id="0" className={this.props.view == 0 ? "checked-label" : "unchecked-label"} onClick={this.handleViewChange}>
							UNCOMPLETED
						</label>
						<label id="1" className={this.props.view == 1 ? "checked-label" : "unchecked-label"} onClick={this.handleViewChange}>
							COMPLETED
						</label>
					</fieldset>
					<div className="toggle-container">
						<span className={this.props.view == 0 ? "toggle-uncompleted" : "toggle-completed"} />
					</div>
				</span>
			</span>
		);
	}
}

export default ViewSelectContainer;
