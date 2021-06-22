import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";

const QuestionDetail = (props) => {
	const [state, setState] = useState({});

	let { id } = useParams();

	// useEffect(() => {
	// 	axios
	// 		.get(`http://localhost:8000/questions?id=${id}`)
	// 		.then((response) => {
	// 			setState(response.data[0]);
	// 		})
	// 		.catch((e) => console.log(e));
	// }, [props.route]);

	const getQuestionDetails = async () => {
		const response = await axios.get(`http://localhost:8000/questions?id=${id}`);

		return response.data[0];
	}

	useEffect(() => {
		let mounted = true;

		getQuestionDetails()
			.then(questionDetails => {
				if (mounted)
					setState(questionDetails);
			})

		console.log(`det ${props.route}`)
		return () => mounted = false;
	}, [props.route]);

	const renderAnswers = state?.answers?.reduce((acc, answer) => {
		acc.push(
			<li key={answer.id}>
				<p>{answer.userName} answered on 22.05.2021</p>
				<p>{answer.description}</p>
			</li>
		);
		return acc;
	}, []);

	console.log(state.answers)
	console.log(renderAnswers)

	return (
		<React.Fragment>
			<Button variant="outlined" component={RouterLink} to="/">Back</Button>
			<div>
				<h2>{state.title}</h2>
				<p>Asked by {state.userName}</p>
				<p>{state.description}</p>
				<Button variant="contained" color="primary" component={RouterLink} to={`/answer/${id}`}>
					Answer
				</Button>
				<ul>
					{renderAnswers}
				</ul>
			</div>
		</React.Fragment>
	)
}

export default QuestionDetail;