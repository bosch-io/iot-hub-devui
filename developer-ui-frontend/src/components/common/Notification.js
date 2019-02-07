/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCustomNotification as addNotification } from "actions/globalActions";
import NotificationSystem from "react-notification-system";
import { toJS } from "components/helpers/to-js";

const style = {
  Containers: {
    tr: {
      top: "7vh"
    }
  },
  NotificationItem: {
    DefaultStyle: {
      backgroundColor: "rgba(226,225,231,0.5)",
      fontWeight: 400,
      color: "#a8a9ad",
      borderTop: "none",
      boxShadow: "0px 0px 9px rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      borderRadius: "4px",
      padding: "10px 40px",
      height: "unset !important",
      overflow: "hidden !important"
    },
    success: {
      backgroundImage: `url(${require("images/pngIcons/doneIcon.png")})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "4% 50%",
      backgroundSize: "20px 20px",
      height: "unset !important",
      overflow: "hidden !important"
    },
    error: {
      backgroundImage: `url(${require("images/pngIcons/errorIconOutline.png")})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "4% 50%",
      backgroundSize: "20px 20px",
      backgroundColor: "rgba(227, 6, 19, 0.9)",
      color: "#fff"
    }
  },
  Dismiss: {
    DefaultStyle: {
      fontSize: "16px",
      backgroundColor: "#a8a9ad",
      color: "rgb(226,225,231)"
    },
    error: {
      color: "#ED473B",
      backgroundColor: "#fff"
    }
  }
};

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    const { message, level } = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level
    });
  }

  render() {
    return (
      <NotificationSystem
        ref={domNode => {
          this.notificationSystem = domNode;
        }}
        style={style}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.get("notification")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addNotification }, dispatch)
  };
}

NotificationContainer.propTypes = {
  notification: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NotificationContainer));
