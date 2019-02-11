import React from 'react';
import { Grid, Header, Image, Divider, Icon, Table } from 'semantic-ui-react'
import logohcpng from './img/logohcpng.png'

const About = ({ match }) => {
    return (
        <Grid container verticalAlign='middle' style={{ minHeight: window.innerHeight - 300, padding: 20 }}>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Header as='h1' style={{ fontSize: '3em' }}>About</Header>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        We Help those who want to find barber shop in HK.
            </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    Looking for a barber shop in Hong Kong is no longer painful.
                    Find your barber shop in our platform and you will find that it's extremly Easy!
            </p>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        We Make Bananas That Can Dance
            </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                        bioengineered. Use your bananas to book online now!
            </p>
                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                    <Image bordered rounded size='medium' src={logohcpng} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='question circle' />
                            Some Facts
                        </Header>
                    </Divider>
                    <Table definition>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>Project Name</Table.Cell>
                                <Table.Cell>Book-A-Cut</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Also called</Table.Cell>
                                <Table.Cell>Hairless Cut</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Team Member</Table.Cell>
                                <Table.Cell>Danny, Ernest, Oliver, Tommy</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Address</Table.Cell>
                                <Table.Cell>Sino Plaza</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default About