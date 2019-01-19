import React, { Component } from 'react';
import { Menu, Segment, Container, Responsive } from 'semantic-ui-react'
import LoginModal from '../page/Login/LoginModal';

export default class Navbar extends Component {
    state = { activeItem: 'home'};
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state

        return (
            <Responsive>
                <Segment basic inverted style={{ margin: 0 }}>
                    <Menu
                        stackable
                        inverted
                        secondary
                        visible="false"
                    >
                        <Container>
                            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                            <Menu.Item
                                name='about'
                                active={activeItem === 'about'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='search'
                                active={activeItem === 'search'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='articles'
                                active={activeItem === 'articles'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Menu position='right'>
                                <Menu.Item as={LoginModal}
                                    name='login'
                                    active={activeItem === 'login'}
                                    onClick={this.handleItemClick}>
                                    
                                </Menu.Item>
                            </Menu.Menu>
                        </Container>
                    </Menu>
                </Segment >
            </Responsive>
        )
    }
}