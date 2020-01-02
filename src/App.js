import React from 'react';
import './App.css';
import BookList from './components/booklist';
import BookCreate from './components/book_create';
import Header from './components/header';
import BookSearch from './components/book_search'

class App extends React.Component {
  constructor(props){
    super(props)
    this.createProfile = this.createProfile.bind(this);
  }

  state = {
    modal : false,
    createModal : true
  }

  createProfile() {
    this.setState({
      createModal : true
    })
  }

  componentWillReceiveProps(props) {
    console.log("props", props)
  }

  render () {
    return (
      <div className="App">
        <Header />
        <div style={{padding: "0px 20px"}}>
          <button className="create-btn" onClick={this.createProfile}>Add Book</button>
          <div className="app-devider">
            <BookSearch />             
            <div className="second-block">
            <BookList />
            </div>
          </div>
          <BookCreate createModal={this.state.createModal} />
        </div>
      </div>
    );
  }
}

export default App;
