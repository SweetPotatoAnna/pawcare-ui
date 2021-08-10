import React, {Component} from 'react';
import { Card, List, Descriptions, Avatar, Button, message } from 'antd';
import axios from "axios";
import {TOKEN_KEY as userToken} from "../constants/constants";
import {Redirect} from "react-router-dom";
import * as urlPaths from "../constants/paths";

class MyProfile extends Component {

    constructor() {
        super();
        this.state = {
                userProfile:
                    {
                    // email: "johnsmith@e.com",
                    // firstName:"John",
                    // lastName:"Smith"
                }
            ,
            pets:
                [
                    {
                        // name: "coco",
                        // photo: "XXX",
                        // type: "XXXX",
                        // weight: "XXX",
                        // ageyear: "XXXX",
                        // agemonth: "XXXX",
                        // sex: "XXX",
                        // breed: "XXXX"
                    },
                    {
                        // name: "XXXX",
                        // photo: "XXX",
                        // type: "XXXX",
                        // weight: "XXX",
                        // ageyear: "XXXX",
                        // agemonth: "XXXX",
                        // sex: "XXX",
                        // breed: "XXXX"
                    }]
        }
    }


    componentDidMount() {
        let url = "http://base_url/getprofile";

        const optGetProfile = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${ userToken }`
            }
        };
        axios(optGetProfile)
            .then((res) => {
                if (res.status === 200) {
                    this.setState(
                        this.userProfile = res,
                    );
                }
            })
            .catch((err) => {
                message.error("Get user profile failed!");
                console.log("Get user profile failed: ", err.message);
            });

        const optGetPets = {
            method: "GET",
            url: "http://base_url/getpet",
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
        axios(optGetPets)
            .then((res) => {
                if (res.status === 200) {
                    this.setState(
                        this.pets = res,
                    );
                    if (this.state.pets[0]) {
                        this.hadPets = true;
                    }
                }
            })
            .catch((err) => {
                message.error("Get pets info failed!");
                console.log("Get pets info failed: ", err.message);
            });
    }



    render() {
        const { pets } = this.state;
        const { email, firstName, lastName } = this.state.userProfile;

        return (
            <>
                <div style={{ padding: '20px 80px 20px 80px' }}>
                    <Descriptions
                        title={<h1>My Profile</h1>}
                        column={1}
                    >
                        <Descriptions.Item label="Email Address">{ email }</Descriptions.Item>
                        <Descriptions.Item label="Full Name">{ firstName } { lastName }</Descriptions.Item>
                    </Descriptions>
                    <hr />

                    <div>
                        <h3 style={{ marginBottom: 16 }}>My Pets:</h3>
                        <List
                            // bordered
                            dataSource={pets}
                            renderItem={pet => (
                                <div>
                                    <List.Item>
                                        <Card title={pet.name} bordered={true} extra={<a href="#">Edit</a>}>
                                            <Card.Meta className="PetPhoto"
                                                       avatar={<Avatar src={pet.photo} />}
                                                       description={pet.name}
                                            />
                                            <p>{pet.type}</p>
                                            <p>{pet.weight}</p>
                                            <p>{pet.ageyear} years {pet.agemonth} months old, {pet.weight} lbs</p>
                                        </Card>
                                    </List.Item>

                                </div>
                            )}
                        />
                    </div>
                    <Button
                        href="#"
                        className="add-pet-btn"
                        size="large"
                    >Add Pet</Button>
                </div>
            </>
        );
    }
}

export default MyProfile;



