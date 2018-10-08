import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ name, label }, i) => (
      <Field
        key={i}
        type="text"
        name={name}
        label={label}
        component={SurveyField}
      />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  if (!values.title) {
    errors.title = "You must provide a title.";
  }
  if (!values.subject) {
    errors.subject = "You must provide a subject.";
  }
  if (!values.body) {
    errors.body = "You must provide an email body.";
  }
  if (!values.recipients) {
    errors.recipients = "You must provide a valid email address.";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
