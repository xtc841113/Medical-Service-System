import React from 'react'
import Enzyme, { shallow } from 'enzyme' 
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { configure, mount } from 'enzyme';
import Prescription from '../Prescription'

describe('<Prescription>', () => {
    const wrapper = shallow(<Prescription />)
                            
    test('Check initial state', () => {
        expect(wrapper.state('patient_identify_field_text')).toBe('')
        expect(wrapper.state('patient_data')).toBe('')
        expect(wrapper.state('practitioner_data')).toBe('')
        expect(wrapper.state('medicine_list')).toBe('')
        expect(wrapper.state('search_input_field_text')).toBe('')
        expect(wrapper.state('result_content')).toBe('')
        expect(wrapper.state('amount_input_field_text')).toBe('')
        expect(wrapper.state('prescription_list')).toBe('')
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check MedicineList', () => {
        ADD_Medince(wrapper);
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check PatientSearchField', () => {
        wrapper.find('div').find('.patientSearchField').at(1).simulate('input', { target: {value: 'A129963274'} })
        expect(wrapper.state('patient_identify_field_text')).toEqual('A129963274');
    })
})


describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check PatientSearch', () => {
        wrapper.find('div').find('.patientSearchButton').at(1).simulate('click')

        wrapper.find('div').find('.patientSearchField').at(1).simulate('input', { target: {value: '-1'} })
        wrapper.find('div').find('.patientSearchButton').at(1).simulate('click')

        wrapper.find('div').find('.patientSearchField').at(1).simulate('input', { target: {value: '0123456789'} })
        wrapper.find('div').find('.patientSearchButton').at(1).simulate('click')

        wrapper.find('div').find('.patientSearchField').at(1).simulate('input', { target: {value: 'A123456789'} })
        wrapper.find('div').find('.patientSearchButton').at(1).simulate('click')

        wrapper.find('div').find('.patientSearchField').at(1).simulate('input', { target: {value: 'A129963274'} })
        expect(wrapper.state('patient_identify_field_text')).toEqual('A129963274');
        wrapper.find('div').find('.patientSearchButton').at(1).simulate('click')

    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check PatientData', () => {
        let patientResponse = getPatientResponseData();
        let patient_data = wrapper.instance().setToPatientData(patientResponse);
        expect(wrapper.state('patient_data')).toEqual(patient_data);
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check ProcedureData', () => {
        let patientResponse = getPatientResponseData();
        let patient_data = wrapper.instance().setToPatientData(patientResponse);
        expect(wrapper.state('patient_data')).toEqual(patient_data);

        let procedureResponse = getProcedureResponseData();
        let procedure_data = wrapper.instance().setProcedureToPatientData(procedureResponse);
     
        expect(wrapper.state('patient_data')).toEqual(procedure_data);
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check PractitionerData', () => {
        
        let practitionerResponse = getPractitionerReponseData();
        let practitioner_data = wrapper.instance().setToPractitionerData(practitionerResponse);
     
        expect(wrapper.state('practitioner_data')).toEqual(practitioner_data);
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check MedicineSearchField', () => {

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'AC09291100'} })
        expect(wrapper.state('search_input_field_text')).toEqual('AC09291100');
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check MedicineSearch', () => {
        ADD_Medince(wrapper);

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: ''} })
        expect(wrapper.state('search_input_field_text')).toEqual('');
        wrapper.find('div').find('.searchButton').at(1).simulate('click');

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'test'} })
        expect(wrapper.state('search_input_field_text')).toEqual('test');
        wrapper.find('div').find('.searchButton').at(1).simulate('click');
        
        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'AC09291100'} })
        expect(wrapper.state('search_input_field_text')).toEqual('AC09291100');
        wrapper.find('div').find('.searchButton').at(1).simulate('click');
 
        let result_content = wrapper.instance().updateResultContentByIndex(0);

        expect(wrapper.state('result_content')).toEqual(result_content);

        wrapper.find('div').find('.medicineSelectButton').at(1).simulate('click');

        expect(wrapper.state('result_content')).toEqual(result_content);
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check AmountField', () => {
        wrapper.find('div').find('.amountField').at(1).simulate('input', { target: {value: '100'} })
        expect(wrapper.state('amount_input_field_text')).toEqual('100');
    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check prescriptionAdded', () => {
        ADD_Medince(wrapper);

        wrapper.find('div').find('.prescriptionAddedButton').at(1).simulate('click')

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'AC09291100'} })
        expect(wrapper.state('search_input_field_text')).toEqual('AC09291100');
       
        wrapper.find('div').find('.searchButton').at(1).simulate('click');

        let result_content = wrapper.instance().updateResultContentByIndex(0);

        expect(wrapper.state('result_content')).toEqual(result_content);

        wrapper.find('div').find('.prescriptionAddedButton').at(1).simulate('click')

        wrapper.find('div').find('.amountField').at(1).simulate('input', { target: {value: '100'} })
        expect(wrapper.state('amount_input_field_text')).toEqual('100');
        wrapper.instance().printScreen()

        wrapper.find('div').find('.prescriptionAddedButton').at(1).simulate('click')


    })
})

describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check prescriptionRemoved', () => {
        ADD_Medince(wrapper);

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'AC09291100'} })
        expect(wrapper.state('search_input_field_text')).toEqual('AC09291100');
        wrapper.find('div').find('.searchButton').at(1).simulate('click');

        let result_content = wrapper.instance().updateResultContentByIndex(0);
        expect(wrapper.state('result_content')).toEqual(result_content);

        wrapper.find('div').find('.amountField').at(1).simulate('input', { target: {value: '100'} })
        expect(wrapper.state('amount_input_field_text')).toEqual('100');

        wrapper.find('div').find('.prescriptionAddedButton').at(1).simulate('click')
        expect(wrapper.state('prescription_list').length).toEqual(1);

        wrapper.find('div').find('.removeButton').at(1).simulate('click')
        
        expect(wrapper.state('prescription_list').length).toEqual(0);
    })
})


describe('<Prescription>', () => {
    const wrapper = mount(<Prescription />)
    test('Check API', () => {
        wrapper.instance().getPatientIdById(1);
        wrapper.instance().getPatientDataById(1);
        wrapper.instance().getProcedures(1);
        wrapper.instance().getProcedure(1);
        wrapper.instance().getPractitionerById(1)
        wrapper.instance().getMedicineList();
    })
})

function ADD_Medince(wrapper) {
    let response = getMedicineResponseData();
    let medicine = wrapper.instance().setToMedicineList(response);
    expect(wrapper.state('medicine_list')).toEqual(medicine);
}




function getPatientResponseData() {
    let response = {
        "data" : {
            "resourceType": "Patient",
            "id": "1667",
            "meta": {
                "versionId": "19",
                "lastUpdated": "2019-12-20T20:09:28.984+08:00",
                "source": "#FUPwF4gsqBwa6E87"
            },
            "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">宏志 <b>郭 </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>qqq</td></tr><tr><td>Address</td><td><span>Taipei </span></td></tr><tr><td>Date of birth</td><td><span>01 四月 1977</span></td></tr></tbody></table></div>"
            },
            "identifier": [
                {
                "value": "qqq"
                }
            ],
            "name": [
                {
                "family": "郭",
                "given": [
                    "宏志"
                ]
                }
            ],
            "telecom": [
                {
                "system": "phone",
                "value": "(886-2) 2771-2171",
                "use": "home"
                }
            ],
            "gender": "male",
            "birthDate": "1977-04-01",
            "address": [
                {
                "use": "home",
                "type": "both",
                "text": "大安區忠孝東路三段1號",
                "city": "Taipei",
                "postalCode": "1"
                }
            ],
            "photo": [
                {
                "url": "https://ppt.cc/fG5Gtx@.png"
                }
            ],
            "contact": [
                {
                "relationship": [
                    {
                    "coding": [
                        {
                        "code": "父子"
                        }
                    ]
                    }
                ],
                "name": {
                    "family": "郭",
                    "given": [
                    "台銘"
                    ]
                },
                "telecom": [
                    {
                    "value": "098765432"
                    }
                ]
                }
            ]
        }
    }

    return response;
}

function getProcedureResponseData() {
    let response = {
        "data":{
            "reasonCode":[
                {
                    "coding":[
                        {
                            "display":"Droplet infection"
                        }
                    ]
                }
            ]
        }
    }
    return response;
}

function getPractitionerReponseData() {
    let response = {
        "data":{
            "name":[
                {
                    "given":[
                        "王"
                    ],

                    "family":[
                        "小明"
                    ]
                }
            ],
            "identifier":[
                {
                    "value":"A200339321"
                }
            ]
        }
    }
    return response;
}


function getMedicineResponseData() {
    let response = {
        "data":{
            "entry":[
                {
                    "resource":{
                        "resourceType": "MedicationKnowledge",
                        "text": {
                          "status": "generated"
                        },
                        "code": {
                          "coding": [
                            {
                              "code": "AC09291100",
                              "display": "AC09291100"
                            }
                          ]
                        },
                        "status": "active",
                        "manufacturer": {
                          "reference": "#org4"
                        },
                        "doseForm": {
                          "text": "capsule"
                        },
                        "amount": {
                          "value": 50,
                          "unit": "mg/ml"
                        },
                        "synonym": [
                          "Vancomycin 中文",
                          "Vancomycin Hydrochloride (VANCOMYCIN HYDROCHLORIDE)"
                        ],
                        "ingredient": [
                          {
                            "itemCodeableConcept": {
                              "text": "Injection Solution"
                            }
                          }
                        ],
                        "cost": [
                          {
                            "cost": {
                              "value": 600
                            }
                          }
                        ],
                        "medicineClassification": [
                          {
                            "classification": [
                              {
                                "text": "一般學名藥"
                              }
                            ]
                          }
                        ]
                    }
                }
            ]
        }
    }   
    
    return response;
}