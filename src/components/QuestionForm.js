import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const QuestionForm = () => {
	const [state, setState] = useState({
		question: "",
		description: "",
		username: ""
	});

	const handleInputChange = (input) => (e) => {
		setState({ ...state, [input]: e.target.value });
	}

	const handleFormSubmit = async () => {
		await axios
			.post('http://localhost:8000/questions', {
				id: uuidv4(),
				title: state.question,
				description: state.description || "",
				userName: state.username,
				answers: []
			});
	}

	return (
		<React.Fragment>
			<Button variant="outlined" component={RouterLink} to="/">Back</Button>
			<h1>Create a question</h1>

			<form>
				<TextField
					className="form-input"
					label="Question *"
					variant="outlined"
					multiline
					rows={4}
					fullWidth
					value={state.question}
					onChange={handleInputChange("question")}
				/>
				<TextField
					className="form-input"
					label="Description"
					variant="outlined"
					multiline
					rows={6}
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
				<Button variant="contained" color="primary" component={RouterLink} onClick={handleFormSubmit} to="/">Create question</Button>
			</form>
		</React.Fragment>
	);
};

export default QuestionForm;