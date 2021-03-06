import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            fname: "",
            lname: "",
            email: "",
            uanetid: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newAccount = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            uanetid: this.state.uanetid,
            password: this.state.password,
            password2: this.state.password2
        };
            
        this.props.registerUser(newAccount, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return(
            <div
                style={{
                    paddingLeft:"2%",
                    paddingRight:"2%"
                }}
            >
                <h1>Already have an account?<a href="/login"> Login</a></h1>
                <div className="row">
                    <form className="col s12" noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="fname" type="text" className="validate white"
                            onChange={this.onChange}
                            value={this.state.fname}
                            error={errors.fname}
                            className={classnames("", {
                                invalid: errors.fname
                            })}
                        />
                        <span className="red-text">{errors.fname}</span>
                        <label htmlFor="fname">First Name</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="lname" type="text" className="validate"
                            onChange={this.onChange}
                            value={this.state.lname}
                            error={errors.lname}
                            className={classnames("", {
                                invalid: errors.lname
                            })}
                        />
                        <span className="red-text">{errors.lname}</span>
                        <label htmlFor="lname">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="password" type="password" className="validate"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            className={classnames("", {
                                invalid: errors.password
                            })}
                        />
                        <span className="red-text">{errors.password}</span>
                        <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="password2" type="password" className="validate"
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                        />
                        <span className="red-text">{errors.password2}</span>
                        <label htmlFor="password2">Verify Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="email" type="email" className="validate"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            className={classnames("", {
                                invalid: errors.email
                            })}/>
                        <span className="red-text">{errors.email}</span>
                        <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="uanetid" type="text" className="validate"
                            onChange={this.onChange}
                            value={this.state.uanetid}
                            error={errors.uanetid}
                            className={classnames("", {
                                invalid: errors.uanetid
                            })}/>
                        <span className="red-text">{errors.uanetid}</span>
                        <label htmlFor="uanetid">UA Net ID</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
) (withRouter(Register));