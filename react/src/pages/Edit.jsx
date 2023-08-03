import React from "react";
import { useNavigate ,useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

function Edit(){
    const {id}=useParams();

    const [userField, setUserField] = useState({
        name: "",
        email: ""
    });

    useEffect(()=>{
        fetchUser();
    },[id])

    const fetchUser=async()=>{
        try{
            console.log(id);
            const result=await axios.get("http://localhost:8000/api/users/"+id);
            // console.log(result.data.users);

            setUserField(result.data.users)
        }catch(err){
            console.log('Error fetching data:', err);
        }
    }

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8000/api/usersupdate/"+id, userField);


        } catch (err) {
            console.log("Something Wrong");
        }
    }


    return (
        <div>
            {/* <h1>Hello this is edit {id}</h1> */}
            <form>
                <br/><br/><label>Id:</label>
                <input type="text" name="id" value={id} disabled></input>
                <br/><br/><label>Name:</label>
                <input type="text" name="name" value={userField.name} onChange={e => changeUserFieldHandler(e)}></input>
                <br/><br/><label>Email:</label>
                <input type="text" name="email" value={userField.email} onChange={e => changeUserFieldHandler(e)}></input>
                <br/><br/><button type="submit"  onClick={e=>onSubmitChange(e)}>Update</button>
            </form>

        </div>
    )
}

export default Edit;
