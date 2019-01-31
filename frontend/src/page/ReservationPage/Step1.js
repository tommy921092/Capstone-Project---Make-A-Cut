import React, { Component } from 'react'
import { Grid, Message, Form, Radio, Button, Icon, Segment } from 'semantic-ui-react'
import {
    DateInput
} from 'semantic-ui-calendar-react';

import moment from 'moment';
import axios from 'axios';
import jwtDecode from "jwt-decode";

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTimeLoading: false,
            isLoading:true,
            date: '',
            time: '',
            unAvailable: 
            ["09:00", "10:00", "11:00", "12:00", "13:00" ,"14:00",
            "15:00", "16:00" , "17:00" , "18:00" , "19:00" ,"20:00",
            "21:00" ,"22:00"],
            shopname: '',
            menuname: '',
            menuprice:'',
            username: '',
            useremail:''
        };
    }

    componentDidMount() {
        axios.get(`/api/menu/${this.props.menuid}`)
        .then((result)=>{
            if(result.data !== "No data"){
                let decodedToken = {}
                if(localStorage.jwtToken){
                    decodedToken = jwtDecode(localStorage.jwtToken);
                }

                this.setState({
                    isLoading: false,
                    shopname: result.data.shopname,
                    menuname: result.data.name,
                    menuprice:result.data.price,
                    username: decodedToken.fullname,
                    useremail: decodedToken.email
                })
            }
        })
    }

    handleDateChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {

            this.setState({
                isTimeLoading:true,
                [name]: value, 
                time: ''
            })

            axios.get(`/api/menu/date/${this.props.menuid}`)
            .then((result)=>{
                if(result.data.length > 0) {
                    const bookingArray = result.data
                    const onlyTime = bookingArray.filter((time) => time.startsWith(this.state.date));
                    const mappedResult = onlyTime.map(x => x.slice(11))
                    console.log(mappedResult)
                    this.setState({ 
                        isTimeLoading: false,
                        unAvailable: mappedResult
                    });
                } else {
                    this.setState({ 
                        isTimeLoading: false,
                        unAvailable: []});
                }
            })

        }
    }

    handleTimeChange = (e, { value }) => this.setState({ time: value })

    oneWeek = () => {
        var dateArray = []
        for (var i = 0; i <= 7; i++) {
            dateArray.push(moment().startOf('day').add(i, 'd'));
        }
        console.log(dateArray)
        return dateArray

    }

    handleButtonClick() {
        this.props.goStep2(this.state.date,this.state.time)
    }

    render() {
        return (
            <Segment as={Grid} basic loading={this.state.isLoading}>
            <Grid.Row centered>
                <Grid.Column width={16} style={{ padding: 30 }}>
                    <Message info>
                        <Message.Header>Confirm your details below before booking procressing:</Message.Header>
                        <p>Barber shop: {this.state.shopname}</p>
                        <p>Menu choosed: {this.state.menuname}</p>
                        <p>Menu price: HKD$ {this.state.menuprice}</p>
                        <p>User Full name: {this.state.username}</p>
                        <p>User email: {this.state.useremail}</p>
                        <p style={{ textAlign: 'center', color: "red" }}><b>Make sure all the details above correct</b></p>
                    </Message>
                </Grid.Column>

                <Grid.Column width={10} style={{ padding: 30 }}>
                    <Form>
                        <DateInput
                            inline
                            name='date'
                            value={this.state.date}
                            onChange={this.handleDateChange}
                            enable={this.oneWeek()}
                        />
                    </Form>
                </Grid.Column>
                <Grid.Column 
                    as={Segment}
                    loading={this.state.isTimeLoading}
                    width={6} style={{ padding: 20 , borderStyle: "dotted",borderWidth:1}}>
                    <Form.Field>
                        Selected TimeSlot: <b>{this.state.time}</b>
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='09:00'
                            name='radioGroup'
                            value='09:00'
                            checked={this.state.time === '09:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("09:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("09:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='10:00'
                            name='radioGroup'
                            value='10:00'
                            checked={this.state.time === '10:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("10:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("10:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='11:00'
                            name='radioGroup'
                            value='11:00'
                            checked={this.state.time === '11:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("11:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("11:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='12:00'
                            name='radioGroup'
                            value='12:00'
                            checked={this.state.time === '12:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("12:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("12:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='13:00'
                            name='radioGroup'
                            value='13:00'
                            checked={this.state.time === '13:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("13:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("13:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='14:00'
                            name='radioGroup'
                            value='14:00'
                            checked={this.state.time === '14:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("14:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("14:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='15:00'
                            name='radioGroup'
                            value='15:00'
                            checked={this.state.time === '15:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("15:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("15:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='16:00'
                            name='radioGroup'
                            value='16:00'
                            checked={this.state.time === '16:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("16:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("16:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='17:00'
                            name='radioGroup'
                            value='17:00'
                            checked={this.state.time === '17:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("17:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("17:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='18:00'
                            name='radioGroup'
                            value='18:00'
                            checked={this.state.time === '18:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("18:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("18:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='19:00'
                            name='radioGroup'
                            value='19:00'
                            checked={this.state.time === '19:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("19:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("19:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='20:00'
                            name='radioGroup'
                            value='20:00'
                            checked={this.state.time === '20:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("20:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("20:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='21:00'
                            name='radioGroup'
                            value='21:00'
                            checked={this.state.time === '21:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("21:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("21:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='22:00'
                            name='radioGroup'
                            value='22:00'
                            checked={this.state.time === '22:00'}
                            onChange={this.handleTimeChange}
                            readOnly={this.state.unAvailable.includes("22:00")}
                            style={{ textDecorationLine: this.state.unAvailable.includes("22:00") ? "line-through" : null }}
                        />
                    </Form.Field>
                </Grid.Column>
                <Button 
                icon 
                labelPosition='right' 
                color="blue" 
                style={{textAlign:"center"}} 
                onClick={this.handleButtonClick.bind(this)}
                disabled={!this.state.time || !this.state.date}>
                    Next
                    <Icon name='right arrow' />
                </Button>
            </Grid.Row >
            </Segment>


        )
    }
}

export default Step1
