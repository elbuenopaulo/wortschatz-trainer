import React from 'react'
import { Button } from 'react-bootstrap';
import { Languages } from '../../types/Languages';
import { WordPair } from '../../types/WordPair';
import QuestionForm from '../QuestionForm/QuestionForm';
import './QuestionTraining.css'

interface QuestionProps {
    language: keyof WordPair;
    wordPair: WordPair;
    checkWord: (userInput: string) => void;
    continueQuestions: () => void;
    correct: boolean;
}

class QuestionTraining extends React.Component<QuestionProps> {

    render() {
        return (
            <>
            <div className='questiontraining-container'>
                {
                    this.props.correct ?
                    <QuestionForm language={this.props.language} wordPair={this.props.wordPair} checkWord={this.props.checkWord}/>
                    :
                    <div>
                        <p className='questiontraining-container-text'>Korrekt:</p>
                        <p className='questiontraining-container-anwser'>{this.props.wordPair[this.props.language === Languages.ENGLISH ? Languages.GERMAN : Languages.ENGLISH]}</p>
                        <Button onClick={() => this.props.continueQuestions()}>weiter</Button>
                    </div>
                }                
            </div>
            </>
        )
    }

}

export default QuestionTraining;