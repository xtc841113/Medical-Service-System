import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configure, mount, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MedicalRecordPage from '../medicalRecordPage';
import expect from 'expect';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';
jest.mock('axios');

let container = null;
beforeEach(() => {
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

it('render will componentWillMount', () => {
    // const wrapper = mount(<MedicalIdentificationPage />);
    // wrapper.instance().componentWillMount(); 
    // expect(wrapper.find).toBe(""); 
    // const spy = jest.spyOn(MedicalIdentificationPage.prototype, 'componentWillMount');
    // expect(spy).toHaveBeenCalled();
    // expect(MedicalIdentificationPage.prototype.componentWillMount).toHaveBeenCalledTimes(1);
});

it("renders init MedicalIdentificationPage", () => {

    act(() => {
        render(<MedicalRecordPage />, container);
    });
    // expect(container.textContent).toBe("Medical Service System藥物查詢 Edit姓名 :  性別 : 身分證字號 : 出生年月日 : 年齡 : 0身高 : 0 cm體重 : 0 kg血型 : 家族病史 : 過敏藥物 : 住址 :  電話 : 監護人姓名 : 監護人關係 : 監護人手機 : 備註 : 無");
});

it('call inputOnChange should change patientId', () => {
    const mockInput = {"target": {"value": "testId"}}
    const component = mount(<MedicalRecordPage />);
    component.instance().inputOnChange(mockInput);
    expect(component.instance().state.patientId).toBe("testId");
});

it('call searchPatients should return alert', () => {
    window.alert = jest.fn();
    const component = mount(<MedicalRecordPage />);
    expect(component.instance().state.patientId).toBe("");
    
    component.instance().searchPatients();

    expect(window.alert).toBeCalledWith('請輸入身分證')
});

it('call searchPatients should return fhirId', () => {
    const component = shallow(<MedicalRecordPage />);
    expect(component.instance().state.patientId).toBe("");
    const response = {"data": [{"fhirId": "1"}]}
    jest.spyOn(component.instance(), 'searchPatients');
    component.instance().state.patientId = "testId";
    expect(component.instance().state.patientId).toBe("testId");
    axios.get.mockImplementationOnce(() => Promise.resolve(response));
    component.instance().searchPatients();
});

it('call prepare should return array', () => {
    let array = [{"test": "1"}, {"name": "2"}]
    const component = shallow(<MedicalRecordPage />);
    let result = component.instance().prepare(array);
    expect(result).toEqual(array);
});