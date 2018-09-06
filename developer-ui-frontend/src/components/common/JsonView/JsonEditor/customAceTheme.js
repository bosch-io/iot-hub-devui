/* eslint-disable */
ace.define(
  "ace/theme/prism_duo_tone",
  ["require", "exports", "module", "ace/lib/dom"],
  function(acequire, exports, module) {
    exports.isDark = true;
    exports.cssClass = "prism-duo-tone";
    exports.cssText =
      ".prism-duo-tone .ace_gutter {\
  background: #1d2026;\
  color: #848d9e\
  }\
  .prism-duo-tone .ace_print-margin {\
  width: 1px;\
  background: #00204b\
  }\
  .prism-duo-tone {\
  background-color: #282c34;\
  color: #c0c0c0\
  }\
  .prism-duo-tone .ace_constant.ace_other,\
  .prism-duo-tone .ace_cursor {\
  color: #FFFFFF\
  }\
  .prism-duo-tone .ace_content {\
    padding: 0 6px;\
  }\
  .prism-duo-tone .ace_marker-layer .ace_selection {\
  background: #003F8E\
  }\
  .prism-duo-tone.ace_multiselect .ace_selection.ace_start {\
  box-shadow: 0 0 3px 0px #282c34;\
  }\
  .prism-duo-tone .ace_marker-layer .ace_step {\
  background: rgb(127, 111, 19)\
  }\
  .prism-duo-tone .ace_marker-layer .ace_bracket {\
  margin: -1px 0 0 -1px;\
  border: 1px solid #404F7D\
  }\
  .prism-duo-tone .ace_marker-layer .ace_active-line {\
  background: #282c34\
  }\
  .prism-duo-tone .ace_gutter-active-line {\
  background-color: #000\
  }\
  .prism-duo-tone .ace_marker-layer .ace_selected-word {\
  border: 1px solid #003F8E\
  }\
  .prism-duo-tone .ace_invisible {\
  color: #404F7D\
  }\
  .prism-duo-tone .ace_keyword,\
  .prism-duo-tone .ace_meta,\
  .prism-duo-tone .ace_storage,\
  .prism-duo-tone .ace_storage.ace_type,\
  .prism-duo-tone .ace_support.ace_type {\
  color: #EBBBFF\
  }\
  .prism-duo-tone .ace_keyword.ace_operator {\
  color: #99FFFF\
  }\
  .prism-duo-tone .ace_constant.ace_character,\
  .prism-duo-tone .ace_constant.ace_language,\
  .prism-duo-tone .ace_constant.ace_numeric,\
  .prism-duo-tone .ace_keyword.ace_other.ace_unit,\
  .prism-duo-tone .ace_support.ace_constant,\
  .prism-duo-tone .ace_variable.ace_parameter {\
  color: #25a3cc\
  }\
  .prism-duo-tone .ace_invalid {\
  color: #FFFFFF;\
  background-color: #F99DA5\
  }\
  .prism-duo-tone .ace_invalid.ace_deprecated {\
  color: #FFFFFF;\
  background-color: #EBBBFF\
  }\
  .prism-duo-tone .ace_fold {\
  background-color: #000;\
  border-color: #000;\
  }\
  .prism-duo-tone .ace_entity.ace_name.ace_function,\
  .prism-duo-tone .ace_support.ace_function,\
  .prism-duo-tone .ace_variable {\
  color: #BBDAFF\
  }\
  .prism-duo-tone .ace_support.ace_class,\
  .prism-duo-tone .ace_support.ace_type {\
  color: #FFEEAD\
  }\
  .prism-duo-tone .ace_heading,\
  .prism-duo-tone .ace_markup.ace_heading,\
  .prism-duo-tone .ace_string {\
  color: rgba(37, 162, 204, 0.8)\
  }\
  .prism-duo-tone .ace_entity.ace_name.ace_tag,\
  .prism-duo-tone .ace_entity.ace_other.ace_attribute-name,\
  .prism-duo-tone .ace_meta.ace_tag,\
  .prism-duo-tone .ace_string.ace_regexp,\
  .prism-duo-tone .ace_variable {\
  color: #c0c0c0;\
  font-weight: 600;\
  }\
  .prism-duo-tone .ace_comment {\
  color: #7285B7\
  }\
  .prism-duo-tone .ace_indent-guide {\
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYJDzqfwPAANXAeNsiA+ZAAAAAElFTkSuQmCC) right repeat-y\
  }";

    var dom = acequire("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
  }
);
