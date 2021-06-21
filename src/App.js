import { Typography } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import Questions from "./components/Questions";
import QuestionForm from "./components/QuestionForm";

function App() {
  return (
    <main>
      <Typography variant="h2" align="center">QnA</Typography>
      <Switch>
        <Route path="/" component={Questions} exact />
        <Route path="/create" component={QuestionForm} />
      </Switch>
    </main>
  );
}

export default App;
