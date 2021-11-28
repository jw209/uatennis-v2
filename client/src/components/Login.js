import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }

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

        const accountData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(accountData);
    };

    render() {
        const { errors } = this.state;

        return(
            <div
                style={{
                    paddingLeft:"2%"
                }}
            >
                <h1>New member? <a href="/register">Sign up</a></h1>
                <div class="row" noValidate onSubmit={this.onSubmit}>
                    <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="email" type="email" style={{color: "white"}} class="validate"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                        />
                        <span className="red-text">{errors.email}{errors.emailnotfound}</span>
                        <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="password" type="password" style={{color: "white"}} class="validate"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            className={classnames("", {
                                invalid: errors.password || errors.incorrectpassword
                            })}
                        />
                        <span className="red-text">{errors.password}{errors.incorrectpassword}</span>
                        <label for="password">Password</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
                    </form>
                </div>
            </div>
            
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
) (Login);