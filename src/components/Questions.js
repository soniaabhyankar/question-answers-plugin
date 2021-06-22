import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Questions = (props) => {
	const [questions, setQuestions] = useState([]);

	const getAllQuestions = async () => {
		const response = await axios.get('http://localhost:8000/questions');

		const questionList = response.data.reduce((acc, question) => {
			acc.push(
				<li className="question-link" key={`/${question.id}`}>
					<RouterLink to={`questionDetail/${question.id}`} >{question.title}</RouterLink>
				</li>
			);

			return acc;
		}, []);

		return questionList;
	}

	useEffect(() => {
		let mounted = true;

		getAllQuestions()
			.then(questionsList => {
				if (mounted)
					setQuestions(questionsList);
			})

		return () => mounted = false;
	}, [props.route]);

	// console.log(props)

	return (
		<React.Fragment>

			<Button variant="contained" color="primary" component={RouterLink} to="/create" >
				Ask a question
			</Button>


			<div className="container">
				<h3>Recently asked questions</h3>
				<ul className="questions-container">
					{questions}
				</ul>
			</div>
		</React.Fragment>
	)
}

export default Questions;