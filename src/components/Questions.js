import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8000/questions')
			.then((response) => {
				const questionList = response.data.reduce((acc, question) => {
					acc.push(
						<li className="question-link" key={`/${question.id}`}>
							<RouterLink to={`/${question.id}`} >{question.title}</RouterLink>
						</li>
					);

					return acc;
				}, []);

				setQuestions(questionList);
			})
			.catch((e) => console.log(e));
	});

	// console.log(questions)

	return (
		<React.Fragment>

			<Button variant="contained" color="primary" component={RouterLink} to="/create">
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