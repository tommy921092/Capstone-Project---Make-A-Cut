import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Button, Icon, Form } from "semantic-ui-react";
import { InputField } from "react-semantic-redux-form";
import validate from "./validate";
import { connect } from "react-redux";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div style={{display:'inline-block'}}>
    <div>
      <label>{label}</label>
      <Field {...input} type={type} component={InputField} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderServices = ({ fields, meta: { error, submitFailed } }) => (
  <ul style={{ listStyle: "none" }}>
    <li>
      <Button icon type="button" onClick={() => fields.push()}>
        <Icon name="add" />
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((service, index) => (
      <li key={index}>
        <Button
          icon
          type="button"
          title="Remove Service"
          onClick={() => fields.remove(index)}
          style={{ float: "right" }}
        >
          <Icon name="minus" />
        </Button>
        <h4>Service #{index + 1}</h4>
        <Field
          name={`${service}.name`}
          type="text"
          component={renderField}
          label="name"
        />
        <Field
          name={`${service}.price`}
          type="number"
          component={renderField}
          label="price"
        />
        <Field
          name={`${service}.id`}
          type="number"
          component={renderField}
          label="id"
          style={{display: 'hidden'}}
        />
      </li>
    ))}
  </ul>
);

let ShopServiceForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="services" component={renderServices} />
      <div>
        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </form>
  );
};

ShopServiceForm = reduxForm({
  form: "fieldArrays", // a unique identifier for this form
  validate
})(ShopServiceForm);

ShopServiceForm = connect(state => ({
  initialValues: state.shopServiceSettings // pull initial values from reducer
}))(ShopServiceForm);

export default ShopServiceForm;
