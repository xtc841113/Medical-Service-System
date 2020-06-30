import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MakePatientModal from '../makePatientModal';
import { Button } from 'react-bootstrap';

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

it("Updates the handleSubmit by isFullfill is 0", () => {
  const baseProps = {
    id: '',
    patientId: 'testId',
    contacts: [],
    birthDate: '1992-09-24',
    age: 0,
    nameFamily: 'huang',
    nameGiven: 'test',
    gender: 'male',
    telecom: ["02-24538888"],
    imageUrl: '',
    address: {},
    city: 'Taipei',
    addressText: 'ntut',
    allergy: ["test"],
    allergyId: '',
    observation: [],
    contactsFamily: 'huang',
    contactsGiven: 'test2',
    contactsRelation: ['parent'],
    contactsTel: '02-27778888',
    observationWeightId: '',
    observationHeightId: '',
    observationBloodGroupId: '',
    height: 190,
    weight: 90,
    bloodGroup: 'A',
    familyHistoryId: '',
    familyHistory: ['test history'],
    isFulfill: 0,
    jsonServer: { "id": "1" },
    updateName: jest.fn(),
    calculatedAge: jest.fn(),
    updateObservationInfo: jest.fn(),
    updateAllergyInfo: jest.fn(),
    updateFamilyHistory: jest.fn(),
    setModalShow: jest.fn(),
  }
  const component = mount(<MakePatientModal {...baseProps} />);
  component.instance().handleSubmit();
  expect(baseProps.calculatedAge).toHaveBeenCalledWith("1992-09-24");
  expect(baseProps.updateObservationInfo).toHaveBeenCalled();
  expect(baseProps.updateAllergyInfo).toHaveBeenCalled();
  expect(baseProps.updateFamilyHistory).toHaveBeenCalled();
  expect(baseProps.setModalShow).toHaveBeenCalled();
});

it("Updates the handleSubmit by isFullfill is 1", () => {
  const baseProps = {
    id: '',
    patientId: 'testId',
    contacts: [],
    birthDate: '1992-09-24',
    age: 0,
    nameFamily: 'huang',
    nameGiven: 'test',
    gender: 'male',
    telecom: ["02-24538888"],
    imageUrl: '',
    address: {},
    city: 'Taipei',
    addressText: 'ntut',
    allergy: ["test"],
    allergyId: '',
    observation: [],
    contactsFamily: 'huang',
    contactsGiven: 'test2',
    contactsRelation: ['parent'],
    contactsTel: '02-27778888',
    observationWeightId: '',
    observationHeightId: '',
    observationBloodGroupId: '',
    height: 190,
    weight: 90,
    bloodGroup: 'A',
    familyHistoryId: '',
    familyHistory: ['test history'],
    isFulfill: 1,
    jsonServer: { "id": "1" },
    updateName: jest.fn(),
    calculatedAge: jest.fn(),
    updateObservationInfo: jest.fn(),
    updateAllergyInfo: jest.fn(),
    updateFamilyHistory: jest.fn(),
    setModalShow: jest.fn(),
  }
  const component = mount(<MakePatientModal {...baseProps} />);
  component.instance().handleSubmit();
  expect(baseProps.calculatedAge).toHaveBeenCalledWith("1992-09-24");
  expect(baseProps.updateObservationInfo).toHaveBeenCalled();
  expect(baseProps.updateAllergyInfo).toHaveBeenCalled();
  expect(baseProps.updateFamilyHistory).toHaveBeenCalled();
  expect(baseProps.setModalShow).toHaveBeenCalled();
});

it("Updates the handleCityChange", () => {
  const mockEvent = { "target": { "value": "Taipei" } }
  const component = mount(<MakePatientModal />);
  component.instance().handleCityChange(mockEvent);
  expect(component.instance().state.city).toBe("Taipei");
});

it("Updates the handleNameFamilyChange", () => {
  const mockEvent = { "target": { "value": "Huang" } }
  const component = mount(<MakePatientModal />);
  component.instance().handleNameFamilyChange(mockEvent);
  expect(component.instance().state.nameFamily).toBe("Huang");
});

it("Updates the handleBirthDayChange", () => {
  const mockBirthDate = "2019-10-10"
  const component = mount(<MakePatientModal />);
  component.instance().handleBirthDayChange(mockBirthDate);
  expect(component.instance().state.birthDate).toBe("2019-10-10");
});

it("Updates the handleNameGivenChange", () => {
  const mockEvent = { "target": { "value": "test given" } }
  const component = mount(<MakePatientModal />);
  component.instance().handleNameGivenChange(mockEvent);
  expect(component.instance().state.nameGiven).toBe("test given");
});

it("Updates the handleGenderChange", () => {
  const mockEvent = { "target": { "value": "female" } }
  const component = mount(<MakePatientModal />);
  component.instance().handleGenderChange(mockEvent);
  expect(component.instance().state.gender).toBe("female");
});

it("Updates the handleHeightChange", () => {
  const mockEvent = { "target": { "value": "190" } }
  const component = mount(<MakePatientModal />);
  component.instance().handleHeightChange(mockEvent);
  expect(component.instance().state.height).toBe("190");
});

it("Updates the handleWeightChange", () => {
  const mockEvent = { "target": { "value": "80" } }
  const component = mount(<MakePatientModal />);
  component.instance().handleWeightChange(mockEvent);
  expect(component.instance().state.weight).toBe("80");
});

it("Updates the handleBloodGroupChange", () => {
  const mockEvent = { "target": { "value": "O" } }
  const component = mount(<MakePatientModal />);
  component.instance().handleBloodGroupChange(mockEvent);
  expect(component.instance().state.bloodGroup).toBe("O");
});