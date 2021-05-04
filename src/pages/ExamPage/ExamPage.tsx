import React from "react"
import LocalStorageHelper from "../../services/LocalStorageService";
import { WordPair } from "../../types/WordPair";
import ListService from "../../services/ListService";
import Results from "../../components/Results/Results";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import ExamTrainingService from "../../services/ExamTrainingService";
import './ExamPage.css'
import { Button } from "react-bootstrap";

interface ExamPagePageState {
    wordList: WordPair[];
    language: keyof WordPair;
    randomWord: WordPair;
    maxPoints: number;
    errorPoints: number;
    started: boolean;
    finished: boolean;
    
}

interface ExamPageProps {
    isExam: (isExam: boolean) => void;
}


class ExamPage extends React.Component<ExamPageProps, ExamPagePageState> {

    constructor(props: Readonly<ExamPageProps>) {
        super(props);

        this.state = {
            wordList: LocalStorageHelper.getListOrCreateDefault(),
            language: ExamTrainingService.defineLanguage(),
            randomWord: LocalStorageHelper.getListOrCreateDefault()[0],
            errorPoints: 0,
            maxPoints: LocalStorageHelper.getListOrCreateDefault().length,
            started: false,
            finished: false,
        }
    }

    //removes asked words
    private removeWord() {
        let newList = ListService.removeItemFormlist(this.state.randomWord.key, this.state.wordList);
        if(newList.length < 1){
            this.setState({finished: true});
        } else {
            this.setState({language: ExamTrainingService.defineLanguage(), randomWord: ExamTrainingService.defineRandomWord(newList), wordList: newList});
        }
    }

    private checkWord(userInput: string) {
        if(ExamTrainingService.checkWord(userInput, ExamTrainingService.getOtherLanguage(this.state.randomWord, this.state.language))) {
            this.removeWord();
        } else {
            let erros = this.state.errorPoints + 1;
            this.setState({errorPoints: erros});
            this.removeWord();
        }
    }

    private startExam() {
        this.setState((state) => ({started: true, language: ExamTrainingService.defineLanguage(), randomWord: ExamTrainingService.defineRandomWord(state.wordList)}))
        this.props.isExam(true);
    }

    private endExam() {
        this.setState({started: false, finished: false, wordList: LocalStorageHelper.getListOrCreateDefault(), errorPoints: 0});
        this.props.isExam(false);
    }
    
    public render(): React.ReactNode {
        return (
            <>
            <div className='exampage-container'>
            {this.state.started ?
            (this.state.finished ?
                <Results maxPoints={this.state.maxPoints} errorCount={this.state.errorPoints} endExam={this.endExam.bind(this)} />
                :
                <QuestionForm wordPair={this.state.randomWord} language={this.state.language} checkWord={this.checkWord.bind(this)} />)
                :
            <Button onClick={() => this.startExam()}>Start!</Button>
            }
            </div>
            </>
        )
    }
}

export default ExamPage;