import React from 'react';
import 'src/App.css';

import TaskSpace from 'src/components/TaskSpace.js';
import ViewSelectContainer from 'src/components/ViewSelectContainer.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 0
		};
	}

	// Passed to children to update this.state.view
	updateView = (newView) => {
		this.setState({view: newView});
	}

	render() { 
		return(
			<div>
				<ViewSelectContainer view={this.state.view} updateView={this.updateView.bind(this)} />
				<div className="taskspace-container">
					<TaskSpace view={this.state.view} />
				</div>
			</div>
		);
	}
}

export default App;
