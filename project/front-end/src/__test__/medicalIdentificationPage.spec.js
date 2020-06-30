import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configure, mount, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MedicalIdentificationPage from '../medicalIdentificationPage';
import expect from 'expect';
import familyHistory from '../FHIRAPI/payLoad/familyHistory.json';
import allergyInfo from '../FHIRAPI/payLoad/allergy.json';
import patientInfo from '../FHIRAPI/payLoad/pateint.json';
import getPatientIdById from '../getPatientIdById';

const weightData = {
  "resourceType": "Observation",
  "id": "249761",
  "meta": {
    "versionId": "3",
    "lastUpdated": "2019-12-13T04:35:39.194+00:00"
  },
  "code": {
    "coding": [{
      "system": "http ://loinc.org",
      "code": "Weight"
    }]
  },
  "subject": {
    "reference": "Patient/99409"
  },
  "valueQuantity": {
    "value": 90,
    "unit": "kg"
  }
}

const heightData = {
  "resourceType": "Observation",
  "id": "249761",
  "meta": {
    "versionId": "3",
    "lastUpdated": "2019-12-13T04:35:39.194+00:00"
  },
  "code": {
    "coding": [{
      "system": "http ://loinc.org",
      "code": "Height"
    }]
  },
  "subject": {
    "reference": "Patient/99409"
  },
  "valueQuantity": {
    "value": 190,
    "unit": "cm"
  }
}

const bloodGroupData = {
  "resourceType": "Observation",
  "id": "249761",
  "meta": {
    "versionId": "3",
    "lastUpdated": "2019-12-13T04:35:39.194+00:00"
  },
  "code": {
    "coding": [{
      "system": "http ://loinc.org",
      "code": "BloodGroup"
    }]
  },
  "subject": {
    "reference": "Patient/99409"
  },
  "valueString": {
    "value": "A"
  }
}

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
    render(<MedicalIdentificationPage />, container);
  });
  // expect(container.textContent).toBe("Medical Service System藥物查詢 Edit姓名 :  性別 : 身分證字號 : 出生年月日 : 年齡 : 0身高 : 0 cm體重 : 0 kg血型 : 家族病史 : 過敏藥物 : 住址 :  電話 : 監護人姓名 : 監護人關係 : 監護人手機 : 備註 : 無");
});

it('should call patientInfo when mounted', async() => {
  // const wrappy = mount(<MedicalIdentificationPage />);
  // let patientInfo = jest.fn();
  // getPatientIdById.mockImplementation(() => Promise.resolve());

  // MedicalIdentificationPage.prototype.componentWillMount = patientInfo;
  // wrappy.instance().patientInfo();
  // expect(getPatientIdById).toHaveBeenCalled();
  // await patientInfo();
  // expect.assertions(1);
  
});

describe('test MedicalIdentificationPage function', () => {

})

it('call updateObservationInfo should update weight, height and blood group', () => {
  const wrappy = shallow(<MedicalIdentificationPage />);
  wrappy.instance().updateObservationInfo("Weight", weightData);
  wrappy.instance().updateObservationInfo("Height", heightData);
  wrappy.instance().updateObservationInfo("BloodGroup", bloodGroupData);

  expect(wrappy.instance().state.weight).toBe(90);
  expect(wrappy.instance().state.height).toBe(190);
  expect(wrappy.instance().state.bloodGroup.value).toBe("A");
});

it('call calculatedAge should update age', () => {
  const wrappy = shallow(<MedicalIdentificationPage />);
  wrappy.instance().calculatedAge('1993-10-01');
  expect(wrappy.instance().state.age).toBe(26);
});

it('call updateFamilyHistory should update family history', () => {
  const wrappy = shallow(<MedicalIdentificationPage />);
  wrappy.instance().updateFamilyHistory(familyHistory);
  expect(wrappy.instance().state.familyHistory[0]).toBe("Family history of cancer of colon");
});

it('call updateAllergyInfo should update allergyInfo', () => {
  const wrappy = shallow(<MedicalIdentificationPage />);
  wrappy.instance().updateAllergyInfo(allergyInfo);
  expect(wrappy.instance().state.allergy[0]).toBe("Penicillin");
});

it('call updateName should update patient information', () => {
  const wrappy = shallow(<MedicalIdentificationPage />);
  wrappy.instance().updateName(patientInfo);
  expect(wrappy.instance().state.nameFamily).toBe("郭");
  expect(wrappy.instance().state.nameGiven[0]).toBe("宏志");
  expect(wrappy.instance().state.gender).toBe("male");
  expect(wrappy.instance().state.telecom).toBe("(886-2) 2771-2171");
  expect(wrappy.instance().state.city).toBe("Taipei");
  expect(wrappy.instance().state.addressText).toBe("大安區忠孝東路三段1號");
  expect(wrappy.instance().state.contactsFamily).toBe("郭");
  expect(wrappy.instance().state.contactsGiven[0]).toBe("台銘");
  expect(wrappy.instance().state.contactsRelation[0]).toBe("父子");
  expect(wrappy.instance().state.contactsTel).toBe("098765432");
});



