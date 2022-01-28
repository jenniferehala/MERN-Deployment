import React, {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router';

const Create = (props) => {

    const history = useHistory()
    const [form,setForm] = useState({
        name: "",
        type: "",
        skill1: "",
        skill2: "",
        skill3: "",
        description: ""
    })
    const [errors,setErrors] = useState({})
    

    const onChangeHandler = (event) => {
        console.log("im here")
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/pets/create", form)
            .then(res=>{
                console.log(res);
                history.push("/")
            })
            .catch(err=>{
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors)
            })
    }
    return (
        <div>
            <h1 className="mx-auto">Pet Shelter</h1>
            <p>Know a pet needing a home?</p>
            <form onSubmit={onSubmitHandler} className="mt-5 w-50 mx-auto">
                <div className="form-group">
                    <label> Pet Name: </label>
                    <input type="text" name="name" className="form-control" placeholder="Name" onChange={onChangeHandler}/>
                    <span className="alert-danger">{errors.name && errors.name.message}</span>
                </div>
                <div className="form-group">
                    <label> Pet Type: </label>
                    <input type="text" name="type" className="form-control" placeholder="Type" onChange={onChangeHandler}/>
                    <span className="alert-danger">{errors.type && errors.type.message}</span>
                </div>
                <div className="form-group">
                    <label> Pet Description: </label>
                    <input type="text" name="description" className="form-control" placeholder="Description" onChange={onChangeHandler}/>
                    <span className="alert-danger">{errors.description && errors.description.message}</span>
                </div>
                <div className="form-group">
                    <label> Skill 1: </label>
                    <input type="text" name="skill1" className="form-control" placeholder="skill1" onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <label> Skill 2: </label>
                    <input type="text" name="skill2" className="form-control" placeholder="skill2" onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <label> Skill 3: </label>
                    <input type="text" name="skill3" className="form-control" placeholder="skill3" onChange={onChangeHandler}/>
                </div>


                <input type="submit" value="Add Pet "className="btn btn-success mt-5" />
            </form>
            <br/>
                <Link to="/"><button className="btn btn-primary">Back to Home</button></Link> | 

                
        </div>
    )
}

export default Create;