import React, { Component } from 'react';
import axios from "axios";
import { Button, DatePicker, Select, message } from 'antd';

import {BASE_URL, TOKEN_KEY} from "../constants/constants";

const { Option } = Select;

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
            method: "post",
            url: `${BASE_URL}/uploadpetreaction`,
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
                        reactions: prevState.reactions.length === 0 ? [prevState.newRaction] : [...prevState.reactions, prevState.newRaction],
                        newRaction: {
                            reaction_date:"",
                            food_name: "",
                            reaction_name:[]            
                        }
                    }))
                }
            }
        ).catch(() => {
            message.error("Failed to save, please try again!")
        })
    };

    componentDidMount() {
        // send request to get food names and reaction names
        this.fetchFoodReactionNames();
        // send request to get reactions to generate table
        this.fetchReactions();
    }

    handleSelectedDateChange = (_, dateString) => {
        this.setState((prevState, _) => ({
            newRaction: {
                ...prevState.newRaction,
                reaction_date: dateString         
            }
        }))
    }

    handleSelectedFoodChange = value => {
        this.setState((prevState, _) => ({
            newRaction: {
                ...prevState.newRaction,
                food_name: value         
            }
        }))
    }

    handleSelectedReactionChange = value => {
        this.setState((prevState, _) => ({
            newRaction: {
                ...prevState.newRaction,
                reaction_name: value         
            }
        }))
    }

    handleSaveReactionClick = () => {
        this.uploadReaction();
    }

    render() {
        const { foodNames, reactionNames } = this.state;
        return (
            // use state.foodNames and state.reactionNames generate selectors
            // when user select selector(time, food, reactions), update state newReaction
            // when user click save, send request to upload state.newReaction and, and send another request to get state.reactions
            <div>
                <DatePicker onChange={this.handleSelectedDateChange} />
                <Select 
                    placeholder="Select a food" 
                    style={{ width: 120 }} 
                    onChange={this.handleSelectedFoodChange}
                >
                    {
                        foodNames.map(food => 
                            <Option key={food.name} value={food.name}>
                                {food.name}
                            </Option>
                        )
                    }
                </Select>
                <Select mode="multiple"
                    placeholder="Select a reaction" 
                    style={{ width: 120 }} 
                    onChange={this.handleSelectedReactionChange}
                >
                    {
                        reactionNames.map(reaction => 
                            <Option key={reaction.reaction_name} value={reaction.reaction_name}>
                                {reaction.reaction_name}
                            </Option>
                        )
                    }
                </Select>
                <Button type="primary" onClick={this.handleSaveReactionClick}>Save</Button>
            </div>
        );
    }
}

export default ReactionTracker;