import axios from "axios";
import {Avatar, Card, List, Typography} from "antd";
import React from "react";
import * as urlPaths from "../constants/paths";

getProfile = (option) => {
    const {  userToken } = option;
    let url = "http://base_url/getprofile";

    const opt = {
        method: "GET",
        url: url,
        headers: {
            Authorization: `Bearer ${ userToken }`
        }
    };
    axios(opt)
        .then((res) => {
            if (res.status === 200) {
                this.setState(
                    this.state.userProfile = res,
                );
            }
        })
        .catch((err) => {
            window.error("Get user profile failed!");
            console.log("Get user profile failed: ", err.message);
        });
}

const getPets = (option) => {
    const {userToken} = option;
    const opt = {
        method: "GET",
        url: "http://base_url/getpet",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    axios(opt)
        .then((res) => {
            if (res.status === 200) {
                this.setState(
                    this.state.pets = res,
                );
                if (this.state.pets[0]) {
                    this.hadPets = true;
                }
            }
        })
        .catch((err) => {
            window.error("Get pets info failed!");
            console.log("Get pets info failed: ", err.message);
        });
}



{/*<List*/}
{/*    className="demo-loadmore-list"*/}
{/*    itemLayout="horizontal"*/}
{/*    dataSource={list}*/}
{/*    renderItem={item => (*/}
{/*        <List.Item*/}
{/*            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}*/}
{/*        >*/}
{/*            <Skeleton avatar title={false} loading={item.loading} active>*/}
{/*                <List.Item.Meta*/}
{/*                    avatar={*/}
{/*                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />*/}
{/*                    }*/}
{/*                    title={<a href="https://ant.design">{item.name.last}</a>}*/}
{/*                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"*/}
{/*                />*/}
{/*                <div>content</div>*/}
{/*            </Skeleton>*/}
{/*        </List.Item>*/}
{/*    )}*/}
{/*/>*/}



<div style={{padding: '20px 80px 20px 80px'}}>
    <Card title="" bordered={false}>
        <p> </p>
        <p>Card content</p>
        <p>Card content</p>
    </Card>
</div>




const showPets = () => {
    return (
        <div>                <h3 style={{ marginBottom: 16 }}>Default Size</h3>
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={pets}
                renderItem={pet => (
                    <div>
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {pet.name}
                            <Card title={pet.name} bordered={false} extra={<a href={urlPaths.ADD_PETS}>Edit</a>}>
                                <Card.Meta className="PetPhoto"
                                           avatar={<Avatar src={pet.photo} />}
                                           description={pet.name}
                                />
                                <p>{pet.type}</p>
                                <p>{pet.weight}</p>
                                <p>{pet.ageyear} year, {pet.agemonth} months old, {pet.weight} lbs</p>
                            </Card>
                        </List.Item>
                        <a href={urlPaths.ADD_PETS}>Add Pet</a>
                    </div>
                )}
            />
        </div>
    )

};