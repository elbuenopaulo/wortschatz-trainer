import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CapturePage from './pages/CapturePage/CapturePage';
import Navigation from './components/Navigation/Navigation';
import TrainingPage from './pages/TrainningPage/TrainingPage';
import ExamPage from './pages/ExamPage/ExamPage';

interface AppState {
  isExamInProgress: boolean;
}

class App extends React.PureComponent<{},AppState> {

  constructor(props: {}){
    super(props)

    this.state={
      isExamInProgress: false,
    }
  }

  private isExamInProgress(isExam: boolean) {
    this.setState({isExamInProgress: isExam});
  }

  render() {
    return (
      <Router>
        <Navigation isExam={this.state.isExamInProgress}/>
      <Switch>
            <Route path="/exam" exact component={() => <ExamPage isExam={this.isExamInProgress.bind(this)} hasStarted={this.state.isExamInProgress}/>}/>
            <Route path="/training" exact component={TrainingPage}/>
            <Route path="/" exact component={CapturePage}/>
      </Switch>
    </Router>
    )
  }
}

export default App;
