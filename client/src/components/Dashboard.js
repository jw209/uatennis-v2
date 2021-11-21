import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Dashboard extends Component {
    state = {
        fname: '',
        comment: '',
        commentCollection: [],
        date: ''
    }
      
    componentDidMount = () => {
        this.getComment();
    }
    
    getComment = () => {
        axios.get('api/comments/comments')
          .then((response) => {
            const data = response.data;
            this.setState({ commentCollection: data })
            console.log('Data has been retrieved!');
          })
          .catch(() => {
            console.log('Error retrieving data');
          })
      }
    
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const date = new Date();
    
        this.setState({ date })
    
        this.setState({
          [name]: value
        });
      }
    
    submit = (event) => {
        event.preventDefault();

        const { user } = this.props.auth;
    
        const payload = {
          fname: user.fname,
          comment: this.state.comment,
          date: this.state.date
        }
    
        axios({
          url: '/api/comments/saveComment',
          method: 'POST',
          data: payload
        })
          .then(() => {
            console.log('Data has been sent');
            this.getComment();
            this.resetUserInputs();
          })
          .catch(() => {
            console.log('Internal server error');
          })
    }
    
    displayComments = (commentCollection) => {
        if (!commentCollection.length) return null;
    
        return commentCollection.map((comments, index) => (
          <div key={index}>
            <h5>{comments.fname}&nbsp;<span style={{color:"green"}}>[{comments.date}]</span></h5>
            <p>{comments.comment}</p>
          </div>
        ))
    }
    
    resetUserInputs = () => {
        this.setState({
          fname: '',
          lname: '',
          comment: '',
          date: ''
        })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
      const { user } = this.props.auth;
    return (
        <div>
          <div 
            style={{
              position:"absolute",
              paddingLeft:"2%",
              paddingTop:"2%",
              width:"500px",
              height:"200px"
            }}
          >
            <h1 className="greeting">Welcome, {user.fname.split(" ")[0]}</h1>
            <button type="button" class="btn btn-outline-secondary" onClick={this.onLogoutClick}
              style={{
                position:"absolute"
              }}
            >
              Logout
            </button>
          </div>
          <div className="comment-section">
              {this.displayComments(this.state.commentCollection)}
          </div>
          <div
            style={{
              position:"absolute",
              top:"700px",
              paddingLeft:"1%"
          }}>
            <div class="row">
              <form class="col s12" onSubmit={this.submit} noValidate>
                <div class="row">
                  <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea" style={{ color:"white" }} maxLength="100" name="comment" value={this.state.comment} onChange={this.handleChange}></textarea>
                    <label for="textarea1">Chat with other members</label><br/>
                    <input type="submit" class="btn btn-outline-secondary" value="send"
                      style={{
                        position:"absolute"
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        );
    }
}
    
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);