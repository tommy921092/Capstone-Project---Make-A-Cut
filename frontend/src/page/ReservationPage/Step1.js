import React, { Component } from 'react'
import { Grid, Message, Form, Radio, Button, Icon } from 'semantic-ui-react'
import {
    DateInput
} from 'semantic-ui-calendar-react';

import moment from 'moment';

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '',
            unAvailable: ["09:00", "11:00", "18:00"]
        };
    }

    handleDateChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            console.log(value)
            this.setState({ [name]: value, time: '' });
        }
    }

    handleTimeChange = (e, { value }) => this.setState({ time: value })

    oneWeek = () => {
        var dateArray = []
        for (var i = 0; i <= 7; i++) {
            dateArray.push(moment().startOf('day').add(i, 'd'));
        }
        return dateArray

    }

    handleButtonClick() {
        this.props.goStep2(this.state.date,this.state.time)
    }

    render() {
        return (
            <Grid.Row centered>
                <Grid.Column width={16} style={{ padding: 30 }}>
                    <Message info>
                        <Message.Header>Confirm your details below before booking procressing:</Message.Header>
                        <p>Barber shop: {this.props.shopid}</p>
                        <p>Menu choosed: {this.props.menuid}</p>
                        <p>Client name: (Get from jkt)</p>
                        <p>Client email: (Get from jkt)</p>
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
                <Grid.Column width={6} style={{ padding: 30 }}>
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
                            style={{ textDecorationLine: this.state.unAvailable.includes("13:00") ? "line-through" : null }}
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
                disabled={!this.state.time}>
                    Next
                    <Icon name='right arrow' />
                </Button>
            </Grid.Row >


        )
    }
}

export default Step1
