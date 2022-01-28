import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useParams, useHistory } from 'react-router';

const Edit = (props) => {

    const history = useHistory()
    const {_id} = useParams();
    const [form,setForm] = useState({
        name: "",
        type: "",
        skill1: "",
        skill2: "",
        skill3: "",
        description: ""
    })
    const [errors,setErrors] = useState({})

    useEffect(()=>{
        // console.log(_id)
        axios.get(`http://localhost:8000/api/pets/${_id}`)
            .then(res=> {
                console.log(res.data.results)
                delete res.data.results._id;
                setForm(res.data.results);
                
            })
            .catch(err=> {
                console.log(err);
            })
    }, [_id])
    

    const onChangeHandler = (event) => {
        console.log("im here")
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        })
    }

    const onUpdateHandler = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:8000/api/pets/${_id}/update`, form)
        .then(res=>{
            console.log(res);
            // history.push("/")
            })
            .catch(err=>{
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors)
            })
    }
    return (
        <div>
            <h1 className="mx-auto">Edit Pet</h1>
            <p>update below:</p>
            <form onSubmit={onUpdateHandler} className="mt-5 w-50 mx-auto">
                <div className="form-group">
                    <label> Pet Name: </label>
                    <input type="text" name="name" className="form-control" placeholder="Name" onChange={onChangeHandler} value={form.name}/>
                    <span className="alert-danger">{errors.name && errors.name.message}</span>
                </div>
                <div className="form-group">
                    <label> Pet Type: </label>
                    <input type="text" name="type" className="form-control" placeholder="Type" onChange={onChangeHandler} value={form.type}/>
                    <span className="alert-danger">{errors.type && errors.type.message}</span>
                </div>
                <div className="form-group">
                    <label> Pet Description: </label>
                    <input type="text" name="description" className="form-control" placeholder="Description" onChange={onChangeHandler} value={form.description}/>
                    <span className="alert-danger">{errors.description && errors.description.message}</span>
                </div>
                <div className="form-group">
                    <label> Skill 1: </label>
                    <input type="text" name="skill1" className="form-control" placeholder="skill1" onChange={onChangeHandler} value={form.skill1}/>
                </div>
                <div className="form-group">
                    <label> Skill 2: </label>
                    <input type="text" name="skill2" className="form-control" placeholder="skill2" onChange={onChangeHandler} value={form.skill2}/>
                </div>
                <div className="form-group">
                    <label> Skill 3: </label>
                    <input type="text" name="skill3" className="form-control" placeholder="skill3" onChange={onChangeHandler} value={form.skill3}/>
                </div>


                <input type="submit" value="Update" className="btn btn-success mt-5" />
            </form>
            <br/>
                <Link to="/"><button className="btn btn-primary">Back to Home</button></Link> | 

                
        </div>
    )
}

export default Edit;