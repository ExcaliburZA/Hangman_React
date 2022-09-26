import React from "react";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

//component that displays the user's current answer in the form of a list of letters
export default function Answer(props){
    let wordLetters = props.wordLetters;

    const groupStyle = {
        textAlign: 'center'   
    }

    const itemStyle = {
        fontSize: 'x-large',
        marginRight: '25%',
        marginLeft: '25%'
    }

    return(
        <div>
            <ListGroup style={groupStyle}>          
                {wordLetters.map(letter => (
                    <ListGroupItem variant='warning' style={itemStyle} key={Math.random()}>
                    {letter}
                    </ListGroupItem>
                ))}
            </ListGroup>  
        </div>
    );
}