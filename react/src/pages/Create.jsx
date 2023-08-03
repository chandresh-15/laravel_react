import React, { useState } from "react";
import axios from "axios";
import Home  from "./Home";

export default function Create(){
    const [userField, setUserField] = useState({
        name: "",
        email: "",
    });

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value,
            [e.target.email] : e.target.value
        });
        //console.log(userField);

    }

     const [loading,setLoading]=useState()

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://localhost:8000/api/create", userField);
            console.log(responce);
             setLoading(true);
        } catch (err) {
            console.log("On Submit exception " + err);
        }
    }
    if(loading){
        return <Home/>
    }

    return (
        <div>
           <form >
                <input
                    type="text"
                    name="name"
                    onChange={e => changeUserFieldHandler(e)}
                    placeholder="Enter your name"
                />
                 <input
                    type="text"
                    name="email"
                    onChange={e => changeUserFieldHandler(e)}
                    placeholder="Enter your email"
                />
                <button type="submit" onClick={e => onSubmitChange(e)}>Submit</button>
    </form>
        </div>
    )
}
