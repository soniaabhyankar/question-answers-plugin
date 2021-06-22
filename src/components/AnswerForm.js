import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';


const AnswerForm = () => {
	const [state, setState] = useState({
		description: "",
		username: ""
	});

	let { id } = useParams();

	const handleInputChange = (input) => (e) => {
		setState({ ...state, [input]: e.target.value });
	}

	const handleFormSubmit = async () => {
		const response = await axios.get(`http://localhost:8000/questions?id=${id}`);
		await axios
			.patch(`http://localhost:8000/questions/${id}`, {
				answers: [
					{
						id: uuidv4(),
						description: state.description,
						userName: state.username
					},
					...response.data[0].answers,
				]
			});
	}

	return (
		<React.Fragment>
			<Button variant="outlined" component={RouterLink} to={`/questionDetail/${id}`}>Back</Button>
			<h1>Write an answer</h1>

			<form>
				<TextField
					className="form-input"
					label="Answer *"
					variant="outlined"
					multiline
					rows={20}
					fullWidth
					value={state.description}
					onChange={handleInputChange("description")}
				/>
				<TextField
					className="form-input"
					label="Your Name *"
					variant="outlined"
					fullWidth
					value={state.username}
					onChange={handleInputChange("username")}
				/>
				<p>Fields marked with '*' are required.</p>
				<Button
					variant="contained"
					color="primary"
					component={RouterLink}
					onClick={handleFormSubmit}
					to={`/questionDetail/${id}`}
				>
					Submit answer
				</Button>
			</form>
		</React.Fragment>
	);
};

export default AnswerForm;