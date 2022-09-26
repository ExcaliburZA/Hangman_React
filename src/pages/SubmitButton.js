import React from "react";

import {Button} from 'react-bootstrap';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';

//component that displays a functional submit button
export default function SubmitButton(props){
    const {clickHandler, guesses} = props;

    const btnStyle = {
        fontSize: 'x-large'
    }

    return(
        <div>
            <Button style={btnStyle}  variant="success" onClick={ () => clickHandler() }>Submit <br/>Guesses remaining: {9 - guesses}</Button>
        </div>
    );
}