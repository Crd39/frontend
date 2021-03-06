import React from 'react';
import Modal from 'react-modal';

import './css/home.css';

import { url } from './app.js';
import { PostContent, Contents } from './components/content/content.js';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            openModal: false
        };
    }
    
    handleOpenModal() {
        const newState = this.state;
        newState.openModal = true;
        this.setState(newState);
    }
    
    handleCloseModal() {
        const newState = this.state;
        newState.openModal = false;
        this.setState(newState);
    }

    handleLogOut() {
        window.localStorage['token'] = null;
        window.location.replace('/');
    }
    
    render() {
        return (
          <div>
            <button onClick={() => this.handleOpenModal()}>Post Content</button>
            <Modal isOpen={this.state.openModal} ariaHideApp={false}>
              <PostContent />
              <button onClick={() => {this.handleCloseModal()}}>
                Close
              </button>
            </Modal>
            <button onClick={() => {this.handleLogOut()}}>
                logout
            </button>
            <PublicContents />
          </div>
        );
    }
}

export class PublicContents extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            contents: null
        };
        this.FetchData();
    }
    
    FetchData() {
        fetch(url + '/contents?type=public', {
            method: 'GET',
        })
        .then((response) => (response.json()))
        .then((info) => {
            console.log(info);
            this.setState({
                contents: info
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        if(this.state.contents==null){
            return (
              <div>loading</div>
            );
        }
        else{
            return (
              <Contents data={this.state.contents} />
            );
        }
    }
}
