//import statements
import React from "react";
import '../App.css';

import {Button} from 'react-bootstrap';
import Answer from "./Answer";
import SubmitButton from "./SubmitButton";

import 'bootstrap/dist/css/bootstrap.css';

//stateful parent component where the entire game takes place
class Hangman extends React.Component{

    MAX_GUESSES = 9; 

    //word list used to select the answer
    WORDS = ["summer", "winter", "spring", "autumn", "day", "week", "month", "year", "decade", "century", "happy", "depressed", "lucky", "unlucky", 
                        "skateboard", "surfboard", "hiking", "computer", "success", "business", "employee", "office", "television", "restaurant", "ocean", "love", 
                        "sickness", "fatal", "capacity", "subway", "pledge", "hopeful", "dragon", "wasteland", "future", "electronic"];
    currLetter = "";

    //component constructor
    constructor(props){
        super(props);

        //method binding
        this.updateLetter = this.updateLetter.bind(this);
        this.SelectWord = this.SelectWord.bind(this);
        this.GetHangmanClass = this.GetHangmanClass.bind(this);
        this.GenEmptyAnswerArray = this.GenEmptyAnswerArray.bind(this);
        this.SubmitGuess = this.SubmitGuess.bind(this);
        this.CheckFullAnswer = this.CheckFullAnswer.bind(this);
        this.ResetGame = this.ResetGame.bind(this);
        this.ShowHelp = this.ShowHelp.bind(this);

        //randomly selecting a word as the answer 
        let answer = this.SelectWord();
        
        //splitting answer word up into letters
        let letters = Array.from(answer);

        //creating a new empty array with underscores instead of characters that is the same length as the answer word
        let emptyAnswer = this.GenEmptyAnswerArray(answer);

        //initializing component state
        this.state = { word: answer , guesses: 0 , userCorrect: false, wordLetters: letters , answerLetters: emptyAnswer };

    }

    //updating the component state to reflect changes in the user's current guess
    updateLetter = (event) =>{
        this.currLetter = event.target.value;
        console.log("Selected: "+this.currLetter);
        this.setState( {letter: this.currLetter} );
    }

    render(){
        let message = '';

        //determining the class that the image component will use to load its background image
        let hangmanClass = this.GetHangmanClass();

        const messageStyle = {
            color: 'white',
            fontStyle: 'italic',
            fontWeight: 'bold'
        }

        //if the user's answer is complete and correct
        if(this.state.userCorrect){
            message = "Congratulations! You guessed the answer: "+this.state.word;
            //else if they have guessed more than 9 times and did not get the entire answer
        } else if(this.state.guesses > this.MAX_GUESSES){
            message = "Better luck next time!";
            //else if their current letter selection is empty (which implies they have not yet started playing)
        } else if(this.currLetter === ""){
            message = "Welcome to hangman simulator! Try to stay alive by guessing the word";
            //otherwise the game is 1. not complet yet and 2. has already begun because the current letter is not empty
        } else message = "Steve the Stickman is counting on you!";

        const imgStyle = {
            width: "500px",
            height: "500px",
            
        };

        const btnStyle = {
            fontSize: 'x-large'
        }

        return(
            <div>
                <img style={imgStyle} className={hangmanClass}></img><br/><br/><br/>
                <h1 style={messageStyle}>{message}</h1><br/>
                {/* AttemptCounter and SubmitButton are synced through their parent component, Hangman's, state */}
                <input onChange={this.updateLetter} placeholder="Enter a letter you want to guess" maxLength={1}/><br/><br/> <AttemptCounter attempts={this.state.guesses}/><br/>
                <SubmitButton clickHandler={() => this.SubmitGuess()} guesses={this.state.guesses}/><br/>
                <Answer wordLetters={this.state.answerLetters}/><br/>
                <Button style={btnStyle} variant='primary' onClick={() => this.ResetGame()}>Reset Game</Button><br/>
                <Button style={btnStyle} variant='danger' onClick={() => this.ShowHelp()}>How to play</Button><br/><br/><br/>
            </div>
        );
    }

    //method that submits a letter and checks to see whether it appears in the word or not before updating the component's state accordingly
    SubmitGuess(){
        //if the current letter is not found -> increase guesses by 1
        if(this.state.wordLetters.indexOf(this.currLetter) === -1){
            let prevGuesses = this.state.guesses;
            this.setState( {guesses: (prevGuesses+1) } );
            alert("Incorrect! \nPrevious guesses: "+prevGuesses+"\nCurrent guesses: "+(prevGuesses+1));
            //else dupe the answer letters, and replace the matching letters in the dupe with the current letter
        } else {
            let newAnswer = this.state.answerLetters;
            
            //looping through the entire word in case the letter appears multiple times
            for(let x = 0; x < newAnswer.length; x++){
                //if the answer word's current letter is the guessed letter then change the corresponding cell in the answer to the letter so it can be displayed
                if(this.state.wordLetters[x] === this.currLetter){
                    newAnswer[x] = this.currLetter;
                }
            }
            //updating the answer letters in state and checking the full answer to see if it contains no underscores and is thus complete 
            this.setState( {answerLetters: newAnswer} );
            alert("Correct! "+this.currLetter+" appears in the word");
            this.CheckFullAnswer();
        }
    }

    //method that displays a dialog box informing the user how to play the game
    ShowHelp(){
        alert("HOW TO PLAY\n\nThe number of underscores is the length of the answer word which is generated when the app is launched\n\nTo guess a letter simply type it in the appropriately labelled input box and click the submit button\n\nIf you guess a letter correctly it will be displayed at the bottom of the page\n\nIf you guess a letter incorrectly one of your guesses will be subtracted and Steve the Stickman will be one step closer to the noose!\n\nCorrectly guess the entire word's letters using no more than 9 guesses to win\n\nClick the Reset button at the bottom of the page at any time to restart the game");
    }

    //method that resets the game by resetting the component's state
    ResetGame(){
        alert("Resetting game...");

        let answer = this.SelectWord();
        
        let letters = Array.from(answer);

        let emptyAnswer = this.GenEmptyAnswerArray(answer);

        this.setState({ word: answer , guesses: 0 , userCorrect: false, wordLetters: letters , answerLetters: emptyAnswer });
    }

    //method that selects a word as the answer word and updates it in the component's state
    SelectWord(){
        let rand = parseInt(Math.random() * this.WORDS.length);
        let randWord = this.WORDS[rand];
        return randWord;
    }

    //method that checks the array of answer letters to see if all of them have been filled in
    CheckFullAnswer(){
        let underscorePos = this.state.answerLetters.indexOf("_");
        if(underscorePos === -1){
            this.setState( {userCorrect : true} );
            alert("All answer letters filled in! :)");
        }
    }

    //method that retrieves the appropriate class name for the hangman image
    GetHangmanClass(){
        switch(this.state.guesses){
            case 0:
                return "hangman-"+1;
            case 1:
                return "hangman-"+2;
            case 2:
                return "hangman-"+3;
            case 3:
                return "hangman-"+4;
            case 4:
                return "hangman-"+5;
            case 5:
                return "hangman-"+6;
            case 6:
                return "hangman-"+7;
            case 7:
                return "hangman-"+8;
            case 8:
                return "hangman-"+9;
            case 9:
                return "hangman-"+10;
            case 10:
                return "hangman-"+11;
            default:
                return "hangman-"+1;
        }
        
    }

    //returns an empty array containing underscores for each letter in the answer word
    GenEmptyAnswerArray(word){
        let emptyAnswer = [word.length] ;
        for(let x = 0; x < word.length; x++){
            emptyAnswer[x] = "_";
        }
        return emptyAnswer;
    }

}

//component that displays the number of guesses the user has made this game 
function AttemptCounter(props){
    const whiteText = {
        color: 'white'
    }
    return(
        <div>
            <h1 style={whiteText} className="attempt-counter">Failed attempts: {props.attempts}</h1><br/>
        </div>
    );
}

export default Hangman;