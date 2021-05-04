import React from "react";
import { WordPair } from "../../types/WordPair";
import WordAdding from "../../components/WordAdding/WordAdding";
import WordList from "../../components/WordList/WordList";
import WordSorting from "../../components/WordSorting/WordSorting";
import LocalStorageHelper  from '../../services/LocalStorageService'
import WordFillReset from "../../components/WordFillReset/WordFillReset";
import ListService from "../../services/ListService";
import './CapturePage.css';

interface CapturePageState {
    wordList: WordPair[];
}

class CapturePage extends React.Component<{}, CapturePageState> {

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            wordList: LocalStorageHelper.getListOrCreateDefault(),
        }
    }

    componentDidUpdate() {
        LocalStorageHelper.saveList(this.state.wordList)
    }

    //returns highes free key number or 1 if list is empty
    private getNextHighestKey(): number {
        let highestNumber = Math.max.apply(Math, this.state.wordList.map((wordPair) => { return wordPair.key })) + 1;
        if(Number.isFinite(highestNumber)) {
            return highestNumber;
        } else {
            return 1;
        }
    }

    //Adds word to list and assignes key
    private addWordPair(germanWord: string, englishWord: string) {        
        const newWord = {key: this.getNextHighestKey(), english: englishWord.trim(), german: germanWord.trim()};
        
        let newWordList = this.state.wordList;
        newWordList.push(newWord)
        
        this.setState({
            wordList: newWordList,
        })
    }

    private deleteWordPair(key: number) {
        
        let newWordList = ListService.removeItemFormlist(key, this.state.wordList);

        this.setState({
            wordList: newWordList,
        })
    }

    private updateWordPair(key: number, germanWord: string, englishWord:string) {
        let newWordList = this.state.wordList;

        newWordList.forEach(wordPair => { 
            if(wordPair.key === key) {
                wordPair.german = germanWord;
                wordPair.english = englishWord;
            }
        });

        this.setState({
            wordList: newWordList,
        })
    }

    private sortWordPairs(language: string) {
        let newWordList = ListService.sortList(language, this.state.wordList);
        
        this.setState({
            wordList: newWordList,
        })
    }

    //loads 10 example word pairs into list and local storage
    private loadExampleData() {
        let exampleData = [{english:  'cat',german: 'Katze'},{english:  'dog',german: 'Hund'},{english:  'mouse',german: 'Maus'},{english:  'cow',german: 'Kuh'},{english:  'penguin',german: 'Pinguin'}, {english:  'zebra',german: 'Zebra'},{english:  'rat',german: 'Ratte'},{english:  'goat',german: 'Ziege'},{english:  'fish',german: 'Fisch'},{english:  'ant',german: 'Ameise'}]
               
        LocalStorageHelper.deleteList()
        exampleData.forEach(wordPair => this.addWordPair(wordPair.german, wordPair.english))
    }

    private resetList() {
        LocalStorageHelper.deleteList()
        this.setState({wordList: []})
    }

    render() {
        return(
            <>
            <div className='capturepage-container'>
                <div className='capturepage-container-button'>
                <WordSorting sortLanguage={this.sortWordPairs.bind(this)}/>
                <WordFillReset resetList={this.resetList.bind(this)} loadTestData={this.loadExampleData.bind(this)} />
                </div>
                <WordAdding addWord={this.addWordPair.bind(this)}/>
                <WordList wordPairList={this.state.wordList} wordPairRemove={this.deleteWordPair.bind(this)} wordPairUpdate={this.updateWordPair.bind(this)} />
                
            </div>
            </>
        )
    }
}

export default CapturePage;