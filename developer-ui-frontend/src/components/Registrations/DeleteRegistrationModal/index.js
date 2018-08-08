import React, { Component } from "react";
import PropTypes from "prop-types";
import ConfirmationModal, {
  ConfirmationModalHeader,
  ConfirmationModalBody,
  ConfirmationModalFooter
} from "components/common/dialogModals/ConfirmationModal";

export default class DeleteRegistrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerOptionChecked: true
    };
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  onCheckboxClick() {
    this.setState(state => ({
      footerOptionChecked: !state.footerOptionChecked
    }));
  }

  confirm() {
    this.props.toggleModal(null, false);
    this.props.confirm();
  }

  render() {
    const { subject, modalShown, toggleModal } = this.props;
    return (
      <ConfirmationModal modalShown={modalShown} toggleModal={toggleModal}>
        <ConfirmationModalHeader subject={subject} />
        <ConfirmationModalBody>
          {"Are you sure, you want to delete this registration?"}
        </ConfirmationModalBody>
        <ConfirmationModalFooter
          confirm={this.confirm}
          submitType="delete"
          toggleModal={toggleModal}
          checkboxOption={{
            checkboxLabel: "Also delete all credentials for that device",
            checked: this.state.footerOptionChecked,
            onCheckboxClick: this.onCheckboxClick
          }}
        />
      </ConfirmationModal>
    );
  }
}

DeleteRegistrationModal.propTypes = {
  subject: PropTypes.string.isRequired,
  modalShown: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired
};
