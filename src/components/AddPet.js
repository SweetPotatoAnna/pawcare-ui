import React, {Component} from 'react';
import { Form, Input, InputNumber, Modal, Button, Radio, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import dogIcon from '../assets/images/dog_icon.png';
import catIcon from '../assets/images/cat_icon.png';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class AddPet extends Component {
    state = {
        displayModal: false,
        loading: false
    }

    render() {
        const {displayModal} = this.state;
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Button type="primary" onClick={this.addPetClick}>
                    Add Pet
                </Button>
                <Modal title="Add Pet"
                       visible={displayModal}
                       onCancel={this.handleCancel}
                       footer={null}
                       distroyOnclose={true}
                >

                    <div className='upload-photo'>
                        <h1>Edit Pet</h1>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </div>,

                    <Form name="pet_information"
                          onFinish={this.onFinish}
                    >

                        <Form.Item label="Pet type">
                            <Radio.Group buttonStyle="solid">
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
                            <Input />
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
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Age(Yr.)"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Age(Mo.)"
                            rules={[
                                {
                                    type: 'number',
                                    min: 1,
                                    max: 12,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item label="Sex">
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value="Male">Male</Radio.Button>
                                <Radio.Button value="Female">Female</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="pet_breed"
                            label="Breed"
                        >
                            <Input />
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



    addPetClick = () => {
        this.setState({displayModal: true})
    }

    handleCancel = () => {
        this.setState({displayModal: false})
    };

    onFinish = (values) => {
        console.log(values);
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };


}

export default AddPet;