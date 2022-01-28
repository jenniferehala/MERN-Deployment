import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import SinglePet from './SinglePet';

const Main = (props) => {
    const [pets, setPets] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/findAll")
            .then(res => {
                console.log(res.data.results);
                setPets(res.data.results);
            })
            .catch(err => console.log(err))
    }, [])

    const onLikeHandler = (_id, arrIndex) => {
        console.log(_id);
        console.log(arrIndex);
    }





    return (
        <div className="container">
            
            <Link className="btn btn-primary" to="/pets/create">Add a pet to the shelter</Link>
            <h1>Pet Shelter</h1>
            <br />
            <p>These pets are looking for a good home:</p>
            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                {
                    pets.map((pet, i) => {
                        return (
                            <>
                            {/* <SinglePet onLikeHandler={()=>onLikeHandler(pet._id, i)}/> */}
                            <tbody key={i}>
                                <tr>
                                    <td> {pet.name} </td>
                                    <td>{pet.type}</td>
                                    <td>
                                        <Link to={`/pets/` + pet._id}>Details</Link> |
                                        <Link to={`/pets/${pet._id}/edit`} >Edit</Link> 
                                    </td>
                                </tr>
                            </tbody>
                            </>
                        )

                    })
                }
            </table>
        </div>
    )
}

export default Main;