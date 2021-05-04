import React from 'react';
import { WordPair } from '../../types/WordPair';
import WordListElement from '../WordListElement/WordListElement';
import './WordList.css';

interface WordListProps {
    wordPairList: WordPair[]
    wordPairRemove: (key: number) => void;
    wordPairUpdate: (key: number, germanWord: string, englishWord: string) => void;
}

class WordList extends React.Component<WordListProps> {

    private renderList() {
        return (
            this.props.wordPairList.map((wordPair: WordPair) => {
                return <WordListElement wordPair={wordPair} wordPairRemove={this.props.wordPairRemove} wordPairUpdate={this.props.wordPairUpdate} />
            })
        )
    }

    render() {
        return(
            <div className='wordlist-container'>
                {this.renderList()}
            </div>
        )
    }

}

export default WordList;