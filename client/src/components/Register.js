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
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                <h1>Register page</h1><br/>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">First Name</span>
                    <input type="text" class="form-control" placeholder="" aria-label="fname" aria-describedby="basic-addon1" id="fname"
                        onChange={this.onChange}
                        value={this.state.fname}
                        error={errors.fname}
                        className={classnames("", {
                            invalid: errors.fname
                        })}
                    />
                    <span className="red-text">{errors.fname}</span>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Last Name</span>
                    <input type="text" class="form-control" placeholder="" aria-label="lname" aria-describedby="basic-addon1" id="lname"
                        onChange={this.onChange}
                        value={this.state.lname}
                        error={errors.lname}
                    />
                    <span className="red-text">{errors.lname}</span>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                    <input type="email" class="form-control" placeholder="" aria-label="email" aria-describedby="basic-addon1" id="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        className={classnames("", {
                            invalid: errors.email
                        })}
                    />
                    <span className="red-text">{errors.email}</span>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">UA Net ID</span>
                    <input type="text" class="form-control" placeholder="" aria-label="uanetid" aria-describedby="basic-addon1" id="uanetid"
                        onChange={this.onChange}
                        value={this.state.uanetid}
                        error={errors.uanetid}
                        className={classnames("", {
                            invalid: errors.uanetid
                        })}
                    />
                    <span className="red-text">{errors.uanetid}</span>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                    <input type="password" class="form-control" placeholder="" aria-label="password" aria-describedby="basic-addon1" id="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        className={classnames("", {
                            invalid: errors.password
                        })}
                    />
                    <span className="red-text">{errors.password}</span>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Verify password</span>
                    <input type="password" class="form-control" placeholder="" aria-label="password2" aria-describedby="basic-addon1" id="password2"
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        className={classnames("", {
                            invalid: errors.password2
                        })}
                    />
                    <span className="red-text">{errors.password2}</span>
                </div>
                <input type="submit" class="btn btn-outline-light" value="Register"/>
                </form>
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