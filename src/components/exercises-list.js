import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: []
        };

        this.deleteExercise = this.deleteExercise.bind(this);
        this.exercisesList = this.exercisesList.bind(this);
    }

    deleteExercise(id) {
        axios.delete('http://localhost:3000/exercises/' + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exercisesList() {
        return this.state.exercises.map(currrentExercise => {
            return (
                <Exercise exercise={currrentExercise} deleteExercise={this.deleteExercise} key={currrentExercise._id}></Exercise>
            )
        })
    }

    componentDidMount() {
        axios.get('http://localhost:3000/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
