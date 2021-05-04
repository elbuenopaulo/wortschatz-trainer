import React from 'react'
import { Button } from 'react-bootstrap';
import { Languages } from '../../types/Languages';
import { WordPair } from '../../types/WordPair';
import './QuestionForm.css'

interface QuestionFormProps {
    language: keyof WordPair;
    wordPair: WordPair;
    checkWord: (userInput: string) => void;
}

interface QuestionFormState {
    userInput: string;
}

class QuestionForm extends React.Component<QuestionFormProps, QuestionFormState> {

    constructor(props: Readonly<QuestionFormProps>) {
        super(props);

        this.state = {
            userInput: '',
        }
    }

    public changeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.setState({userInput: event.currentTarget.value});
    }

    render() {
        return (
            <div className='questionform-container'>
                {this.props.language === Languages.GERMAN ? <p className='questionform-container-text'>Deutsch:</p> : <p className='questionform-container-text'>Englisch:</p>}
                <p className='questionform-container-anwser'>{this.props.wordPair[this.props.language]}</p>
                {this.props.language !== Languages.GERMAN ? <p className='questionform-container-text'>Deutsch:</p> : <p className='questionform-container-text'>Englisch:</p>}
                <form onSubmit={(event) => {event?.preventDefault(); this.props.checkWord(this.state.userInput); this.setState({userInput: ''})}}>
                    <input type='text' name='testword' value={this.state.userInput} onChange={this.changeHandler.bind(this)} />
                    <Button type='submit'>Ok</Button>
                </form>
            </div>
        )
    }
    
    
}

export default QuestionForm;