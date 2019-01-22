import React, { Component } from 'react';
import { Segment, Container, Header, Form, Select, Input } from 'semantic-ui-react'

import Recommend from './Recommend'
import Article from './Article'

import bg from './img/bg.jpeg';

const locationOptions = [
    { key: '1', text: 'Central and Western', value: 'Central and Western' },
    { key: '2', text: 'Wan Chai', value: 'Wan Chai' },
    { key: '3', text: 'Eastern', value: 'Eastern' },
    { key: '4', text: 'Southern', value: 'Southern' },
    { key: '5', text: 'Yau Tsim Mong', value: 'Yau Tsim Mong' },
    { key: '6', text: 'Sham Shui Po', value: 'Sham Shui Po' },
    { key: '7', text: 'Kowloon City', value: 'Kowloon City' },
    { key: '8', text: 'Wong Tai Sin', value: 'Wong Tai Sin' },
    { key: '9', text: 'Kwun Tong', value: 'Kwun Tong' },
    { key: '10', text: 'Kwai Tsing', value: 'Kwai Tsing' },
    { key: '11', text: 'Tsuen Wan', value: 'Tsuen Wan' },
    { key: '12', text: 'Tuen Mun', value: 'Tuen Mun' },
    { key: '13', text: 'Yuen Long', value: 'Yuen Long' },
    { key: '14', text: 'North', value: 'North' },
    { key: '15', text: 'Tai Po', value: 'Tai Po' },
    { key: '16', text: 'Sha Tin', value: 'Sha Tin' },
    { key: '17', text: 'Sai Kung', value: 'Sai Kung' },
    { key: '18', text: 'Islands', value: 'Islands' }
]


export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchNameField: ""
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if(this.state.searchNameField === ""){
                alert('Please enter a barber shop name')
            } else {
                this.props.history.push(`/search?name=${this.state.searchNameField}`)
            }
        }
    }

    handleOnChange = (event) =>{
        this.setState({
            searchNameField:event.target.value
        })
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
                                    searchInput={{ id: 'form-select-control-location' }}
                                    onChange={(e,data)=>{console.log(data.value)}}
                                />
                                <p style={{ fontSize: '2rem' }}><b>OR</b></p>
                                <Input onKeyPress={this.handleKeyPress} onChange={this.handleOnChange} icon='search' placeholder='Search By Name' />
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