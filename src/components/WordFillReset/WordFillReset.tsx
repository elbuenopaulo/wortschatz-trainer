import React from 'react';
import { Button } from 'react-bootstrap';
import './WordFillReset.css';

interface WordFillResetProps {
    resetList: () => void;
    loadTestData: () => void;
}

class WordFillReset extends React.Component<WordFillResetProps> {

    render() {
        return (
            <>
            <div className='wordfillreset-container'>
                <Button onClick={() => this.props.resetList()}>Daten zurücksetzten</Button>
                <Button onClick={() => this.props.loadTestData()}>Daten laden</Button>
            </div>
            </>
        )
    }
}

export default WordFillReset;