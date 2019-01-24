import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

export default function(ComposedComponent) {
    class Authenticate extends Component {
      componentWillMount() {
        if (!this.props.isAuthenticated) {
            alert('You need to login in!')
          this.props.history.push('/');
        }
      }
  
      componentWillUpdate(nextProps) {
        if (!nextProps.isAuthenticated) {
          this.props.history.push('/');
        }
      }
  
      render() {
        return (
          <ComposedComponent { ...this.props } />
        );
      }
    }

    const mapStateToProps = (state) => {
      return {
        isAuthenticated: state.auth.isAuthenticated
      };
    };
  
    return withRouter(connect(mapStateToProps)(Authenticate));
  }
