import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class QueryMatch extends React.Component {

    render() {
        return (
            <div>
                <h1>Match query page locked</h1>
            </div>
        )
    }

}

QueryMatch.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
) (QueryMatch);