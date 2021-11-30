import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import Clock from "./Clock";

class Chat extends Component {
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

        commentCollection.sort(function(a, b) {
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
    
          return 0;
        });
    
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
              paddingLeft:"5%",
              paddingTop:"2%",
              width:"600px",
              height:"200px",
              whiteSpace:"nowrap"
            }}
          >
            <h2 className="greeting"
              style={{
              position: "absolute",
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
            >
               Welcome, {user.fname.split(" ")[0]}&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"green"}}><Clock /></span>
            </h2>
          </div>
          <div className="comment-section">
              {this.displayComments(this.state.commentCollection)}
          </div>
          <div
            style={{
              position:"absolute",
              top:"70%",
              paddingLeft:"4%"
          }}>
            <div className="row">
              <form className="col s12" onSubmit={this.submit} noValidate>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea" maxLength="100" name="comment" value={this.state.comment} onChange={this.handleChange}></textarea>
                    <label htmlFor="textarea1">Chat with other members</label><br/>
                    <input type="submit" className="btn btn-outline-secondary" value="send"
                      style={{
                        position:"absolute"
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <p style={{paddingLeft:"5%", overflow:"auto", float:"left", whiteSpace:"nowrap", display:"inline-block"}}><Link style={{hover:"white"}} to="/matchentry">Submit match </Link>&nbsp;&nbsp;&nbsp;<Link style={{color:"red"}} onClick={this.onLogoutClick} to="/#">Logout</Link></p>
          </div>
        </div>
        );
    }
}
    
Chat.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Chat);