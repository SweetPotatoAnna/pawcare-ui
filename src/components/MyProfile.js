import React, {Component} from 'react';
import { Card, List, Descriptions, Avatar } from 'antd';
import axios from "axios";
import AddPet from "./AddPet";

import {BASE_URL, TOKEN_KEY} from "../constants/constants";
import Spinner from '../commons/Spinner';
import EditPet from "./EditPet"

class MyProfile extends Component {

    constructor() {
        super();
        this.state = {
            userProfile: {},
            pets: [],
            isLoading: true
        }
    }

    fetchProfile = () => {
        const optGetProfile = {
            method: "GET",
            url: `${BASE_URL}/getprofile`,
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem(TOKEN_KEY) }`
            }
        };
        axios(optGetProfile)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    this.setState({
                        userProfile: res.data
                    })
                }
            })
    };

    fetchPets = () => {
        const optGetPets = {
            method: "GET",
            url: `${BASE_URL}/getpets`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        }

        axios(optGetPets)
            .then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    this.setState({
                        pets: res.data ? res.data : [],
                    })
                    if (this.state.pets[0]) {
                        this.hadPets = true;
                    }
                }
            })
    };

    handleRerender = () => {
        setTimeout(() => {
                this.fetchPets();
                this.forceUpdate();
            },
            250
        )
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.fetchProfile();
        this.fetchPets();
        this.setState({ isLoading: false });
    }

    render() {
        const { pets, userProfile, isLoading } = this.state;
        return isLoading
            ?
            <Spinner />
            :
            (<>
                <div>
                    <h1 className='myProfile-title page-title'>My Profile</h1>
                    <Descriptions
                        column={1}
                    >
                        <Descriptions.Item label="Email Address">{ userProfile.email }</Descriptions.Item>
                        <Descriptions.Item label="Full Name">{ userProfile.firstname } { userProfile.lastname }</Descriptions.Item>
                    </Descriptions>
                    <hr />

                    <div>
                        <h3 style={{ marginBottom: 16 }}>My Pets:</h3>
                        <List
                            // bordered
                            grid={{ gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 4,
                                lg: 4,
                                xl: 6,
                                xxl: 3, }}
                            dataSource={pets}
                            renderItem={pet => (
                                <div>
                                    <List.Item>
                                        <Card title={pet.name} bordered={true} extra={<EditPet fetchPets={this.fetchPets} pet={pet} handleRerender={this.handleRerender}/>}>
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
                    <AddPet fetchPets={this.fetchPets}/>
                </div>
            </>)
            ;
    }
}

export default MyProfile;



