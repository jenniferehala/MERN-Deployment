import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory, Link } from 'react-router-dom';


const SinglePet = (props) => {

    const [pets, setPets] = useState([])
    const { _id } = useParams({})
    const history = useHistory();

    const { removeFromDom } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${_id}`)
            .then(res => setPets(res.data.results))
            .catch(err => console.error(err));
    }, [pets]);

    const deletePet = (_id) => {
        console.log("did this run?")
        axios.delete(`http://localhost:8000/api/pets/${_id}/delete`)
            .then(res => {
                console.log(_id);
                history.push("/")
            })
            .catch(err => console.error(err));
    }

    const onLikeHandler = (e) => {
        console.log("hello");
        axios.patch(`http://localhost:8000/api/pets/${_id}/upvote`)
            .then(res => {
                // window.location.reload();
            })
            .catch(err => console.error.apply(err));

    }

    return (
        <div>
            <div>
            <button onClick={(e)=>{deletePet(_id)}}>Adopt {pets.name}</button>
                <h1>Pet Shelter</h1>
                <p><b>Details about:</b> {pets.name}</p>
                <p><b>Type:</b> {pets.type}</p>
                <p> <b>Skills:</b></p> 
                    <li>{pets.skill1}</li>
                    <li>{pets.skill2}</li> 
                    <li>{pets.skill3}</li><br />
                <p><b>Description:</b> {pets.description}</p>
            </div>

            <button onClick={onLikeHandler}>Like {pets.name}</button>
            <p> {pets.score} like(s)</p>

            <br />
            <Link className="btn btn-info" to="/">Main page</Link> |
            <Link className="btn btn-warning" to="/pets/create">Add new pet</Link> |
            <Link className ="btn btn-success" to={`/pets/${pets._id}/edit`} >Edit</Link>

        </div>
    )
}

export default SinglePet;