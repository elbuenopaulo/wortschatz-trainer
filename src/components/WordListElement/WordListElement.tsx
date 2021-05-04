import React, { ComponentState } from 'react'
import { Button } from 'react-bootstrap';
import { WordPair } from '../../types/WordPair';
import './WordListElement.css';

interface WordListElementProps {
    wordPair: WordPair;
    wordPairRemove: (key: number) => void;
    wordPairUpdate: (key: number, germanWord: string, englishWord: string) => void;
}

interface WordListElementState {
    newEnglishWord: string;
    newGermanWord: string;
    editing: boolean;
}

class WordListElement extends React.Component<WordListElementProps, WordListElementState> {

    constructor(props: Readonly<WordListElementProps>) {
        super(props);
        
        this.state = {
            editing: false,
            newEnglishWord: '',
            newGermanWord: '',
        }
    }

    private changeHandler(event: React.FormEvent<HTMLInputElement>): void {
        let name = event.currentTarget.name;
        let value = event.currentTarget.value;
        this.setState({[name]: value} as ComponentState);
    }

    //checks if input was made and calls wordPairUpdate
    private sendForm(event: React.FormEvent) {
        event?.preventDefault();

        let englishWord = this.state.newEnglishWord;
        let germanWord = this.state.newGermanWord;

        if(englishWord === ''){
            englishWord = this.props.wordPair.english;
        }
        if(germanWord === ''){
            germanWord = this.props.wordPair.german
        }  
        this.props.wordPairUpdate(this.props.wordPair.key, germanWord, englishWord);

        this.setState({editing: false});
    }

    render() {
        return(
            <>
            {this.state.editing ? 
            <div className='word-list-element-container'>
                <form name='editWord' onSubmit={event => this.sendForm(event)} className='form'>
                    <input type='text' name='newGermanWord' defaultValue={this.props.wordPair.german} onChange={this.changeHandler.bind(this)} className='input'/>
                    <input type='text' name='newEnglishWord' defaultValue={this.props.wordPair.english} onChange={this.changeHandler.bind(this)} className='input'/>
                    <Button type='submit' >Ok</Button>
                </form>
            </div>
            :
            <div className='word-list-element-container'>
                <div className='word-list-element'>
                    <p className='word-list-element-text'>{this.props.wordPair.german} : {this.props.wordPair.english}</p>
                </div>
                <div className='word-list-element-button'>
                    <Button onClick={() => this.setState({editing: true}) }>Bearbeiten</Button>
                </div>
                <div className='word-list-element-button'>
                    <Button onClick={() => this.props.wordPairRemove(this.props.wordPair.key)}>Löschen</Button>
                </div>
            </div>
            }
            </>
        )
    }
}

export default WordListElement;