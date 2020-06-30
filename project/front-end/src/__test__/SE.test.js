import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MedicalRecords from "../MedicalRecords";
import Register from "../Register/Register";
import Register_doctor from "../Register/Register_doctor";
import Login from '../Login/Login'
import ModifyPersonalInformation from '../ModifyPersonalInformation/ModifyPersonalInformation'
import Logout from '../Logout/Logout'
import Header from '../Header'
import Home from '../Home'

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

describe('Register', () => {
  it("錯誤的身分證字號",()=>{
        const wrapper = shallow(<Register />);
        expect(wrapper.instance().checkID(123)).toEqual(false);
    })
})

describe('Register', () => {
    it("正確身分證字號",()=>{
          const wrapper = shallow(<Register />);
          expect(wrapper.instance().checkID('A134180572')).toEqual(true);
      })
  })

describe('Register', () => {
    it("在fhir註冊一個patient",()=>{
            const wrapper = shallow(<Register />);
            wrapper.instance().registerPatient("patientId");
    })
})

describe('Register', () => {
    it("測試輸入field",()=>{
            const wrapper = shallow(<Register />);
            let username = {"target": {"value": "A178448077"}}
            let name = {"target": {"value": "小明"}}
            let email = {"target": {"value": "fhir@gmail.com"}}
            let password = {"target": {"value": "password"}}

            wrapper.instance().usernameOnChange(username)
            wrapper.instance().nameOnChange(name)
            wrapper.instance().emailOnChange(email)
            wrapper.instance().passwordOnChange(password)

            expect(wrapper.instance().state.username).toEqual("A178448077");
            expect(wrapper.instance().state.name).toEqual("小明");
            expect(wrapper.instance().state.email).toEqual("fhir@gmail.com");
            expect(wrapper.instance().state.password).toEqual("password");

    })
})

describe('Register', () => {
    it("測試不輸入",()=>{
            const wrapper = shallow(<Register />);

            expect(wrapper.instance().handleSubmit()).toEqual();

            let username = {"target": {"value": "A178448077"}}
            wrapper.instance().usernameOnChange(username)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let name = {"target": {"value": "小明"}}
            wrapper.instance().nameOnChange(name)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let email = {"target": {"value": "fhir@gmail.com"}}
            wrapper.instance().emailOnChange(email)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let password = {"target": {"value": "password"}}
            wrapper.instance().passwordOnChange(password)
            

    })
})

describe('Register', () => {
    it("render註冊頁面",()=>{
            const wrapper = mount(<Register />);
            expect(wrapper.find('div').find('div').find('nav').find('a').first().text()).toEqual("Medical Service System");    
        })
})

describe('Register_doctor', () => {
    it("註冊一個行醫者",()=>{
            const wrapper = shallow(<Register_doctor />);
            wrapper.instance().registerPractitioner("practitionerId", "醫生名字")
    })
})

describe('Register_doctor', () => {
    it("測試輸入field",()=>{
            const wrapper = shallow(<Register_doctor />);
            let username = {"target": {"value": "doctor_username"}}
            let name = {"target": {"value": "Dr.Chen"}}
            let email = {"target": {"value": "fhir@gmail.com"}}
            let password = {"target": {"value": "password"}}
            
            wrapper.instance().usernameOnChange(username)
            wrapper.instance().nameOnChange(name)
            wrapper.instance().emailOnChange(email)
            wrapper.instance().passwordOnChange(password)

            expect(wrapper.instance().state.username).toEqual("doctor_username");
            expect(wrapper.instance().state.name).toEqual("Dr.Chen");
            expect(wrapper.instance().state.email).toEqual("fhir@gmail.com");
            expect(wrapper.instance().state.password).toEqual("password");

    })
})

describe('Register_doctor', () => {
    it("測試不輸入",()=>{
            const wrapper = shallow(<Register_doctor />);

            expect(wrapper.instance().handleSubmit()).toEqual();

            let username = {"target": {"value": "doctor_username"}}
            wrapper.instance().usernameOnChange(username)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let name = {"target": {"value": "Dr.Chen"}}
            wrapper.instance().nameOnChange(name)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let email = {"target": {"value": "fhir@gmail.com"}}
            wrapper.instance().emailOnChange(email)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let password = {"target": {"value": "password"}}
            wrapper.instance().passwordOnChange(password)
            

    })
})

describe('Login', () => {
    it("測試輸入field",()=>{
            const wrapper = shallow(<Login />);
            let username = {"target": {"value": "username"}}
            let password = {"target": {"value": "password"}}
            
            wrapper.instance().usernameOnChange(username)
            wrapper.instance().passwordOnChange(password)

            expect(wrapper.instance().state.username).toEqual("username");
            expect(wrapper.instance().state.password).toEqual("password");

    })
})

describe('Login', () => {
    it("測試完全不輸入送出",()=>{
            const wrapper = shallow(<Login />);
            let username = {"target": {"value": ""}}
            let password = {"target": {"value": ""}}
            
            wrapper.instance().usernameOnChange(username)
            wrapper.instance().passwordOnChange(password)

            expect(wrapper.instance().handleSubmit()).toEqual()
    })
})

describe('Login', () => {
    it("測試不輸入密碼送出",()=>{
            const wrapper = shallow(<Login />);
            let username = {"target": {"value": "username"}}
            let password = {"target": {"value": ""}}
            
            wrapper.instance().usernameOnChange(username)
            wrapper.instance().passwordOnChange(password)

            expect(wrapper.instance().handleSubmit()).toEqual()
    })
})

describe('Login', () => {
    it("測試送出",()=>{
        const historyMock = { push: jest.fn() };
            const wrapper = shallow(<Login history={historyMock}/>);
            let username = {"target": {"value": "username"}}
            let password = {"target": {"value": "password"}}
            
            wrapper.instance().usernameOnChange(username)
            wrapper.instance().passwordOnChange(password)

            expect(wrapper.instance().state.username).toEqual("username");
            expect(wrapper.instance().state.password).toEqual("password");

            wrapper.instance().handleSubmit()

            let fakeResponse = getFakeResponse();
            let response = wrapper.instance().setToSessionStorage(fakeResponse,'testusername');
            expect(response).toBe(fakeResponse);
    })
})

describe('ModifyPersonalInformation', () => {
    it("測試輸入field",()=>{
            const wrapper = shallow(<ModifyPersonalInformation />);
            let originalPassword = {"target": {"value": "originalPassword"}}
            let newPassword = {"target": {"value": "newPassword"}}
            let name = {"target": {"value": "Dr.Chen"}}
            let email = {"target": {"value": "fhir@gmail.com"}}
            
            
            wrapper.instance().originalPasswordOnChange(originalPassword)
            wrapper.instance().newPasswordOnChange(newPassword)
            wrapper.instance().nameOnChange(name)
            wrapper.instance().emailOnChange(email)

            expect(wrapper.instance().state.originalPassword).toEqual("originalPassword");
            expect(wrapper.instance().state.newPassword).toEqual("newPassword");
            expect(wrapper.instance().state.name).toEqual("Dr.Chen");
            expect(wrapper.instance().state.email).toEqual("fhir@gmail.com");

    })
})

describe('ModifyPersonalInformation', () => {
    it("測試不輸入",()=>{
            const wrapper = shallow(<ModifyPersonalInformation />);

            expect(wrapper.instance().handleSubmit()).toEqual();

            let originalPassword = {"target": {"value": "originalPawword"}}
            wrapper.instance().originalPasswordOnChange(originalPassword)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let newPassword = {"target": {"value": "newPassword"}}
            wrapper.instance().newPasswordOnChange(newPassword)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let email = {"target": {"value": "fhir@gmail.com"}}
            wrapper.instance().emailOnChange(email)
            expect(wrapper.instance().handleSubmit()).toEqual();

            let name = {"target": {"value": "Dr.Chen"}}
            wrapper.instance().nameOnChange(name)

    })
})

// describe('Logout', () => {
//     it("登出",()=>{
//             const wrapper = shallow(<Logout />);
//     })
// })

describe('MedicalRecords', () => {
    it("多筆就醫紀錄",()=>{
            const MockResponse = {
                "data":{
                    "performedDateTime" : "performedDateTime",
                    "outcome":{
                        "text": "text"
                    }
                }
            }
            const wrapper = shallow(<MedicalRecords />);
            wrapper.instance().getProcedures(7);
            wrapper.instance().setToDateAndDisease(MockResponse);
            expect(wrapper.instance().state.disease.length).toBeGreaterThan(0);
    })
})

describe('MedicalRecords', () => {
    it("單筆就醫紀錄",()=>{
            const wrapper = shallow(<MedicalRecords />);
            wrapper.instance().getProcedure(14);
    })
})

describe('MedicalRecords', () => {
    it("醫院",()=>{
            const wrapper = shallow(<MedicalRecords />);
            wrapper.instance().getLocation(9);
    })
})




describe('Header', () => {
    it("header",()=>{
            const wrapper = mount(<Header />);
            expect(wrapper.find('div').find('div').find('nav').find('a').first().text()).toEqual("Medical Service System");

            sessionStorage = storageMock();
            sessionStorage.setItem('role','Patient');
            expect('Patient').toBe(window.sessionStorage.getItem('role'));
            wrapper.instance().forceUpdate();

            sessionStorage = storageMock();
            sessionStorage.setItem('role','Doctor');
            expect('Doctor').toBe(window.sessionStorage.getItem('role'));
            wrapper.instance().forceUpdate();

            sessionStorage = storageMock();
            sessionStorage.setItem('role','Admin');
            expect('Admin').toBe(window.sessionStorage.getItem('role'));
            wrapper.instance().forceUpdate();

    })
})

describe('Home', () => {
    it("首頁",()=>{
            sessionStorage = storageMock();
            sessionStorage.setItem('role','Patient');
            const wrapper = shallow(<Home />);
            expect(wrapper.find('div').find('div').find('div').find('p').first().text()).toEqual("醫療服務系統");

            sessionStorage = storageMock();
            sessionStorage.setItem('role','Doctor');
            expect('Doctor').toBe(window.sessionStorage.getItem('role'));
            wrapper.instance().forceUpdate();

            sessionStorage = storageMock();
            sessionStorage.setItem('role','Admin');
            expect('Admin').toBe(window.sessionStorage.getItem('role'));
            wrapper.instance().forceUpdate();


    })
})

function getFakeResponse() {
    let response = {
        "data" : {
            "outputMessage":"success",
            "token":"token",
            "userId":"userId",
            "name":"name",
            "role":"role"
        }
    }

    return response;
}



function storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }
