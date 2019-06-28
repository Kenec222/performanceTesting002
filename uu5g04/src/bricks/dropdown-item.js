/**
 * Copyright (C) 2019 Unicorn a.s.
 * 
 * This program is free software; you can use it under the terms of the UAF Open License v01 or
 * any later version. The text of the license is available in the file LICENSE or at www.unicorn.com.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See LICENSE for more details.
 * 
 * You may contact Unicorn a.s. at address: V Kapslovne 2767/2, Praha 3, Czech Republic or
 * at the email: info@unicorn.com.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import * as UU5 from "uu5g04";
import ns from "./bricks-ns.js";

import Link from './link.js';
import Icon from './icon.js'
import Span from './span.js';

import './dropdown-item.less'

export default createReactClass({

  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.ContentMixin,
    UU5.Common.NestingLevelMixin,
    UU5.Common.PureRenderMixin
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Dropdown.Item"),
    nestingLevelList: UU5.Environment.getNestingLevelList('smallBoxCollection'),
    classNames: {
      main: ns.css("dropdown-item"),
      link: ns.css("dropdown-item-link"),
      divider: ns.css("dropdown-item-divider"),
      header: ns.css("dropdown-item-header"),
      subMenu: ns.css("dropdown-submenu", "dropdown-menu"),
      subMenuItem: ns.css("dropdown-item-submenu"),
      dropup: ns.css("dropdown-item-submenu-dropup"),
      disabledItem: 'disabled'
    },
    defaults: {
      childTagName: 'UU5.Bricks.Dropdown.Item'
    },
    errors: {
      maxLevel: 'Max submenu level is 3!',
      invalidParent: 'Parent of this component is not Dropdown.'
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.bool,
    divider: PropTypes.bool,
    label: PropTypes.any, // content
    href: PropTypes.string,
    onClick: PropTypes.func,
    onCtrlClick: PropTypes.func,
    onWheelClick: PropTypes.func,
    smoothScroll: PropTypes.number,
    offset: PropTypes.number,
    target: PropTypes.string,
    dropup: PropTypes.bool,
    linkProps: PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      header: false,
      divider: false,
      label: null,
      href: null,
      onClick: null,
      onCtrlClick: null,
      onWheelClick: null,
      smoothScroll: 1000,
      offset: null,
      target: '_self',
      dropup: false,
      linkProps: null
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  componentWillMount() {
    if (!this.getParentByType('isDropdown')) {
      this.showError("invalidParent");
    }
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  expandChildProps_(child) {
    let newChildProps = { ...child.props };

    newChildProps.dropup = newChildProps.dropup || this.props.dropup;

    return newChildProps;
  },
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _onClickHandler() {
    var parent = this.getParentByType('isDropdown');
    parent && parent.close();
    return this;
  },

  _getStandardItem(props) {
    let linkProps = {
      className: this.getClassName().link,
      content: this.props.label,
      parent: this,
      disabled: this.isDisabled(),
      colorSchema: 'custom'
    };

    if (!this.isDisabled()) {
      linkProps.onClick = typeof this.props.onClick === "function" ? (component, event) => this.props.onClick(this, event) : null;
      linkProps.onCtrlClick = typeof this.props.onCtrlClick === "function" ? (component, event) => this.props.onCtrlClick(this, event) : null;
      linkProps.onWheelClick = typeof this.props.onWheelClick === "function" ? (component, event) => this.props.onWheelClick(this, event) : null;
      linkProps.href = this.props.href;
      linkProps.smoothScroll = this.props.smoothScroll;
      linkProps.offset = this.props.offset;
      linkProps.target = this.props.target;

      props.onClick = this._onClickHandler;
    }

    if (this.props.linkProps) {
      linkProps = UU5.Common.Tools.merge(linkProps, this.props.linkProps);
      linkProps.content = this.props.label;
    }

    return (
      <li {...props}>
        <Link {...linkProps} />
      </li>
    );
  },

  _getDividerItem(props) {
    props.className += ' ' + this.getClassName().divider;
    return <li {...props} />;
  },

  _getHeaderItem(props) {
    props.className += ' ' + this.getClassName().header;
    return (
      <li {...props}>
        <Span content={this.props.label} />
      </li>
    );
  },

  _getContentItem(props) {
    return (
      <li {...props}>{this.getChildren()}</li>
    );
  },

  _getSubMenuItem(props) {
    let content = [this.props.label, <Icon icon='mdi-menu-right' key="icon" />];
    let linkProps = {
      className: this.getClassName().link,
      content: content,
      parent: this,
      disabled: this.isDisabled(),
      colorSchema: 'custom'
    };

    if (!this.isDisabled()) {
      linkProps.onClick = typeof this.props.onClick === "function" ? (component, event) => this.props.onClick(this, event) : null;
      linkProps.onCtrlClick = typeof this.props.onCtrlClick === "function" ? (component, event) => this.props.onCtrlClick(this, event) : null;
      linkProps.onWheelClick = typeof this.props.onWheelClick === "function" ? (component, event) => this.props.onWheelClick(this, event) : null;
      linkProps.href = this.props.href;
      linkProps.smoothScroll = this.props.smoothScroll;
      linkProps.offset = this.props.offset;
      linkProps.target = this.props.target;
      this.props.onClick && (props.onClick = this._onClickHandler);
    }

    props.className += ' ' + this.getClassName().subMenuItem;

    if (this.props.linkProps) {
      linkProps = UU5.Common.Tools.merge(linkProps, this.props.linkProps);
      linkProps.content = content;
    }

    if (this.getParent() !== null && this.getParent().getParent() !== null && this.getParent().getParent().getParent() !== null) {
      if (this.getParent().getParent().getParent().getTagName() === 'UU5.Bricks.Dropdown') {
        this.showError('maxLevel');
        return (
          <li {...props} >
            <Link {...linkProps} content={this.props.label} />
          </li>
        );
      }
    }

    return (
      <li {...props}>
        <Link {...linkProps} />

        <ul className={this.getClassName().subMenu + (this.props.dropup ? ' ' + this.getClassName().dropup : '')}>
          {this._getChildren()}
        </ul>
      </li>
    );
  },

  _getChildren() {
    var contentProps = {};

    if (this.props.items) {
      contentProps = {
        content: {
          tag: this.getDefault().childTagName,
          propsArray: this.props.items
        }
      };
    } else if (this.props.children) {
      if (this.isDynamic()) {
        contentProps = { children: this.state.children };
      } else {
        contentProps = { children: this.props.children };
      }
    }
    contentProps.nestingLevel = this.getNestingLevel();

    return this.buildChildren(contentProps);
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    let mainAttrs = this.getMainAttrs();

    if (this.isDisabled()) {
      mainAttrs.className += ' ' + this.getClassName().disabledItem;
    }

    let result = null;

    if (this.getNestingLevel()) {
      if (this.getContent()) {
        result = this._getContentItem(mainAttrs);
      } else if (this.getChildren()) {
        result = this._getSubMenuItem(mainAttrs);
      } else if (this.props.divider) {
        result = this._getDividerItem(mainAttrs);
      } else if (this.props.header) {
        result = this._getHeaderItem(mainAttrs);
      } else {
        result = this._getStandardItem(mainAttrs);
      }
    }

    return result;
  }
  //@@viewOff:render
});
