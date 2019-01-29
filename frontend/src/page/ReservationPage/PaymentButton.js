import React from "react";
import StripeCheckout from "react-stripe-checkout";
import handleToken  from '../../actions/handleToken';
import { connect } from "react-redux";

class PaymentButton extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for five email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  handleToken
)(PaymentButton);