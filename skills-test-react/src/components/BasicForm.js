import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Button } from "@mui/material";
import "./BasicForm.css";

const BasicForm = () => {
  const [data, setData] = React.useState([]);

  const deleteButton = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div>
      <div>
        <h1>Add Information</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={(values) => {
            setData([...data, values]);
          }}
        >
          <Form>
            <label htmlFor="todo">Info:</label>
            <Field
              required
              id="fname"
              name="firstName"
              placeholder="First Name"
            />
            <Field
              required
              id="lname"
              name="lastName"
              placeholder="Last Name"
            />
            <Field required id="email" name="email" placeholder="Email" />
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </div>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email} </td>
                  <button onClick={() => deleteButton(index)}>Delete</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BasicForm;
