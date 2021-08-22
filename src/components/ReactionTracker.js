import React, { Component } from 'react';

class ReactionTracker extends Component {
    constructor() {
        super();
        this.state = {
            foodNames: [],
            reactionNames: [],
            newRaction: {
                reaction_date:"",
                food_name: "",
                reaction_name:[]            
            },
            reactions: []
        }
    }
    componentDidMount() {
        // send request to get food names and reaction names
        // send request to get reactions to generate table
    }

    render() {
        return (
            // use state.foodNames and state.reactionNames generate selectors
            // when user select selector(time, food, reactions), update state newReaction
            // when user click save, send request to upload state.newReaction and, and send another request to get state.reactions
        );
    }
}

export default ReactionTracker;