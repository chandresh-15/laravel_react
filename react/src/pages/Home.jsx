import React from "react";

import { useState, useEffect } from 'react';
import axios from 'axios';
import {Routes, Route, Link} from "react-router-dom";


const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
          .then(response => {
            setUsers(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);


      const deleteUser=async(id)=>{
            console.log(id);
            await axios.delete("http://localhost:8000/api/usersdelete/"+id);
            const newUserData=users.filter((item)=>{
            return(
            item.id !==id
            )
            })
            setUsers(newUserData);
            }

    return (
        <div>
            <h2>Users listing ...</h2>
            <table border={"2px"}>
                <thead>
                    <tr>
                        <th>Sno.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((users,index)=>(
                        <tr key={users.id}>
                            <td>{users.id}</td>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>
                                <button>
                                <Link className="btn btn-info" to={`/Edit/${users.id}`}>Edit</Link>
                                    </button>&nbsp;

                                <button type="button" className="btn btn-danger"
                                    onClick={()=>{deleteUser(users.id)}}
                                    >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Home;
