import {DatePicker, Select, Button, Table} from 'antd';
import React, {Component} from 'react';
import {BASE_URL} from '../constants/constants';
const {Option} = Select;
import axios from "axios";
import {TOKEN_KEY as userToken} from "../constants/constants";
import {Redirect} from "react-router-dom";

class ReactionTracker extends Component {

    constructor() {
        super();
        this.state = {
            reaction:
                [
                    {
                        // reaction_name: XXX
                        // reaction_description：XXX


                    },
                    {
                        // reaction_name: XXX
                        // reaction_description：XXX
                    }]
            ,
            breed:
                [
                    {
                        // animal_specie: XXX
                        // breed_name: XXX

                    },
                    {
                        // animal_specie: XXX
                        // breed_name: XXX


                    }]
            ,
            petreaction:
                [
                    {
                        // reaction_date: XXX,
                        // reaction_name: XXX,
                        // food_name: XXX


                    },
                    {
                        // reaction_date: XXX,
                        // reaction_name: XXX,
                        // food_name: XXX

                    },
                    {
                        // reaction_date: XXX,
                        // reaction_name: XXX,
                        // food_name: XXX

                    }]
            ,


        }
    }

    componentDidMount() {
        let url = "http://base_url/getreactions";

        const optGetRecation = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${ userToken }`
            }
        };
        axios(optGetRecation)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        reaction: res
                    })
                }
            })
            .catch((err) => {
                message.error("Get reaction failed!");
                // console.log("Get user reaction failed: ", err.message);
            });

        const optGetBreeds = {
            method: "GET",
            url: "http://base_url/getbreeds",
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
        axios(optGetBreeds)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        breed: res,
                    })
                }
            })
            .catch((err) => {
                message.error("Get breeds info failed!");
                // console.log("Get breeds info failed: ", err.message);
            });

        const optGetPetReatction ={
            method: "GET",
            url: "http://base_url/getpetreactions",
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
        axios(optGetBreeds)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        breed: res,
                    })
                }
            })
            .catch((err) => {
                message.error("Get getpetreactions info failed!");
                // console.log("Get getpetreactions info failed: ", err.message);
            });
    }

    render() {
        //should exist some const here


        function onChange(value, dateString) {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
        }

        function onOk(value) {
            console.log('onOk: ', value);
        }

        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onBlur() {
            console.log('blur');
        }

        function onFocus() {
            console.log('focus');
        }

        function onSearch(val) {
            console.log('search:', val);
        }

        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                width: 300,
            },
            {
                title: 'Food Name',
                dataIndex: 'food_name',
                width: 300,
            },
            {
                title: 'Reactions',
                dataIndex: 'reactions',
            },
        ];

        //reaction tracker
        //Time selection
        //Select food    ||   Select Coco's reaction ||  search button
        //reasult table
        //   Date        ||       Food Name          ||   Reactions

        return (
            <div className="reaction-Tracker">
                <h1>Reaction Tracker</h1>
                <br/>

                <DatePicker showTime placeholder="Select Time" onChange={onChange} onOk={onOk}
                            className="time-selection"/>
                <br/>
                <br/>
                <br/>
                <div className="pick-selection">
                    <Select className="pick-food"
                            showSearch
                            style={{width: 200}}
                            placeholder="Pick a food"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>

                    </Select>

                    <Select className="pick-coco"
                            showSearch
                            style={{width: 300}}
                            placeholder="Pick Coco's reaction to selected food"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>

                    </Select>,
                    <Button type="primary" shape="circle" icon="search" className="Search-button"/>
                </div>
                <br/>
                <br/>
                <br/>
                <Table columns={columns} dataSource={data} pagination={{pageSize: 20}} scroll={{y: 300}}
                       className="result-table"/>,
            </div>
        );
    }
}

export default ReactionTracker;