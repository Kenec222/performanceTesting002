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

import ResizeItem from './resize-item.js';

import './resize.less';

export const Resize = createReactClass({

  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.ContentMixin,
    UU5.Common.NestingLevelMixin,
    UU5.Common.ResizeMixin
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Resize"),
    classNames: {
      main: ns.css("resize")
    },
    defaults: {
      childTagName: 'UU5.Bricks.Resize.Item',
      childWidth: 0,
      childHeight: 0
    },
    opt: {
      nestingLevelWrapper: true
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      height: null
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  getInitialState() {
    return {
      width: 0,
      height: 0
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.controlled) {
      if (this.state.height !== nextProps.height) {
        this.setState({ height: nextProps.height });
      }
    }
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  isResize() {
    return true;
  },
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  onResize_(oldWidth, newWidth, oldHeight, newHeight) {
    if (this.state.width !== newWidth || this.state.height !== newHeight) {
      this.setState({ width: newWidth, height: newHeight });
    }
  },

  expandChildProps_(child, index) {
    let childProps = { ...child.props };
    if (child.type && (!child.type.tagName || child.type.tagName !== ResizeItem.tagName)) {
      childProps.width = this.state ? this.state.width : this.getDefault().childWidth;
      childProps.height = this.state ? this.state.height : this.getDefault().childHeight;
    }
    return childProps;
  },
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  _getItemToRenderData(currentWidth, allItems) {
    let itemToRenderData = {};

    allItems.forEach((item, i) => {
      if (item.props.max === null && Object.keys(itemToRenderData).length === 0) {
        itemToRenderData = { item: item, index: i };
      } else if (currentWidth <= item.props.max) {
        if (Object.keys(itemToRenderData).length === 0 || item.props.max < itemToRenderData.item.props.max || itemToRenderData.item.props.max === null) {
          itemToRenderData = { item: item, index: i };
        }
      }
    });

    return itemToRenderData;
  },

  _getChildren() {
    let children = this.getChildren();
    children = Array.isArray(children) ? children.filter(item => typeof item === "object") : children;
    if (children[0] && children[0].type && children[0].type.tagName === ResizeItem.tagName) {
      let child = this._getItemToRenderData(this.state.width, children);
      children = child && child.item;
    }
    return children;
  },

  _renderChild() {
    let result = null;
    if (this.props.children) {
      switch (typeof this.props.children) {
        case "function":
          result = this.props.children({ width: this.state.width, height: this.state.height });
          break;
        case "object":
          result = this._getChildren();
          break;
      }
    }

    return result;
  },
  //@@viewOff:componentSpecificHelpers

  //@@viewOn:render
  render() {
    let props = this.getMainPropsToPass();
    props.id = this.getId();
    if (this.props.height) {
      props.style = props.style || {};
      props.style.height = this.props.height;
    }

    return (
      <UU5.Bricks.Div {...props}>
        {(!this.props.height || this.state.width) && this._renderChild()}
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

Resize.Item = ResizeItem;

export default Resize;
