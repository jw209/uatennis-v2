import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MatchEntry extends React.Component {
    state = {
        isSubmitted: '',
        // data to be saved
        userfname: '',
        userlname: '',
        oppfname: '',
        opplname: '',
        set1you: '',
        set1opp: '',
        set2you: '',
        set2opp: '',
        set3you: '',
        set3opp: '',
        date: ''
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
      
      onSubmit = (event) => {
        event.preventDefault();

        const { user } = this.props.auth;
    
        const payload = {
            userfname: user.fname,
            userlname: user.lname,
            oppfname: this.state.oppfname,
            opplname: this.state.opplname,
            set1you: this.state.set1you,
            set1opp: this.state.set1opp,
            set2you: this.state.set2you,
            set2opp: this.state.set2opp,
            set3you: this.state.set3you,
            set3opp: this.state.set3opp,
            date: this.date
        }
    
        axios({
            url: '/api/games/saveGame',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(payload)
          })
          .then(() => {
            console.log('Data has been sent');
            this.resetUserInputs();
            this.setState({
              isSubmitted: 'Game is now under review'
            })
          })
          .catch(() => {
            console.log('Internal server error');
          })
      }
    
      resetUserInputs = () => {
        this.setState({
            // data to be saved
            oppfname: '',
            opplname: '',
            set1you: '',
            set1opp: '',
            set2you: '',
            set2opp: '',
            set3you: '',
            set3opp: '',
            date: ''
        })
      }
    
      displayStatus = (isSubmitted) => {
        if (isSubmitted === '') return null;
    
        return <h3 style={{marginLeft:"5%", color:"green"}}>{this.state.isSubmitted}</h3>
      }

    render() {
        return (
            <div style={{paddingLeft:"4%", paddingRight:"4%"}}>
                <h2>Submit competitive matches here (played at a club meeting)</h2>
                <h5>Please use N/A for unplayed sets. Must submit at least 1 set for review.</h5>
                <div className="row">
                    <form className="col s12" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="oppfname" name="oppfname" type="text" className="validate"
                            value={this.state.oppfname} onChange={this.handleChange}/>
                        <label htmlFor="oppfname">Opponents first name</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="opplname" name="opplname" type="text" className="validate"
                            value={this.state.opplname} onChange={this.handleChange}/>
                        <label htmlFor="opplname">Opponents last name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="set1you" name="set1you" type="text" className="validate"
                            value={this.state.set1you} onChange={this.handleChange}/>
                        <label htmlFor="set1you">Set 1: your score</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="set1opp" name="set1opp" type="text" className="validate"
                            value={this.state.set1opp} onChange={this.handleChange}/>
                        <label htmlFor="set1opp">Set 1: opponents score</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="set2you" name="set2you" type="text" className="validate"
                            value={this.state.set2you} onChange={this.handleChange}/>
                        <label htmlFor="set2you">Set 2: your score</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="set2opp" name="set2opp" type="text" className="validate"
                            value={this.state.set2opp} onChange={this.handleChange}/>
                        <label htmlFor="set2opp">Set 2: opponents score</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="set3you" name="set3you" type="text" className="validate"
                            value={this.state.set3you} onChange={this.handleChange}/>
                        <label htmlFor="set3you">Set 3: your score</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="set3opp" name="set3opp" type="text" className="validate"
                            value={this.state.set3opp} onChange={this.handleChange}/>
                        <label htmlFor="set3opp">Set 3: opponents score</label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-outline-secondary" value="Submit for review"
                      style={{
                        position:"absolute"
                      }}
                    />
                    </form>
                </div>
                <div>{this.displayStatus(this.state.isSubmitted)}</div>
                <br/><br/>
                <p style={{color:"red"}}><Link to="/chat">Return to dashboard</Link></p>
            </div>
        )
    }

}

MatchEntry.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
) (MatchEntry);