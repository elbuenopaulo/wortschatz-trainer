import React from "react"
import QuestionTraining from "../../components/QuestionTraining/QuestionTraining";
import { WordPair } from "../../types/WordPair";
import ListService from "../../services/ListService";
import LocalStorageHelper from "../../services/LocalStorageService";
import ExamTrainingService from "../../services/ExamTrainingService";

interface TrainingPageState {
    wordList: WordPair[];
    language: keyof WordPair;
    randomWord: WordPair;
    correct: boolean;
}

class TrainingPage extends React.Component<{}, TrainingPageState> {

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            wordList: LocalStorageHelper.getListOrCreateDefault(),
            language: ExamTrainingService.defineLanguage(),
            randomWord: LocalStorageHelper.getListOrCreateDefault()[0],
            correct: true,
        }
    }

    //Correct words get removed, wrongs must be repeated, if list is too small all words are loaded in again
    private removeCorrectWord() {
        let newList;
        if (this.state.wordList.length === 1) {
            newList = LocalStorageHelper.getListOrCreateDefault()
        } else {
            newList = ListService.removeItemFormlist(this.state.randomWord.key, this.state.wordList)
        }
        this.setState({correct: true, language: ExamTrainingService.defineLanguage(), randomWord: ExamTrainingService.defineRandomWord(newList), wordList: newList});
    }

    private checkWord(userInput: string) {
        if(ExamTrainingService.checkWord(userInput, ExamTrainingService.getOtherLanguage(this.state.randomWord, this.state.language))) {
            this.removeCorrectWord();
        } else {
            this.setState({correct: false});
        }
    }

    private continueQuestions() {
        this.setState((state) => ({correct: true, language: ExamTrainingService.defineLanguage(), randomWord: ExamTrainingService.defineRandomWord(state.wordList)}));
    }
    
    public render(): React.ReactNode {
        return (
            <>
            <div className='trainingpage-container'>
            <QuestionTraining wordPair={this.state.randomWord} language={this.state.language} correct={this.state.correct} checkWord={this.checkWord.bind(this)} continueQuestions={this.continueQuestions.bind(this)}/>
            </div>
            </>
        )
    }
}

export default TrainingPage;