import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';


const QuestionForm = () => {
	return (
		<React.Fragment>
			<Button variant="outlined" component={RouterLink} to="/">Back</Button>
			<h1>Create a question</h1>

		</React.Fragment>
	);
};

export default QuestionForm;