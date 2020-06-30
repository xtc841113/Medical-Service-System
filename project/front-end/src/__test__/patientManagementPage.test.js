import React from 'react'
import Enzyme, { shallow } from 'enzyme' 
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { configure, mount } from 'enzyme';
import PatientManagementPage from '../PatientManagementPage'

describe('<PatientManagementPage>', () => {
    const wrapper = shallow(<PatientManagementPage />)
                            
    test('Check initial state', () => {
        expect(wrapper.state('show')).toBe('')
        expect(wrapper.state('username')).toBe('')
        expect(wrapper.state('password')).toBe('')
        expect(wrapper.state('email')).toBe('')
        expect(wrapper.state('name')).toBe('')
        expect(wrapper.state('roleOptions')).toEqual(['Patient','Doctor'])
        expect(wrapper.state('selectedValue')).toBe('')
        expect(wrapper.state('selectedLabel')).toBe('')
        expect(wrapper.state('all_patient_context')).toEqual([])
        expect(wrapper.state('all_practitioner_context')).toEqual([])

    })
})

describe('<PatientManagementPage>', () => {
    const wrapper = mount(<PatientManagementPage />)
    test('Check PatientContext', () => {
        let response = getPatientResponseData();
        let patient = wrapper.instance().setToAllPatient(response);
        expect(wrapper.state('all_patient_context')).toEqual(patient);
    })
})

describe('<PatientManagementPage>', () => {
    const wrapper = mount(<PatientManagementPage />)
    test('Check PractitionerContext', () => {
        let response = getPractitionerReponseData();
        let practitioner = wrapper.instance().setToAllPractitioner(response);
        expect(wrapper.state('all_practitioner_context')).toEqual(practitioner);
    })
})

describe('<PatientManagementPage>', () => {
    const wrapper = mount(<PatientManagementPage />)
    test('Check showModal', () => {
        wrapper.find('div').find('.showModalButton').at(1).simulate('click');
        expect(true).toEqual(wrapper.state('show'));

        wrapper.find('div').find('.closeModalButton').at(1).simulate('click');
        expect(false).toEqual(wrapper.state('show'));

    })
})

describe('<PatientManagementPage>', () => {
    const wrapper = mount(<PatientManagementPage />)
    test('Check ModalFormInput', () => {
        wrapper.find('div').find('.showModalButton').at(1).simulate('click');
        expect(true).toEqual(wrapper.state('show'));

        wrapper.find('div').find('.usernameInput').at(1).simulate('input', { target: {value: 'username'} });
        expect('username').toEqual(wrapper.state('username'));

        wrapper.find('div').find('.passwordInput').at(1).simulate('input', { target: {value: 'password'} });
        expect('password').toEqual(wrapper.state('password'));

        wrapper.find('div').find('.emailInput').at(1).simulate('input', { target: {value: 'email'} });
        expect('email').toEqual(wrapper.state('email'));
       
        wrapper.find('div').find('.nameInput').at(1).simulate('input', { target: {value: 'name'} });
        expect('name').toEqual(wrapper.state('name'));

        let target = {
            "value" : "options"
        }
        wrapper.instance().onSelectType(target)
        expect('options').toEqual(wrapper.state('selectedValue'));

        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');
    })
})



describe('<PatientManagementPage>', () => {
    const wrapper = mount(<PatientManagementPage />)
    test('Check AddUserTest', () => {
        wrapper.find('div').find('.showModalButton').at(1).simulate('click');
        expect(true).toEqual(wrapper.state('show'));

        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');

        let target = {
            "value" : "Patient"
        }
        wrapper.instance().onSelectType(target)
        expect('Patient').toEqual(wrapper.state('selectedValue'));

        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');


        wrapper.find('div').find('.usernameInput').at(1).simulate('input', { target: {value: 'username'} });
        expect('username').toEqual(wrapper.state('username'));

        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');

        wrapper.find('div').find('.passwordInput').at(1).simulate('input', { target: {value: 'password'} });
        expect('password').toEqual(wrapper.state('password'));

        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');

        wrapper.find('div').find('.emailInput').at(1).simulate('input', { target: {value: 'email'} });
        expect('email').toEqual(wrapper.state('email'));
       
        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');

        wrapper.find('div').find('.nameInput').at(1).simulate('input', { target: {value: 'name'} });
        expect('name').toEqual(wrapper.state('name'));

        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');

        let roleType = wrapper.instance().registerUserBySelectedType('testuser','testname');
        expect(wrapper.state('selectedValue')).toBe(roleType);

        target = {
            "value" : "Doctor"
        }
        wrapper.instance().onSelectType(target)
        expect('Doctor').toEqual(wrapper.state('selectedValue'));

        roleType = wrapper.instance().registerUserBySelectedType('testuser','testname');
        expect(wrapper.state('selectedValue')).toBe(roleType);

        target = {
            "value" : "options"
        }
        wrapper.instance().onSelectType(target)
        expect('options').toEqual(wrapper.state('selectedValue'));

        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');

        target = {
            "value" : ""
        }
        wrapper.instance().onSelectType(target)
        expect('').toEqual(wrapper.state('selectedValue'));
        wrapper.find('div').find('.addUserSubmitButton').at(1).simulate('click');
    })
})



describe('<PatientManagementPage>', () => {
    const wrapper = mount(<PatientManagementPage />)
    test('Check identify', () => {
        let result = wrapper.instance().checkID('0123456789');
        expect(result).toBe(false);

        result = wrapper.instance().checkID('A1975D7348');
        expect(result).toBe(false);

        result = wrapper.instance().checkID('A197537348');
        expect(result).toBe(true);
    })
})

describe('<PatientManagementPage>', () => {
    const wrapper = mount(<PatientManagementPage />)
    test('Check API', () => {
        // wrapper.instance().getMedicineList();
        // wrapper.instance().addMedicineAPI();
    })
})

function getPatientResponseData() {
    let response = {
        "data" : [
            {
                "fhirId":"1669",
                "identify": "qwqdwq",
                "name": "J122832925",
                "email": "dqw",
                "isFulfill": "0"
            },
            {
                "fhirId":"2222",
                "identify": "tttt",
                "name": "wwww",
                "email": "qqqq",
                "isFulfill": "0"
            }
        ]
    }
    return response;
}


function getPractitionerReponseData() {
    let response = {
        "data" : [
            {
                "fhirId":"1669",
                "identify": "qwqdwq",
                "name": "J122832925",
                "email": "dqw",
            },
            {
                "fhirId":"2222",
                "identify": "tttt",
                "name": "wwww",
                "email": "qqqq",
            }
        ]
    }
    return response;
}
