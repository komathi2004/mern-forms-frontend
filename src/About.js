import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, message } from "antd";
import AccordionComponent from "./components/AccordionComponent";

const BE_URL = "https://mern-form-ouw0.onrender.com";

const About = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BE_URL}/api/forms`);
                // Transform the data to match what your AccordionComponent expects
                const transformedData = response.data.map(form => {
                    const userData = { _id: form._id };
                    form.fields.forEach(field => {
                        userData[field.id] = field.value || 
                            (field.options && field.selectedOptions && field.selectedOptions.length > 0 ? 
                            field.options[field.selectedOptions[0]] : '');
                    });
                    return userData;
                });
                setUsers(transformedData);
            } catch (error) {
                console.error("Error Fetching Users : ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BE_URL}/api/forms/${id}`);
            setUsers(users.filter(user => user._id !== id));
            message.success("User Deleted Successfully");
        } catch (error) {
            console.error("Error Deleting User : ", error);
            message.error("Failed To Delete User");
        }
    };

    return (
        <div>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <AccordionComponent users={users} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default About;