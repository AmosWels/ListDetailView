import React, { Component } from 'react';
// Covered in the MobX Section 
import { observer, PropTypes } from 'mobx-react';
// Covered in the MobX Section 
import _ from 'lodash';

// Relative imports
import Selection from './components/Selection';
import Profile from './components/Profile';
import store from './models/UserStore'

const propTypes = {
    store: PropTypes.object
};

// Observers can react (ba dum tss) to changes in observables
const App = observer(
class App extends Component {
	componentWillMount() {
		console.log("this.props", this.props)
		store.getUsers();
		// this.props.store.getUsers();
    }
    renderSelection(){
	if (_.isEmpty(store.selectedUser)) return (<><div className='selection'>Select a specific User</div> <br/></>);
	return (
	    <div className='selection'>
		<Selection user={store.selectedUser}/>
		{/* <Selection user={this.props.store.selectedUser}/> */}
		<button onClick={store.clearSelectedUser}>
		{/* <button onClick={this.props.store.clearSelectedUser}> */}
                    Close Profile
                </button>
	    </div>
	);
    }
    renderProfiles(){
	return store.users.map((user) => (
	// return this.props.store.users.map((user) => (
	    <Profile
		selected = {user.id === store.selectedId}
                key = {user.id}
		label = {user.name}
                onClick = { () => {store.selectUser(user)} }
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