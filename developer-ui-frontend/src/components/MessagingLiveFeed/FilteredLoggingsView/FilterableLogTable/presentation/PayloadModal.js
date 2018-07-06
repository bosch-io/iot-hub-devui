/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import "styles/prism-duotone.scss";
import PropTypes from "prop-types";
import { formatDateString } from "utils";

// Modal for shortened payload entries
import Modal from "react-modal";
// Code Syntax Highlighting for the modal view (Prism.js)
import Prism from "prismjs";
import Parser from "html-react-parser";
import Normalizer from "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import "prismjs/components/prism-php.min.js";
import "prismjs/components/prism-yaml.min.js";
import "prismjs/components/prism-wiki.min.js";
import "prismjs/components/prism-markdown.min.js";
import "prismjs/components/prism-json.min.js";
import { RoundOutlineButton } from "components/common/buttons";

const normalizer = new Normalizer({
  "remove-trailing": true,
  "remove-indent": true,
  "left-trim": true,
  "right-trim": true,
  "tabs-to-spaces": 0,
  "spaces-to-tabs": 4
});

export default class PayloadModal extends React.Component {
  constructor(props) {
    super(props);
    this.getLanguageFormat = this.getLanguageFormat.bind(this);
  }

  componentDidMount() {
    Modal.setAppElement("#filterable-table");
  }

  getLanguageFormat() {
    const contentType = this.props.modalMessage.message.contentType;
    let language = Prism.languages.markup; // Markup (XML,HTML,SVG) is fallback
    if (
      contentType.includes("xml") ||
      contentType.includes("html") ||
      contentType.includes("svg")
    ) {
      language = Prism.languages.markup;
    } else if (contentType.includes("json")) {
      language = Prism.languages.json;
    } else if (contentType.includes("yaml")) {
      language = Prism.languages.yaml;
    } else if (contentType.includes("wiki")) {
      language = Prism.languages.wiki;
    } else if (contentType.includes("md") || contentType.includes("markdown")) {
      language = Prism.languages.markdown;
    } else if (contentType.includes("php")) {
      language = Prism.languages.php;
    }
    return language;
  }

  render() {
    const { modalMessage, handleCloseModal, showModal } = this.props;
    return (
      <Modal
        ariaHideApp={false}
        overlayClassName="confirmation-modal"
        className="payload-modal-inner"
        isOpen={showModal}
        closeTimeoutMS={150}
        contentLabel="Payload Modal">
        <div id="modal-header">
          <h5>Payload</h5>
          <p>
            {modalMessage ? modalMessage.message.type : ""} message from&nbsp;
            {modalMessage ? formatDateString(modalMessage.time) : ""}
          </p>
          <button id="close-btn" onClick={handleCloseModal}>
            x
          </button>
        </div>
        <div id="payload-code-block">
          <pre className="custom-scrollbar-2">
            {modalMessage
              ? Parser(
                  Prism.highlight(
                    normalizer.normalize(modalMessage.message.content),
                    this.getLanguageFormat()
                  )
                )
              : ""}
          </pre>
          <RoundOutlineButton secondary onClick={handleCloseModal}>
            CLOSE
          </RoundOutlineButton>
        </div>
      </Modal>
    );
  }
}

PayloadModal.propTypes = {
  /**
   * Whether or not the modal is shown
   */
  showModal: PropTypes.bool.isRequired,
  /**
   * The log entry object that get displayed
   */
  modalMessage: PropTypes.object,
  /**
   * Function to open the modal/ set the state in the LogTable component
   */
  handleOpenModal: PropTypes.func.isRequired,
  /**
   * Function to close the modal/ set the state in the LogTable component
   */
  handleCloseModal: PropTypes.func.isRequired
};
