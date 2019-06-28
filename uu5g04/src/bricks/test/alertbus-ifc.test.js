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
import {shallow, render} from 'enzyme';
import UU5 from "uu5g04";
import "uu5g04-bricks";
import enzymeToJson from 'enzyme-to-json';

const TagName = "UU5.Bricks.AlertBus";

var props = {
  colorSchema: 'yellow',
  id: "ID_OF_ALERT",
  content: <UU5.Bricks.Strong>This is content in Bricks.Alert</UU5.Bricks.Strong>,
};

describe(`${TagName} interface testing`, () => {


  /**
   * First it is tested that alertStack is empty. No component alert was inserted into the stack.
   * After that, the addAlert interface is called and it is verified that the Alert component has been inserted object of alert components.
   */
  it(`${TagName} addAlert()`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );
    const mockFunc = jest.fn();
    //make a snapshot before calling interface
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    //Alertbus array is empty before calling addAlert()
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    //Here you have to fill out an alert id that is inserted into the alertBus component,
    //otherwise the new ID and Snapshot snapshots will be assigned to each rendering.
    const returnValue = wrapper.instance().addAlert({id: "id_alert_bus", content: "Obsah alertu"}, mockFunc);
    //for render changes to snapshots
    wrapper.update();
    expect(wrapper.instance().getAlerts()).not.toBeNull();
    expect(mockFunc).toBeCalled();
    // test of returned value - in this case instance of tested component
    expect(returnValue).toBe(wrapper.instance());
    expect(wrapper.instance().state.alertStack).toHaveLength(1);
    //changes: add alert to stack is in the snapshot.
    //The second snapshot contain id and content of alert.
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  /**
   * First it is tested that alertStack is empty. No component alert was inserted into the stack.
   * After that, the addAlertToPosition with index 1 and 2 is called twice. When the interface is called,
   * a snapshot is taken to see that two alert components have been added to the alertStack.
   */
  it(`${TagName} addAlertToPosition()`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );
    const mockFunc = jest.fn();
    //make a snapshot before calling interface
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    //Alertbus array is empty before calling addAlert()
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    //Here you have to fill out an alert id that is inserted into the alertBus component,
    //otherwise the new ID and Snapshot snapshots will be assigned to each rendering.
    const returnValue = wrapper.instance().addAlertToPosition(1, {
      id: "id_alert_in_busFIRST",
      content: "Obsah alertu na první pozici"
    }, mockFunc);
    const returnValue2 = wrapper.instance().addAlertToPosition(2, {
      id: "id_alert_in_busSECOND",
      content: "Obsah alertu na druhé pozici"
    }, mockFunc);
    //for render changes to snapshots
    wrapper.update();
    expect(wrapper.instance().state.alertStack).toHaveLength(2);
    expect(mockFunc).toBeCalled();
    expect(mockFunc).toHaveBeenCalledTimes(2);
    // test of returned value - in this case instance of tested component
    expect(returnValue).toBe(wrapper.instance());
    expect(returnValue2).toBe(wrapper.instance());
    //changes: add alert to stack is in the snapshot.
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  /**
   * Tests correct propagation from API of AlertBus to props of inner Alert component.
   */

  it(`${TagName} addAlert() with header`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );
    const withHeaderProps = UU5.Common.Tools.merge(
      {
        header: <UU5.Bricks.Strong>Alert header</UU5.Bricks.Strong>
      },
      props
    );
    const mockFunc = jest.fn();
    //make a snapshot before calling interface
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    //Alertbus array is empty before calling addAlert()
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    const returnValue = wrapper.instance().addAlert(withHeaderProps, mockFunc);
    //for render changes to snapshots
    wrapper.update();
    expect(wrapper.instance().state.alertStack).toHaveLength(1);
    expect(mockFunc).toBeCalled();
    expect(mockFunc).toHaveBeenCalledTimes(1);
    // test of returned value - in this case instance of tested component
    expect(returnValue).toBe(wrapper.instance());
    //changes: add alert to stack is in the snapshot.
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  /**
   * First it is tested that alertStack is empty. No component alert was inserted into the alertStack array.
   * Then the addAlert interface is called and the bricks.alert component is inserted into the snapshot,
   * which is in the alertStack array. Before calling the interface, this array is empty.
   */

  it(`${TagName} setAlert()`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );
    const mockFunc = jest.fn();
    //make a snapshot before calling interface
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    //Alertbus array is empty before calling addAlert()
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    const returnValue = wrapper.instance().setAlert(props, mockFunc);
    //for render changes to snapshots
    wrapper.update();
    expect(wrapper.instance().state.alertStack).toHaveLength(1);
    expect(mockFunc).toBeCalled();
    expect(mockFunc).toHaveBeenCalledTimes(1);
    // test of returned value - in this case instance of tested component
    expect(returnValue).toBe(wrapper.instance());
    //changes: add alert to stack is in the snapshot.
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  /**
   *First, a test is made that Stack alert is empty.
   * Then, a component alert is added to the queue using the addAlert interface.
   * When an add alert is called, an update is made, then ifc setAlerts calls,
   * which sets a new queue to the alertStack . It means that alertStack is now empty, since there is no component in the alertStack.
   *
   */

  it(`${TagName} setAlerts()`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );

    const mockFunc = jest.fn();

    var alertStack = wrapper.instance().getAlerts();
    alertStack.map((alert) => {
      alert.colorSchema = 'blue';
    });

    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    const returnValue2 = wrapper.instance().addAlertToPosition(1, {
      id: "id_alert_in_busSECOND",
      content: "Obsah alertu na druhé pozici"
    }, mockFunc);
    wrapper.update();
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    const returnValue = wrapper.instance().setAlerts(alertStack, mockFunc);
    wrapper.update();
    expect(mockFunc).toBeCalled();
    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(returnValue).toBe(wrapper.instance());
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

  /**
   * The test first uses the addAlert method to display the component alert in the queue.
   * Using the getPanels method, it is authenticated that the returned field is not empty.
   * After that, the removeAlert () method is called, which removes the alert view,
   * and the getPanel method returns an empty array. This is the expected end as the component alert has been removed using removeAlert.
   */
  it(`${TagName} removeAlert()`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );

    const mockFunc = jest.fn();
    expect(enzymeToJson(wrapper)).toMatchSnapshot();//Here is alertStack empty in the snapshot
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    wrapper.instance().setAlert(props, mockFunc);
    wrapper.update();
    expect(wrapper.instance().getAlerts()).not.toBeNull();
    expect(enzymeToJson(wrapper)).toMatchSnapshot();//In alertStack are one Alert Components in the snapshot
    const returnValue = wrapper.instance().removeAlert("ID_OF_ALERT", mockFunc);
    wrapper.update();
    expect(mockFunc).toBeCalled();
    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(returnValue).toBe(wrapper.instance());
    expect(enzymeToJson(wrapper)).toMatchSnapshot();//After calling removeAlert is alertStack empty in the snapshot
    let getValue = wrapper.instance().getAlerts(mockFunc);
    //After calling removeAlerts return getAlerts empty array.
    expect(getValue).toEqual([]);
  });

  /**
   * The test first adds component alert using the addAlert Method.
   * After that, the clearAlerts () method is called to remove queue the alertStack.
   * Then getPanels () is called to return an empty field.
   * However, here is a field that returns getPanel () full. Contains an object that passed in the addAlert method.
   */
  it(`${TagName} clearAlert()`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );

    const mockFunc = jest.fn();
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    const returnValue = wrapper.instance().addAlert({id: "id_alert_bus", content: "Obsah alertu"}, mockFunc);
    wrapper.update();
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    expect(mockFunc).toBeCalled();
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(returnValue).toBe(wrapper.instance());
    const retVal = wrapper.instance().clearAlerts(mockFunc);
    wrapper.update();
    expect(mockFunc).toBeCalled();
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    expect(() => wrapper.instance().clearAlerts(mockFunc)).not.toThrow();
  });

  /**
   * The test first adds the Alert component to the alertStack.
   * Using getAlert (), the returned field is not empty.
   * Then, we called removeAlert () method, which removes component alert from the stack, and the getAlert method finds that the returned array is empty.
   */
  it(`${TagName} getAlerts()`, () => {
    const wrapper = shallow(
      <UU5.Bricks.AlertBus
        id={"uuID01"}
        closeTimer={3000}
      />
    );
    const mockFunc = jest.fn();
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().state.alertStack).toEqual([]);
    expect(wrapper.instance().state.alertStack).toHaveLength(0);
    wrapper.instance().setAlert(props, mockFunc);
    wrapper.update();
    expect(wrapper.instance().getAlerts()).not.toBeNull();
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
    wrapper.instance().removeAlert("ID_OF_ALERT", mockFunc);
    wrapper.update();
    expect(wrapper.instance().getAlerts()).toEqual([]);
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

});


