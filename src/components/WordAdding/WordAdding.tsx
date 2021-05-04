import React, { ComponentState } from 'react';
import { Button } from 'react-bootstrap';
import './WordAdding.css'

interface WordAddingProps {
    addWord: (germanWord: string, englishWord: string) => void
}

interface WordAddingState {
    germanWord: string;
    englishWord: string;
    emptyInput: boolean;
}

class WordAdding extends React.Component<WordAddingProps, WordAddingState> {

    constructor(props: Readonly<WordAddingProps>) {
        super(props);

        this.state = {
            germanWord: '',
            englishWord: '',
            emptyInput: false,
        }
    }

    private changeHandler(event: React.FormEvent<HTMLInputElement>): void {
        let name = event.currentTarget.name;
        let value = event.currentTarget.value;
        this.setState({[name]: value} as ComponentState);
    }

    //checks that no field is empty and calls addWord
    private sendForm(event: React.FormEvent) {
        event?.preventDefault();

        if (this.state.englishWord === '' || this.state.germanWord === '') {
            this.setState({emptyInput: true});
        } else {
            this.setState({emptyInput: false});
            this.props.addWord(this.state.germanWord, this.state.englishWord); 
            this.setState({germanWord: '', englishWord: ''});
        }
    }

    render() {
        return (
            <>
            <div className='wordadding-container'>
                <form name='addWord' onSubmit={event => this.sendForm(event)}>
                    <input type='text' name='germanWord' value={this.state.germanWord} placeholder='Deutsch' onChange={this.changeHandler.bind(this)} />
                    <input type='text' name='englishWord' value={this.state.englishWord} placeholder='Englisch' onChange={this.changeHandler.bind(this)}/>
                    <Button type='submit' value='store'>speichern</Button>
                </form>
                {this.state.emptyInput && <p>no empty inputs!</p>}
            </div>
            </>
        )
    }

}

export default WordAdding;