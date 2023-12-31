/**
 * Copyright (C) 2021 Unicorn a.s.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License at
 * <https://gnu.org/licenses/> for more details.
 *
 * You may obtain additional information at <https://unicorn.com> or contact Unicorn a.s. at address: V Kapslovne 2767/2,
 * Praha 3, Czech Republic or at the email: info@unicorn.com.
 */

//@@viewOn:imports
import * as UU5 from "uu5g04";
import ns from "./bricks-ns.js";
import Css from "./internal/css.js";
import { InlineMode } from "./internal/inline-mode.js";

import List from "./tree-list.js";
import Item from "./tree-item.js";

import "./tree.less";
//@@viewOff:imports

const CLASS_NAMES = {
  inline: (renderDots) => {
    let dots = renderDots ? "..." : "";
    return Css.css(`
      & > *{
        pointer-events: none;
        &::after {
          content: ", ";
        }
        &:last-child{
          &::after {
            content: "${dots}";
          }
        }
      }
    `);
  },
};

let Tree = UU5.Common.VisualComponent.create({
  displayName: "Tree", // for backward compatibility (test snapshots)
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.PureRenderMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.ContentMixin,
    UU5.Common.NestingLevelMixin,
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Tree"),
    nestingLevelList: UU5.Environment.getNestingLevelList("box", "smallBox"),
    classNames: {
      main: ns.css("tree"),
      size: ns.css("tree-"),
    },
    defaults: {
      childTagName: "UU5.Bricks.Tree.Item",
    },
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    items: UU5.PropTypes.array,
    iconExpanded: UU5.PropTypes.string,
    iconCollapsed: UU5.PropTypes.string,
    size: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    allowTags: UU5.PropTypes.arrayOf(UU5.PropTypes.string),
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps: function () {
    return {
      items: null,
      iconExpanded: null,
      iconCollapsed: null,
      size: "m",
      allowTags: [],
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  isTree() {
    return true;
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getListItems() {
    let items = this.props.items || this.getChildren();
    if (items != null && !Array.isArray(items)) items = [items];
    return items;
  },

  _prepareInlineTitle() {
    let children = undefined;
    if (this.props.children) {
      children = UU5.Common.Children.toArray(this.props.children);
    }
    children = children.filter((child) => typeof child === "object");
    let renderDots = children.length > 3 ? true : false;

    if (Array.isArray(children)) {
      children = children.slice(0, 3);

      return (
        <span className={CLASS_NAMES.inline(renderDots)}>
          {children.map((item, index) => (
            <span key={index}>{item.props.label}</span>
          ))}
        </span>
      );
    }
    return undefined;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const mainPropsToPass = this.getMainPropsToPass();
    mainPropsToPass.className += " " + this.getClassName("size") + this.props.size;
    return this.getNestingLevel() ? (
      <List
        {...mainPropsToPass}
        items={this.props.items}
        iconExpanded={this.props.iconExpanded}
        iconCollapsed={this.props.iconCollapsed}
      >
        {this.props.children && UU5.Common.Children.toArray(this.props.children)}
      </List>
    ) : (
      <InlineMode
        component={this}
        Component={UU5.Bricks.Tree}
        linkTitle={this._prepareInlineTitle()}
        modalHeader={this._prepareInlineTitle()}
      />
    );
  },
  //@@viewOff:render
});

Tree.List = List;
Tree.Item = Item;

export { Tree };

export default Tree;
