import { Typography } from "@material-ui/core";
import { Route, Switch, useLocation, withRouter } from "react-router-dom";

import Questions from "./components/Questions";
import QuestionForm from "./components/QuestionForm";
import QuestionDetail from "./components/QuestionDetail";
import AnswerForm from "./components/AnswerForm";
import { useEffect, useState } from "react";

function App(props) {
  let location = useLocation();

  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);
  console.log(currentLocation)

  return (
    <main>
      <Typography variant="h2" align="center">QnA</Typography>
      <Switch>
        <Route path="/" exact render={() => (
          <Questions route={currentLocation} />
        )} />

        <Route path="/create" render={(props) => (
          <QuestionForm {...props} />
        )} />

        <Route path="/questionDetail/:id" render={() => (
          <QuestionDetail route={currentLocation} />
        )} />

        <Route path="/answer/:id" children={<AnswerForm />} />
      </Switch>
    </main >
  );
}

export default withRouter(App);
