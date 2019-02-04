import React from "react";
import { Message, Container } from "semantic-ui-react";

function NoMatch() {
    return (
        <div>
            <Container fluid textAlign="center" style={{minHeight:"70vh"}}>
            <Message negative>
                <Message.Header>404 Not Found</Message.Header>
                <p>Maybe you type a wrong url?</p>
            </Message>
            </Container>
        </div>
    );
}

export default NoMatch;