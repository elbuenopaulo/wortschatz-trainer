import React from 'react'
import { Button } from 'react-bootstrap';
import './Results.css'

interface ResultsProps {
    errorCount: number;
    maxPoints: number;
    endExam: () => void;
}

class Results extends React.Component<ResultsProps> {

    render() {
        const correct = this.props.maxPoints - this.props.errorCount;
        const percentage = correct/this.props.maxPoints * 100;
        return(
            <>
            <div className='results-container'>
                <h1 className='results-container-title'>Resultat</h1>
                <p className='results-container-text'>{correct} / {this.props.maxPoints} korrekt!</p>
                <p className='results-container-text'>{percentage} %</p>
                <Button onClick={() => this.props.endExam()}>beenden</Button>
            </div>
            </>
        )
    }

}

export default Results;