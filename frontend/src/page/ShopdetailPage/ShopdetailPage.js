import React, { Component } from 'react';
import { Grid, Segment, Header, Label } from 'semantic-ui-react'

import BasicInfo from './BasicInfo';
import ImageCarousel from './ImageCarousel';
import StylistList from './StylistList';
import ServiceList from './ServiceList'
import UserComment from './UserComment'

import 'pure-react-carousel/dist/react-carousel.es.css'



export default class ShopdetailPage extends Component {

    render() {
        return (

            <Grid container verticalAlign='top' style={{ minHeight: window.innerHeight * 0.8, padding: 20 }}>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <ImageCarousel />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Header as='h2' attached='top'>
                            (ShopName)
                            <Label>label1</Label>
                            <Label>label2</Label>
                            <Label>label3</Label>
                        </Header>
                        <Segment attached piled style={{ minHeight: 200, maxHeight: 200 }}>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", height: 180 }}>
                                (Shop description)
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        </div>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Label color='blue' ribbon>
                                Info
                            </Label>
                            <span>Barber Details</span>
                            <BasicInfo/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Label color='red' ribbon>
                                Stylist
                            </Label>
                            <span>Shop Stylist</span>
                            <StylistList/>
                            <StylistList/>
                            <StylistList/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Label color='pink' ribbon>
                                Menu
                            </Label>
                            <span>Service Provided</span>
                            <br></br>
                            <ServiceList/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Label color='purple' ribbon>
                                Comment
                            </Label>
                            <br></br>
                            <UserComment/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}