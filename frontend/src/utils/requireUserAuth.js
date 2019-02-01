import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

export default function(ComposedComponent) {
    class Authenticate extends Component {
      constructor(props){
        super(props)
        this.state={
          authorizated: false
        }
      }
      
      componentWillMount() {
        if (!this.props.isAuthenticated || this.props.merchant) {
          console.log(this.props.merchant)
          alert('You need to login in, as a user!!')
          this.props.history.push('/');
        } else {
          this.setState({authorizated: true})
        }
      }
  
      componentWillUpdate(nextProps) {
        if (!nextProps.isAuthenticated) {
          this.props.history.push('/');
        } else {
          this.setState({authorizated: true})
        }
      }

      render() {
        return (
          this.state.authorizated && <ComposedComponent { ...this.props } />
        );
      }
    }

    const mapStateToProps = (state) => {
      return {
        isAuthenticated: state.auth.isAuthenticated,
        merchant:state.auth.merchant
      };
    };
  
    return withRouter(connect(mapStateToProps)(Authenticate));
  }
