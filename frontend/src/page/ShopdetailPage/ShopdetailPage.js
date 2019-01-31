import React, { Component } from 'react';
import { Grid, Segment, Header, Label, Dimmer, Loader, Image} from 'semantic-ui-react'

import BasicInfo from './BasicInfo';
import ImageCarousel from './ImageCarousel';
import StylistList from './StylistList';
import ServiceList from './ServiceList'
import UserComment from './UserComment'

import 'pure-react-carousel/dist/react-carousel.es.css'

import axios from 'axios'



export default class ShopdetailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            shopData: {
                tag: [],
                photo: [""]
            },
            menuData: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/shop/${this.props.match.params.shopid}`)
            .then((result) => {
                if (result.status === 200 && result.data.length > 0) {
                    let shopData = result.data[0]
                    this.setState({
                        shopData
                    })
                    axios.get(`/api/shop/menu/${this.props.match.params.shopid}`)
                    .then((result2)=>{
                        if(result2.status === 200) {
                            let menuData = result2.data
                            this.setState({
                                isLoading: false,
                                menuData
                            })
                        }
                    })
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const colors = [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black',
        ]

        const tagList = this.state.shopData.tag.map((tag) =>
            <Label key={tag} color={colors[Math.floor(Math.random() * colors.length)]}>{tag}</Label>
        );

        const renderObj = (<Grid container verticalAlign='top' style={{ minHeight: window.innerHeight * 0.8, padding: 20 }}>
            <Grid.Row>
                <Grid.Column width={4}>
                    <ImageCarousel photoArray={this.state.shopData.photo} />
                </Grid.Column>
                <Grid.Column width={12}>
                    <Header as='h2' attached='top'>
                        {this.state.shopData.shopname}
                        {tagList}
                    </Header>
                    <Segment attached piled style={{ minHeight: 200, maxHeight: 200 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", height: 180 }}>
                            {this.state.shopData.description}
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
                        <span>Shop Details</span>
                        <BasicInfo shopData={this.state.shopData} />
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
                        <StylistList />
                        <StylistList />
                        <StylistList />
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
                        <ServiceList menuData={this.state.menuData} />
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
                        <UserComment />
                    </Segment>
                </Grid.Column>
            </Grid.Row>

        </Grid>)

        const loader = (  <Segment>
            <Dimmer active>
              <Loader />
            </Dimmer>
        
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment>)

        return (
            <div>
                {this.state.isLoading ? loader : renderObj}
            </div>
        )
    }
}