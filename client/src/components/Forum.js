import axios from "axios";
import React from "react";

class Forum extends React.Component {

    state = {
      fname: '',
      lname: '',
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
  
      const payload = {
        fname: this.state.fname,
        lname: this.state.lname,
        comment: this.state.comment,
        date: this.state.date
      }
  
      axios({
        url: '/api/saveComment',
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
          <h3>{comments.fname}&nbsp;{comments.lname}&nbsp;<span style={{color:"green"}}>[{comments.date}]</span></h3>
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
  
    render() {
  
      console.log('State: ', this.state);
      return (
        <div className="signup">
            <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            </form>
            <div>
                {this.displayComments(this.state.commentCollection)}
            </div>
        </div>  
      );
    }
}

export default Forum;