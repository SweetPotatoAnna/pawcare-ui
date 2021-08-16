import React, {Component} from 'react';
import {Input, Button, Table, Popconfirm, Form, message} from "antd";

import   { EditableFormRow, EditableCell }  from "./EditableCell";
import {TOKEN_KEY as userToken} from "../constants/constants";
import axios from "axios";





class FoodTracker extends Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Food name',
                dataIndex: 'name',
                width: '20%',
                editable: true,
            },
            {
                title: 'Brand',
                dataIndex: 'brand',
                width: '15%',
                editable: true
            },
            {
                title: 'ingredient1',
                dataIndex: 'ingredient1',
                editable: true
            },
            {
                title: 'Ingredient 2',
                dataIndex: 'ingredient2',
                editable: true
            },
            {
                title: 'Ingredient 3',
                dataIndex: 'ingredient3',
                editable: true
            },
            {
                title: 'Ingredient 4',
                dataIndex: 'ingredient4',
                editable: true
            },
            {
                title: 'Ingredient 5',
                dataIndex: 'ingredient5',
                editable: true
            },
            {
                title: 'Ingredient 6',
                dataIndex: 'ingredient6',
                editable: true
            },
            // {
            //     title: 'operation',
            //     dataIndex: 'operation',
            //     render: (text, record) =>
            //         this.state.dataSource.length >= 1 ? (
            //             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            //                 <a>Delete</a>
            //             </Popconfirm>
            //         ) : null,
            // },
        ];

        this.state = {
            // dataSource: [
            //     // {
            //     //     key: '0',
            //     //     name: 'Edward King 0',
            //     //     age: '32',
            //     //     address: 'London, Park Lane no. 0',
            //     // },
            //     // {
            //     //     key: '1',
            //     //     name: 'Edward King 1',
            //     //     age: '32',
            //     //     address: 'London, Park Lane no. 1',
            //     // },
            // ],
            foods: [
                {
                    name: "Amazon Brand - Wag Dry Dog Food, No Added Grains",
                    brand: "XXX",
                    ingredient1: "XXX",
                    ingredient2: "XXX",
                    ingredient3: "XXX",
                    ingredient4: "XXX",
                    ingredient5: "XXX",
                    ingredient6: "XXX6"
                }
            ],
            newFoodLine: [
                {
                    name: "aaaa",
                    brand: "XXX",
                    ingredient1: "XXX",
                    ingredient2: "XXX",
                    ingredient3: "XXX",
                    ingredient4: "XXX",
                    ingredient5: "XXX",
                    ingredient6: "XXX6"
                }
            ],
            count: 1,
            editingStatus: false
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, foods } = this.state;
        const newData = {
            name: [],
            brand: [],
            ingredient1: [],
            ingredient2: [],
            ingredient3: [],
            ingredient4: [],
            ingredient5: [],
            ingredient6: []
        };
        this.setState({
            foods: [...foods, newData],
            // count: count + 1,
        });
        console.log(count);
    };

    handleSave = row => {
        const newData = [...this.state.foods];
        // const index = newData.findIndex(item => row.key === item.key);
        const index = newData.length - 1;
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ foods: newData });
        console.log(this.state.foods);
    };

    uploadFood = () => {
        const {foods, count} = this.state;
        const optUploadFood = {
            url: "http://base_url/uploadfood",
            method: "POST",
            headers:
                {
                    name: foods.name,
                    brand: foods.brand,
                    ingredient1: foods.ingredient1,
                    ingredient2: foods.ingredient2,
                    ingredient3: foods.ingredient3,
                    ingredient4: foods.ingredient4,
                    ingredient5: foods.ingredient5,
                    ingredient6: foods.ingredient6

                }
        };
        axios(optUploadFood)
            .then((res) => {
                if (res.status === 200) {
                    message.info("Save succeeded")
                }
            })
            .catch((err) =>
                {
                    message.error("Upload to server failed!")
                });
        this.setState(
            {
                count: count + 1
            }
        )
    }


    componentDidMount() {
        const optGetFoods = {
            method: "GET",
            url: "http://base_url/getfoods",
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
        axios(optGetFoods)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        foods: res,
                        count: res.length
                    })
                }
            })
            .catch((err) => {
                message.error("Get food data failed");
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {


        const { foods } = this.state;

        const setEditingStatus = editing => {
            const { editingStatus } = this.state;
            this.setState({
                editingStatus: editing
            })
        }
        const components = {

            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        const addOrSave = () => {
            const {count, foods}=this.state;
            const { editing } = this.state.editingStatus;

            if (foods.length === count) {
                return (
                    <Button onClick={this.handleAdd} style={{marginBottom: 16}}>
                        Add food
                    </Button>
                )
            } else if (editing === true) {
                return (
                    <Button onClick={this.uploadFood} type="primary" style={{marginBottom: 16}} disabled>
                        Save
                    </Button>
                )

            } else {
                return (
                    <Button onClick={this.uploadFood} type="primary" style={{marginBottom: 16}} disabled>
                        Save
                    </Button>
                )

            }


        }

        return (
            <div className="food-tracker">
                <h1>Food Tracker</h1>
                <div className="add-food-bar">
                    <div>
                        <Input placeholder="Please input URL (function is developing)" className='add-food-bar-input-box' disabled={true}/>
                    </div>
                    <div>
                        <Button type="primary" className='add-food-bar-btn'>Confirm</Button>
                    </div>
                </div>

                <EditableCell setEditingStatus={setEditingStatus} />
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={ foods }
                    columns={columns}
                    pagination={false}
                />
                <div>{addOrSave()}</div>

            </div>
        );
    }
}

export default FoodTracker;



// function isValidHttpUrl(string) {
//     let url;
//
//     try {
//         url = new URL(string);
//     } catch (_) {
//         return false;
//     }
//
//     return url.protocol === "http:" || url.protocol === "https:";
// }


// {/*{*/}
// {/*    foods.length === count ?*/}
// {/*    <Button onClick={this.handleAdd} style={{marginBottom: 16}}>*/}
// {/*        Add food*/}
// {/*    </Button>*/}
// {/*        :*/}
// {/*        <Button onClick={this.uploadFood} type="primary" style={{marginBottom: 16}}>*/}
// {/*            Save*/}
// {/*        </Button>*/}
// {/*}*/}