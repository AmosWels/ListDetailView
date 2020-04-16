import React, { Component } from 'react';
// Covered in the MobX Section 
import { observer, PropTypes } from 'mobx-react';
// Covered in the MobX Section 
import _ from 'lodash';

// Relative imports
import Selection from './components/Selection';
import Profile from './components/Profile';

const propTypes = {
    store: PropTypes.object
};

// Observers can react (ba dum tss) to changes in observables
const App = observer(
class App extends Component {
    componentWillMount() {
        this.props.store.getUsers();
    }
    renderSelection(){
	if (_.isEmpty(this.props.store.selectedUser)) return null;
	return (
	    <div className='selection'>
		<Selection user={this.props.store.selectedUser}/>
		<button onClick={this.props.store.clearSelectedUser}>
                    Close Profile
                </button>
	    </div>
	);
    }
    renderProfiles(){
	return this.props.store.users.map((user) => (
	    <Profile
		selected = {user.id === this.props.store.selectedId}
                key = {user.id}
		label = {user.name}
                onClick = { () => {this.props.store.selectUser(user)} }
	     />
	));
    }
    render(){
	return (
	    <div>
		<h3>Employee Directory</h3>
		{this.renderSelection()}
		{this.renderProfiles()}
	    </div>
	);
    }
});

App.propTypes = propTypes;
export default App;