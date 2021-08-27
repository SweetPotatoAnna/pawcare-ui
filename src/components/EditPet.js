import React, {Component, forwardRef} from 'react';
import { Form, Input, InputNumber, Modal, Button, Radio, Upload, message, Popconfirm, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import dogIcon from '../assets/images/dog_icon.png';
import catIcon from '../assets/images/cat_icon.png';
import { BASE_URL, TOKEN_KEY } from '../constants/constants';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class EditPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false,
            imageUrl: "",
            resetForm: 1,
            petInfo: {},
            petInfoNew: {},
            petName: "",
            displayUploadModal: false,
        }
    }


    handlePetTypeChange = e => {
        this.setState((prevState, _) => {
            const newPetInfo = {...prevState.petInfo, type: e.target.value};
            return {
                petInfoNew: newPetInfo
            }
        });
    }

    handlePetSexChange = e => {
        this.setState((prevState, _) => {
            const newPetInfo = {...prevState.petInfo, sex: e.target.value};
            return {
                petInfoNew: newPetInfo
            }
        });
    }

    handleNameChange = e => {
        this.setState((prevState, _) => {
            const newPetInfo = {...prevState.petInfo, current_name: e.target.value};
            return {
                petInfoNew: newPetInfo
            }
        });
    }

    handleWeightChange = value => {
        this.setState((prevState, _) => {
            const newPetInfo = {...prevState.petInfo, weight: value};
            return {
                petInfoNew: newPetInfo
            }
        });
    }

    handleAgeYearChange = value => {
        this.setState((prevState, _) => {
            const newPetInfo = {...prevState.petInfo, ageyear: value};
            return {
                petInfoNew: newPetInfo
            }
        });
    }

    handleAgeMonthChange = value => {
        this.setState((prevState, _) => {
            const newPetInfo = {...prevState.petInfo, agemonth: value};
            return {
                petInfoNew: newPetInfo
            }
        });
    }

    handleBreedChange = e => {
        this.setState((prevState, _) => {
            const newPetInfo = {...prevState.petInfo, breed: e.target.value};
            return {
                petInfoNew: newPetInfo
            }
        });
    }

    handleUploadChange = ({ fileList }) => {
        if (fileList && fileList.length > 0) {
            this.setState((prevState, _) => {
                const newPetInfo = {...prevState.petInfo, photo: fileList[fileList.length - 1].originFileObj };
                return {
                    petInfoNew: newPetInfo
                }
            });

            getBase64(fileList[fileList.length - 1].originFileObj, imageUrl =>
                this.setState({imageUrl}),
            );
        }
        this.handleUploadCancel();
    };

    deletePetClick = () => {
        const {pet} = this.props;

        const optDeletePet = {
            method: "DELETE",
            url: `${BASE_URL}/deletepet/${pet.name}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        }
        axios(optDeletePet)
            .then((res) => {
                if (res.status === 200) {
                    message.success(`${pet.name} deleted`);
                    this.forceUpdate();
                    this.props.handleRerender();
                }
            })
            .catch((err) => {
                message.error("failed to delete")
            })
        this.props.fetchPets();
    }

    editPetClick = () => {

        const { pet } = this.props;
        var list = {
            before_name: this.props.pet.name,
            current_name: this.props.pet.name,
            type: this.props.pet.type,
            photo: this.props.pet.photo,
            weight: this.props.pet.weight,
            ageyear: this.props.pet.ageyear,
            agemonth: this.props.pet.agemonth,
            sex: this.props.pet.sex,
            breed: this.props.pet.breed
        }
        this.setState(
            {
                petInfo: list,
                petInfoNew: list,
                imageUrl: this.props.pet.photo,
                displayModal: true
            },
        )
    }

    handleCancel = () => {
        this.setState({
            displayModal: false,
            petInfoNew: this.state.petInfo,
            resetForm: this.state === 0 ? 1 : 0
        })
    };

    handleUploadClick = () => {
        this.setState({
            displayUploadModal: true
        })
    }

    handleUploadCancel = () => {
        this.setState({
            displayUploadModal: false,
        })

        Modal.destroyAll();
    }

    handleSubmit = e => {
        e.preventDefault();
        const {petInfoNew} = this.state;
        let formData = new FormData();
        formData.append("before_name", petInfoNew.before_name);
        formData.append("current_name", petInfoNew.current_name);
        formData.append("photo", petInfoNew.photo);
        formData.append("type", petInfoNew.type);
        formData.append("weight", petInfoNew.weight);
        formData.append("ageyear", petInfoNew.ageyear);
        formData.append("agemonth", petInfoNew.agemonth);
        formData.append("sex", petInfoNew.sex);
        formData.append("breed", petInfoNew.breed);

        const optUpdateProfile = {
            method: "POST",
            url: `${BASE_URL}/editpet`,
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem(TOKEN_KEY) }`
            },
            data: formData
        };

        axios(optUpdateProfile)
            .then(res => {
                if (res.status === 200) {
                    this.props.fetchPets();
                    message.success(`${petInfoNew.current_name} Updated!`);
                    this.setState({
                        displayModal: false,
                        resetForm: this.state === 0 ? 1 : 0
                    })
                    this.props.handleRerender();
                }
            })
            .catch(err => {
                    message.error(`Failed to update ${petInfoNew.current_name}, please try again!`);
                }
            )
    };




    render() {
        const { displayModal, imageUrl, resetForm, petInfoNew, displayUploadModal } = this.state;
        const { pet } = this.props;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div key={resetForm}>
                <a onClick={this.editPetClick} className="edit-btn">Edit Pet</a>
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={this.deletePetClick}>
                    <a className="delete-btn">Delete</a>
                </Popconfirm>

                <Modal title="Edit Pet"
                       visible={displayModal}
                       onCancel={this.handleCancel}
                       footer={null}
                       destroyOnclose={true}
                    // afterClose={e => formRef.current.resetFields()}
                    // afterClose={() => form.resetFields()}
                    // forceRender={true}
                >
                    <div className="pet-photo">
                        <Avatar size={150} src={imageUrl} />
                        <div className="change-photo-text">
                            <a onClick={this.handleUploadClick}>Change Photo</a>
                        </div>

                        <Modal
                            visible={displayUploadModal}
                            onCancel={this.handleUploadCancel}
                            footer={null}
                            destroyOnclose={true}
                            className="update-photo-modal"
                        >
                            <div className='update-photo'>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={() => false}
                                    onChange={this.handleUploadChange}
                                    onRemove={true}
                                >
                                    { uploadButton }
                                </Upload>
                            </div>
                        </Modal>
                    </div>



                    <Form name="pet_information"
                          onSubmit={this.handleSubmit}
                        // ref={this.formRef}
                    >
                        <Form.Item
                            name="pet_type"
                            label="Pet type">
                            <Radio.Group buttonStyle="solid" defaultValue={petInfoNew.type} onChange={this.handlePetTypeChange}>
                                <Radio.Button value="Dog" className='pet-button'>
                                    <img className='pet-icon' src={dogIcon} alt='dog Icon' />
                                    Dog
                                </Radio.Button>
                                <Radio.Button value="Cat" className='pet-button'>
                                    <img className='pet-icon' src={catIcon} alt='cat Icon' />
                                    Cat
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="pet_name"
                            label="Name"
                        >
                            <Input className='name-input' defaultValue={petInfoNew.current_name} key={petInfoNew.current_name} onBlur={this.handleNameChange}/>
                        </Form.Item>

                        <Form.Item
                            label="Weight(lbs)"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber defaultValue={petInfoNew.weight} onChange={this.handleWeightChange}/>
                        </Form.Item>

                        <Form.Item
                            name="pet_year_age"
                            className="age"
                            label="Age(Yr.)"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber defaultValue={petInfoNew.ageyear} onChange={this.handleAgeYearChange}/>
                        </Form.Item>

                        <Form.Item
                            name="pet_month_age"
                            className="age"
                            label="Age(Mo.)"
                            rules={[
                                {
                                    type: 'number',
                                    min: 1,
                                    max: 12,
                                },
                            ]}
                        >
                            <InputNumber defaultValue={petInfoNew.agemonth} onChange={this.handleAgeMonthChange}/>
                        </Form.Item>

                        <Form.Item
                            name="pet_sex"
                            label="Sex">
                            <Radio.Group buttonStyle="solid" defaultValue={petInfoNew.sex}  onChange={this.handlePetSexChange}>
                                <Radio.Button value="Male">Male</Radio.Button>
                                <Radio.Button value="Female">Female</Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="pet_breed"
                            label="Breed"
                        >
                            <Input defaultValue={petInfoNew.breed} key={petInfoNew.breed} onBlur={this.handleBreedChange}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save Pet
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default EditPet;