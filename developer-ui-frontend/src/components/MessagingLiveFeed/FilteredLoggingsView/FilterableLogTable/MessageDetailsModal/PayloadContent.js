/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
// Code Syntax Highlighting for the modal view (Prism.js)
import Prism from "prismjs";
import Parser from "html-react-parser";
import Normalizer from "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import "prismjs/components/prism-php.min.js";
import "prismjs/components/prism-yaml.min.js";
import "prismjs/components/prism-wiki.min.js";
import "prismjs/components/prism-markdown.min.js";
import "prismjs/components/prism-json.min.js";

const normalizer = new Normalizer({
  "remove-trailing": true,
  "remove-indent": true,
  "left-trim": true,
  "right-trim": true,
  "tabs-to-spaces": 0,
  "spaces-to-tabs": 4
});
class PayloadContent extends Component {
  constructor(props) {
    super(props);
    this.getLanguageFormat = this.getLanguageFormat.bind(this);
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
    const { modalMessage } = this.props;
    return (
      <div id="payload-code-block">
        <h5>Payload</h5>
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
      </div>
    );
  }
}

PayloadContent.propTypes = {
  modalMessage: PropTypes.object
};

export default PayloadContent;
