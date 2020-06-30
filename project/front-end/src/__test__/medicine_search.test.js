import React from 'react'
import Enzyme, { shallow } from 'enzyme' 
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { configure, mount } from 'enzyme';
import Medicine_search from '../Medicine_search'

describe('<Medicine_search>', () => {
    const wrapper = shallow(<Medicine_search />)
                            
    test('Check initial state', () => {
        expect(wrapper.state('medicine_list')).toBe('')
        expect(wrapper.state('result_content')).toEqual([])
        expect(wrapper.state('search_input_field_text')).toBe('')
    })
})

describe('<Medicine_search>', () => {
    const wrapper = mount(<Medicine_search />)
    test('Check MedicineList', () => {
        let response = getMedicineResponseData();
        let medicine = wrapper.instance().setToMedicineList(response);
        expect(wrapper.state('medicine_list')).toEqual(medicine);
    })
})


describe('<Medicine_search>', () => {
    const wrapper = mount(<Medicine_search />)
    test('Check MedicineSearchField', () => {
        let response = getMedicineResponseData();
        let medicine = wrapper.instance().setToMedicineList(response);
        expect(wrapper.state('medicine_list')).toEqual(medicine);

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'search_field_test'} })
        expect(wrapper.state('search_input_field_text')).toEqual('search_field_test');
    })
})

describe('<Medicine_search>', () => {
    const wrapper = mount(<Medicine_search />)
    test('Check MedicineSearch', () => {
      
        let response = getMedicineResponseData();
        let medicine = wrapper.instance().setToMedicineList(response);
        expect(wrapper.state('medicine_list')).toEqual(medicine);

        wrapper.find('div').find('.searchButton').at(1).simulate('click')

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'test'} })
        expect(wrapper.state('search_input_field_text')).toEqual('test');
        wrapper.find('div').find('.searchButton').at(1).simulate('click')

        wrapper.find('div').find('.searchField').at(1).simulate('input', { target: {value: 'AC09291100'} })
        expect(wrapper.state('search_input_field_text')).toEqual('AC09291100');
       
        wrapper.find('div').find('.searchButton').at(1).simulate('click')
        let result_content = wrapper.instance().updateResultContentByIndex(0);

        expect(wrapper.state('result_content')).toEqual(result_content);

        wrapper.find('div').find('.w3-card').at(1).simulate('click')

        expect(wrapper.state('result_content')).toEqual(result_content);
    })
})

describe('<Medicine_search>', () => {
    const wrapper = mount(<Medicine_search />)
    test('Check SectionClick Function', () => {
      
        let response = getMedicineResponseData();
        let medicine = wrapper.instance().setToMedicineList(response);
        expect(wrapper.state('medicine_list')).toEqual(medicine);
            
        wrapper.instance().sectionClick(0);
        let result_content = wrapper.instance().updateResultContentByIndex(0);

        expect(wrapper.state('result_content')).toEqual(result_content);
    })
})

describe('<Medicine_search>', () => {
    const wrapper = mount(<Medicine_search />)
    test('Check API', () => {
        wrapper.instance().getMedicineList();
    })
})

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