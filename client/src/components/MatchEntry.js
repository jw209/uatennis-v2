import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class MatchEntry extends React.Component {

    render() {
        return (
            <div>
                <h1>Match query page unlocked</h1>
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