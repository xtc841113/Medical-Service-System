import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { configure, mount } from 'enzyme';
import { act } from "react-dom/test-utils";
import Adapter from 'enzyme-adapter-react-16';
import MakeProcedureModal from '../makeProcedureModal';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    configure({ adapter: new Adapter() });
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Updates the handleSubmit display is blank", () => {
    window.alert = jest.fn();
    const onSubmit = jest.fn();
    const fakeState = {
        display: '1',
        outcome: '',
    }
    const baseProps = {
        id: 'testId',
        procedure: [{
            code: {
                coding: [{
                    system: "http://snomed.info/sct",
                    code: "230056204",
                    display: "display"
                }],
                text: "230056004"
            }, outcome: { text: "outcome" }
        }]
    }

    const component = mount(<MakeProcedureModal {...baseProps} />);

    component.instance().handleSubmit();
    expect(window.alert).toBeCalledWith('病情判斷不能為空')
});

it("Updates the handleSubmit display is blank", () => {
    window.alert = jest.fn();
    const onSubmit = jest.fn();
  
    const baseProps = {
        id: 'testId',
        procedure: [{
            code: {
                coding: [{
                    system: "http://snomed.info/sct",
                    code: "230056204",
                    display: "display"
                }],
                text: "230056004"
            }, outcome: { text: "outcome" }
        }]
    }

    const component = mount(<MakeProcedureModal {...baseProps} />);

    component.instance().state.display = "test display";

    component.instance().handleSubmit();
    expect(window.alert).toBeCalledWith('後續處理不能為空')
});

it("Updates the handleSubmit", () => {
    window.alert = jest.fn();
    const setModalShow = jest.fn();
  
    const baseProps = {
        id: 'testId',
        data: [{
            code: {
                coding: [{
                    system: "http://snomed.info/sct",
                    code: "230056204",
                    display: "display"
                }],
                text: "230056004"
            }, outcome: { text: "outcome" }
        }],
        setModalShow: jest.fn()
    }

    const component = mount(<MakeProcedureModal {...baseProps} />);

    component.instance().state.display = "test display";
    component.instance().state.outcome = "test outcome";

    component.instance().handleSubmit();
    expect(baseProps.data.length).toBe(2);
});


