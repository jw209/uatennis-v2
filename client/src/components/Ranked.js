import React from "react";
import axios from "axios";
import {useLocation, Link, Switch, Route, Router} from "react-router-dom";
import {useParams} from "react-router";

class Ranked extends React.Component {
  
    state = {
        rank: 0,
        name: '',
        score: 0,
        wins: 0,
        losses: 0,
        wratio: 0,
        uanetid: '',
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
        </div>
        ))
    }

    render() {
        
        return(
            <div
                style={{
                    paddingLeft:"5%"
                }}
            >
                <h2>Season: <span style={{color:"green"}}>Fall 2021</span></h2>
                {this.displayPlayers(this.state.players)}
            </div>
            
        )
    }
}

export default Ranked;