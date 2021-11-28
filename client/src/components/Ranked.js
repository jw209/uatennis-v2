import React from "react";
import axios from "axios";

class Ranked extends React.Component {
  
    state = {
        rank: 0,
        name: '',
        wins: 0,
        losses: 0,
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
        
        //not sure what this does
        players.sort(function(a, b) {
        return b.rank - a.rank;
        });
    
        return players.map((player, index) => (
        <div key={index}>
            <h3>{index+1})&nbsp;{player.name}</h3>
            <p>{player.rank}</p>
            <p>{player.wins}</p>
            <p>{player.losses}</p>
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
                <h2>Season: <span style={{color:"green"}}>Fall 2021</span></h2>
                {this.displayPlayers(this.state.players)}
            </div>
            
        )
    }
}

export default Ranked;