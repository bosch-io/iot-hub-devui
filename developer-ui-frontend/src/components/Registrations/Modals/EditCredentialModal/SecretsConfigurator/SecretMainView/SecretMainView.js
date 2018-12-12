/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import SecretMainViewBody from "./SecretMainViewBody";
import { FlatButton } from "components/common/buttons";
import { withContentRect } from "react-measure";

/*
  This component uses CSS based transitions to animate the currently selected secret as
  a card. The card is translated relative to its offset with the currently selected
  card index (which is provided through the selectedSecret-prop).
  The translation is applied through a x-axis translation and through a z-axis translation.
*/

const calcTranslation = (diffIndex, scaling) => {
  if (diffIndex < 1) {
    return -1 * scaling * Math.log2(Math.abs(diffIndex) + 1);
  }
  return scaling * Math.log2(diffIndex + 1);
};

const calcOpacity = (diffIndex, scaling) => {
  if (diffIndex < 1) {
    return -1 * (1 / scaling) * Math.abs(diffIndex) + 1;
  }
  return -1 * (1 / scaling) * diffIndex + 1;
};

const SecretMainView = ({
  secrets,
  contentRect,
  inEditingMode,
  toggleEditingMode,
  measureRef,
  selectedSecret
}) => (
  <div ref={measureRef} className="secrets-config-inner">
    {secrets.map((secret, index) => (
      <div
        key={secret.secretId}
        className="secret"
        style={{
          transform: `perspective(100px) translateX(${
            contentRect.client.width
              ? calcTranslation(
                  index - selectedSecret,
                  contentRect.client.width / 8
                )
              : 0
          }px) translateZ(${calcTranslation(
            Math.abs(index - selectedSecret),
            -20
          )}px)`,
          opacity: calcOpacity(index - selectedSecret, 4),
          zIndex: index === selectedSecret ? 3 : -2
        }}
      >
        <span
          className={`animated-card  ${
            index === selectedSecret ? "selected" : ""
          }`}
        >
          <SecretMainViewBody
            key={secret.secretId}
            secret={secret}
            inEditingMode={inEditingMode}
          />
          {inEditingMode && (
            <div className="fixed-footer">
              <FlatButton primary submitAnimation type="submit">
                Save
              </FlatButton>
            </div>
          )}
        </span>
      </div>
    ))}
  </div>
);

SecretMainView.propTypes = {
  secrets: PropTypes.arrayOf(
    PropTypes.shape({
      secretId: PropTypes.string.isRequired,
      pwdHash: PropTypes.string,
      "not-before": PropTypes.string,
      "not-after": PropTypes.string,
      salt: PropTypes.string
    })
  ),
  contentRect: PropTypes.object,
  measureRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  selectedSecret: PropTypes.number,
  inEditingMode: PropTypes.bool.isRequired,
  toggleEditingMode: PropTypes.func.isRequired,
  secretIndex: PropTypes.number
};

export default withContentRect("client")(SecretMainView);
