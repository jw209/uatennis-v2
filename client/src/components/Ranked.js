import React from "react";
import axios from "axios";

class Ranked extends React.Component {
  
    state = {
        name: '',
        score: 0,
        players: []
    };
    
    componentDidMount = () => {
        this.getPlayer();
    }
    
    getPlayer = () => {
        axios.get('/api/players/players')
        .then((response) => {
            const data = response.data;
            this.setState({ players: data })
            console.log('Data has been retrieved!');
        })
        .catch(() => {
            console.log('Error retrieving data');
        })
    }
    
    displayPlayers = (players) => {
        if (!players.length) return null;
        
        players.sort(function(a, b) {
        return b.score - a.score;
        });
    
        return players.map((player, index) => (
        <div key={index}>
            <h3>{index+1})&nbsp;{player.name}</h3>
            <p>{player.score}</p>
        </div>
        ))
    }
    render() {
        return(
            <div
                style={{
                    paddingLeft:"2%"
                }}
            >
                <h1>Season: <span style={{color:"green"}}>Fall 2021</span></h1>
                {this.displayPlayers(this.state.players)}
            </div>
            
        )
    }
}

export default Ranked;