import React from "react";
import { Form, Input, DatePicker, Radio, Select, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const BE_URL = "https://mern-form-ouw0.onrender.com";

const FormComponent = () => {
    const navigate = useNavigate();
    
    const onFinish = async (values) => {
        try {
            // Transform the form data to match the backend schema
            const formattedData = {
                title: "User Details",
                fields: [
                    {
                        id: "name",
                        type: "text",
                        label: "Name",
                        options: [],
                        selectedOptions: [],
                        value: values.name
                    },
                    {
                        id: "dob",
                        type: "text",
                        label: "Birth Date",
                        options: [],
                        selectedOptions: [],
                        value: values.dob ? values.dob.format('YYYY-MM-DD') : ''
                    },
                    {
                        id: "gender",
                        type: "radio",
                        label: "Gender",
                        options: ["Male", "Female", "Other"],
                        selectedOptions: values.gender === "Male" ? [0] : values.gender === "Female" ? [1] : [2]
                    },
                    {
                        id: "email",
                        type: "email",
                        label: "Email",
                        options: [],
                        selectedOptions: [],
                        value: values.email
                    },
                    {
                        id: "location",
                        type: "text",
                        label: "Location",
                        options: ["India", "United States", "China", "Russia"],
                        selectedOptions: values.location === "India" ? [0] : 
                                         values.location === "United States" ? [1] : 
                                         values.location === "China" ? [2] : [3]
                    }
                ]
            };
            
            console.log("Sending data:", formattedData);
            
            const response = await axios.post(`${BE_URL}/api/forms`, formattedData);
            console.log("Response:", response.data);
            
            // Use the global message API to show success
            message.success("Response Submitted Successfully");
            // Add a small delay before navigating to ensure message is seen
            setTimeout(() => {
                navigate("/about");
            }, 1000);
        } catch (error) {
            console.error("Error:", error);
            // Display error message
            message.error(error.response?.data?.message || "Failed To Submit The Form");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "5px" }}>
            <h2 align="center">User Details</h2>
            <Form
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: "0 auto" }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input placeholder="Enter Your Name" />
                </Form.Item>
                
                <Form.Item
                    label="Birth Date"
                    name="dob"
                    rules={[{ required: true, message: "Please select your date of birth" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: "Please select your gender" }]}
                >
                    <Radio.Group>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                        <Radio value="Other">Other</Radio>
                    </Radio.Group>
                </Form.Item>
                
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email" },
                    ]}
                >
                    <Input placeholder="Enter Your Email" />
                </Form.Item>
                
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: "Please select your location" }]}
                >
                    <Select placeholder="Select Your Location ( Country )">
                        <Option value="India">India</Option>
                        <Option value="United States">United States</Option>
                        <Option value="China">China</Option>
                        <Option value="Russia">Russia</Option>
                    </Select>
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormComponent;