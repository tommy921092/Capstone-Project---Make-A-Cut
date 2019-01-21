import React, { Component } from 'react';
import { Segment, Container, Header, Icon, Form, Select, Input, List, Grid } from 'semantic-ui-react'

import Recommend from './Recommend'
import Article from './Article'

import bg from './img/bg.jpeg';

const locationOptions = [
    { key: '1', text: 'Central and Western', value: 'Central and Western' },
    { key: '2', text: 'Wan Chai', value: 'Wan Chai' },
]


export default class HomePage extends Component {

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            alert('enter press here! ')
        }
    }

    render() {
        return (
            <Container fluid>
                <Segment basic inverted style={{
                    height: 600, margin: 0,
                    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url(${bg})`,
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <Container text fluid textAlign='center'>
                        <Header as='h1'
                            content='Find your style...'
                            inverted
                            style={{
                                fontSize: '4rem',
                                marginTop: '10%',
                                opacity: 0.8
                            }}>
                        </Header>
                        <Segment placeholder style={{ opacity: 0.8, padding: '2rem' }}>
                            <Form>
                                <p style={{ fontSize: '1.25rem', color: '#990036' }}>Selecting your own barber shop in:</p>
                                <Form.Field
                                    inline
                                    control={Select}
                                    options={locationOptions}
                                    placeholder='Location'
                                    search
                                    searchInput={{ id: 'form-select-control-gender' }}
                                />
                                <p style={{ fontSize: '2rem' }}><b>OR</b></p>
                                <Input onKeyPress={this.handleKeyPress} onChange={(e) => console.log(e.target.value)} icon='search' placeholder='Search By Name' />
                            </Form>
                        </Segment>
                    </Container>
                </Segment >
                <Container style={{ padding: '6rem' }}>
                    <Header
                        textAlign="center"
                        as="h1">Featured Shop</Header>
                    <Recommend />
                </Container>
                <Container fluid style={{ padding: '6rem', backgroundColor: '#8B0000' }}>
                    <Header
                        inverted
                        textAlign="center"
                        as="h1">Barber News</Header>
                    <Article />
                </Container>
            </Container>
        )
    }
}