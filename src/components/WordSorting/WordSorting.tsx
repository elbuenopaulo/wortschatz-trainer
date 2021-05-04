import React from 'react'
import { Button } from 'react-bootstrap';
import { Languages } from '../../types/Languages';
import './WordSorting.css';

interface WordSortingProps {
    sortLanguage: (language: string) => void;
}

interface WordSortingState {
    changeLanguage: boolean;
}

class WordSorting extends React.Component<WordSortingProps, WordSortingState> {

    constructor(props: Readonly<WordSortingProps>){
        super(props);

        this.state = {
            changeLanguage: true,
        }
    }

    render() {
        return(
            <>
            <div className='wordsorting-container'>
                {this.state.changeLanguage ?
                <Button onClick={() => {this.props.sortLanguage(Languages.GERMAN); this.setState({changeLanguage: false})}} className='button'>Deutsch sortieren</Button>
                :
                <Button onClick={() => {this.props.sortLanguage(Languages.ENGLISH); this.setState({changeLanguage: true})}} className='button'>Englisch sortieren</Button>
                }
            </div>
            </>
        )
    }
}

export default WordSorting;