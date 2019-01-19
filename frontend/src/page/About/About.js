import React from 'react';
import { Grid, Header, Image, Divider, Icon, Table } from 'semantic-ui-react'

const About = ({ match }) => {
    return (
        <Grid container verticalAlign='middle' style={{ minHeight: window.innerHeight - 300, padding: 20 }}>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Header as='h1' style={{ fontSize: '3em' }}>About</Header>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        We Help Companies and Companions
            </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        We can give your company superpowers to do things that they never thought possible.
                        Let us delight your customers and empower your needs... through pure data analytics.
            </p>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        We Make Bananas That Can Dance
            </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                        bioengineered.
            </p>
                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                    <Image bordered rounded size='large' src='https://via.placeholder.com/500x300' />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='bar chart' />
                            Specifications
                        </Header>
                    </Divider>
                    <Table definition>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>Size</Table.Cell>
                                <Table.Cell>1" x 2"</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Weight</Table.Cell>
                                <Table.Cell>6 ounces</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Color</Table.Cell>
                                <Table.Cell>Yellowish</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Odor</Table.Cell>
                                <Table.Cell>Not Much Usually</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default About