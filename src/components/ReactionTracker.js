import {DatePicker, Select, Button, Table} from 'antd';
import React from "react";
import {BASE_URL} from '../constants/constants';
const {Option} = Select;


function ReactionTracker(props) {

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
    //demo
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            key: i,
            date: `${i}`,
            food_name: 32,
            reactions: `This is a demo ${i}`,
        });
    }

    //reaction tracker
    //Time selection
    //Select food    ||   Select Coco's reaction ||  search button
    //reasult table
    //   Date        ||       Food Name          ||   Reactions

    return (
        <div className="reaction-Tracker">
            <h1>Reaction Tracker</h1>
            <br/>

            <DatePicker showTime placeholder="Select Time" onChange={onChange} onOk={onOk} className="time-selection"/>
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

export default ReactionTracker;