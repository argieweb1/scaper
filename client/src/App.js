import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';
import Scraped from './components/Scraped';
import Saved from './components/Saved';
import CommentPage from './components/Comment-Page';
import Article from './components/Article';


class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    scraped : [],
    archived: null,
    saved: null,
    comments: null,
    isLoading : false
    }
  }


  //Method for scraping new articles
  handleClick = () => {
    this.setState({ isLoading: true });
    fetch('/api/scrape')
      .then(res => res.json())
      .then(data => {
        this.setState({ scraped: data, isLoading: false });
      })
      .catch(e => {
        console.log('there was an error ' + e);
        this.setState({ isLoading: false });
      });
  };

  //Method for retrieving saved articles from DB
  getSaved = () => {
    this.setState({isLoading: true})
    fetch('/api/saved-articles')
    .then(res => res.json())
    .then(data => this.setState({saved: data, isLoading: false}))
    //.then(data => console.log(data))
    .catch(e => console.log('there was an error ' + e))
  };

  //Method For Saving Articles to DB
  saveNew = (e) => {
    var i = e.target.id
    var options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(this.state.scraped[i])
    };

    fetch('/api/save', options)
    .then(res => res.json())
    //.then(data => console.log(data))
    .catch(e => console.log('there was an error ' + e))
  };

  //Delete All Saved Articles
  clearAll = () => {
    fetch('/api/clear')
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(() => this.setState({scraped: []}))
    .catch(e => console.log('there was an error ' + e))
  };

  //Delete Individual Saved Article
  deleteOne = (id) => {
    fetch(`/api/delete-one${id}`)
    .then(res => res.json())
    .then(() => this.getSaved())
    .catch(e => console.log('there was an error ' + e))
  };

  //Adds new comment
  newComment = (id, data) => {
    var options = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(data)
    };

    fetch(`/api/comments${id}`, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .then(() => this.getComments(id))
    .catch(e => console.log('there was an error ' + e))
  };

  //Gets comments from DB
  getComments = (id) => {
    fetch(`/api/comments${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({comments: data})
    })
    .catch(e => console.log('there was an error ' + e))
  };


  render()  {
    return(
    <div className="container-fluid">
      <Router>
      <Header getSaved={this.getSaved} 
              clearAll={this.clearAll}
              scrape={this.handleClick}/>
      
        <Switch>
          <Route path='/saved' exact render={(props) => <Saved {...props} 
                                                               state={this.state.saved} 
                                                               deleteOne={this.deleteOne}
                                                               getComments={this.getComments}/>}/>
          
          <Route exact path='/' render={(props) => <Scraped {...props} 
                                                            state={this.state.scraped} 
                                                            saveNew={this.saveNew}/> }/>
          
          <Route exact path='/comments' render={(props) => <CommentPage {...props} 
                                                                        newComment={this.newComment}
                                                                        state={this.state.comments} />}/>
        </Switch>
      </Router>

      {((this.state.isLoading) === true ? <Loading /> : <br/> )}   

    </div>
    )
  };
}

export default App;
