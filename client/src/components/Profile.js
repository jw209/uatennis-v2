import React from "react";
import axios from "axios";

class Profile extends React.Component {
  
    state = {
        name: String,
        title: String,
        bio: String,
        Profiles: []
    }
    
    componentDidMount = () => {
        this.getProfile();
    }
    
    getProfile = () => {
        axios.get('/api/profiles/profiles')
        .then((response) => {
            const data = response.data;
            this.setState({ profileInfo: data })
            console.log('Data has been retrieved!');
        })
        .catch(() => {
            console.log('Error retrieving data');
        })
        axios.get('/api/playerstats/playerstats')
        .then((response) => {
            const data = response.data;
            this.setState({ profileStats: data })
            console.log('Data has been retrieved!');
        })
        .catch(() => {
            console.log('Error retrieving data');
        })
    }
    
    displayProfile = (profileInfo, profileStats) => {
        if (!profileInfo.length) return null;

    }
    render() {
        return(
            <div
                style={{
                    paddingLeft:"2%"
                }}
            >
                
            </div>
            
        )
    }
}

export default Ranked;