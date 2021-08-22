import { message } from 'antd';
import React, { Component } from 'react';
import axios from "axios";

import {BASE_URL, TOKEN_KEY} from "../constants/constants";

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

    fetchFoodReactionNames = () => {
        const optFoodNames = {
            method: "get",
            url: `${BASE_URL}/getfoods`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        axios(optFoodNames).then(
            res => {
                if (res.status === 200) {
                    this.setState({ foodNames: res.data})
                }
            }
        )
        const optReactionNames = {
            method: "get",
            url: `${BASE_URL}/getreactions`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        axios(optReactionNames).then(
            res => {
                if (res.status === 200) {
                    this.setState({ reactionNames: res.data})
                }
            }
        )
    };

    fetchReactions = () => {
        const optReactionNames = {
            method: "get",
            url: `${BASE_URL}/getpetreactions`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        axios(optReactionNames).then(
            res => {
                if (res.status === 200) {
                    this.setState({ reactions: res.data })
                }
            }
        )
    };

    uploadReaction = () => {
        const opt = {
            method: "get",
            url: `${BASE_URL}/uploadfood`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                'content-type': 'application/json'
            },
            data: this.state.newRaction
        };
        axios(opt).then(
            res => {
                if (res.status === 200) {
                    message.success('Upload new reaction successfully!')
                    // send another request to get state.reactions
                    // or update state.reactions
                    this.setState((prevState, _) => ({ // update state.reactions
                        reactions: [...prevState.reactions, prevState.newRaction],
                        newRaction: {
                            reaction_date:"",
                            food_name: "",
                            reaction_name:[]            
                        }
                    }))
                }
            }
        ).catch(err => {

        })
    };

    componentDidMount() {
        // send request to get food names and reaction names
        this.fetchFoodReactionNames();
        // send request to get reactions to generate table
        this.fetchReactions();
    }

    render() {
        return (
            // use state.foodNames and state.reactionNames generate selectors
            // when user select selector(time, food, reactions), update state newReaction
            // when user click save, send request to upload state.newReaction and, and send another request to get state.reactions
            <div>
                reations
            </div>
        );
    }
}

export default ReactionTracker;