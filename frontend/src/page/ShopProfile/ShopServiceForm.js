import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Button, Icon } from "semantic-ui-react";
import { InputField } from "react-semantic-redux-form";
import validate from "./validate";
import { connect } from "react-redux";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div style={{display:"inline-block", padding:20}}>
      <label>{label}</label>
      <Field parse={value => isNaN(value) === false ? Number(value) : value} {...input} type={type} component={InputField} style={{width:"auto"}}/>
      {touched && error && <span>{error}</span>}
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
          onClick={(e) => {
            fields.remove(index)
          }
          }
          style={{ float: "right"}}
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
        <span style={{display:"none"}}>
        <Field
          name={`${service}.id`}
          type="number"
          component={renderField}
          label="id"
        />
        </span>
      </li>
    ))}
  </ul>
);

let ShopServiceForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="services" component={renderServices}/>
      <div>
        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

ShopServiceForm = reduxForm({
  form: "fieldArrays", // a unique identifier for this form
  validate,
  enableReinitialize: true
})(ShopServiceForm);

ShopServiceForm = connect(state => ({
  initialValues: state.shopServiceSettings // pull initial values from reducer
}))(ShopServiceForm);

export default ShopServiceForm;
