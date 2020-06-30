import React from 'react'
import Enzyme, { shallow } from 'enzyme' 
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { configure, mount } from 'enzyme';
import MedicineManagementPage from '../MedicineManagementPage'


describe('<MedicineManagementPage>', () => {
    const wrapper = shallow(<MedicineManagementPage />)
                            
    test('Check initial state', () => {
        expect(wrapper.state('show')).toBe(false)
        expect(wrapper.state('medicine_list')).toEqual([])
        expect(wrapper.state('result_content')).toEqual([])
        expect(wrapper.state('search_input_field_text')).toBe('')
        expect(wrapper.state('add_medicine_content')).toEqual({})
        expect(wrapper.state('doseFormOptions')).toEqual(['capsule','tablets'])
        expect(wrapper.state('selectedDoseFormLabel')).toBe('')
        expect(wrapper.state('classificationOptions')).toEqual(['學名藥','原廠藥'])
        expect(wrapper.state('selectedClassificationLabel')).toBe('')
        expect(wrapper.state('statusOptions')).toEqual(['active','inactive'])
        expect(wrapper.state('selectedStatusLabel')).toBe('')
    })
})

describe('<MedicineManagementPage>', () => {
    const wrapper = mount(<MedicineManagementPage />)
    test('Check MedicineList', () => {
        let response = getMedicineResponseData();
        let medicine = wrapper.instance().setToMedicineList(response);
        expect(wrapper.state('medicine_list')).toEqual(medicine);
    })
})

describe('<MedicineManagementPage>', () => {
    const wrapper = mount(<MedicineManagementPage />)
    test('Check showModal', () => {
        wrapper.find('div').find('.showModalButton').at(1).simulate('click');
        expect(true).toEqual(wrapper.state('show'));

        wrapper.find('div').find('.closeModalButton').at(1).simulate('click');
        expect(false).toEqual(wrapper.state('show'));

    })
})

describe('<MedicineManagementPage>', () => {
    const wrapper = mount(<MedicineManagementPage />)
    test('Check ModalFormInput', () => {
        wrapper.find('div').find('.showModalButton').at(1).simulate('click');
        expect(true).toEqual(wrapper.state('show'));

        wrapper.find('div').find('.closeModalButton').at(1).simulate('click');
        expect(false).toEqual(wrapper.state('show'));

    })
})

describe('<MedicineManagementPage>', () => {
    const wrapper = mount(<MedicineManagementPage />)
    test('Check ModalFormInput', () => {
        wrapper.find('div').find('.showModalButton').at(1).simulate('click');
        expect(true).toEqual(wrapper.state('show'));

        wrapper.find('div').find('.codeInput').at(1).simulate('input', { target: {value: 'code'} });
        expect('code').toEqual(wrapper.state('add_medicine_content').code.code);

        wrapper.find('div').find('.synonymEnInput').at(1).simulate('input', { target: {value: 'synonymEn'} });
        expect('synonymEn').toEqual(wrapper.state('add_medicine_content').synonym_en);

        wrapper.find('div').find('.synonymZhInput').at(1).simulate('input', { target: {value: 'synonymZh'} });
        expect('synonymZh').toEqual(wrapper.state('add_medicine_content').synonym_zh);
       
        wrapper.find('div').find('.ingredientInput').at(1).simulate('input', { target: {value: 'ingredient'} });
        expect('ingredient').toEqual(wrapper.state('add_medicine_content').ingredient);

        wrapper.find('div').find('.amountInput').at(1).simulate('input', { target: {value: 'amount'} });
        expect('amount').toEqual(wrapper.state('add_medicine_content').amount);

        wrapper.find('div').find('.costInput').at(1).simulate('input', { target: {value: 'cost'} });
        expect('cost').toEqual(wrapper.state('add_medicine_content').cost);

        wrapper.find('div').find('.manufacturerInput').at(1).simulate('input', { target: {value: 'manufacturer'} });
        expect('manufacturer').toEqual(wrapper.state('add_medicine_content').manufacturer);
        


        wrapper.find('div').find('.addMedicineButton').at(1).simulate('click');

        let doseForm = {
            "value" : "doseForm"
        }
        wrapper.instance().onSelectDoseForm(doseForm)
        expect('doseForm').toEqual(wrapper.state('add_medicine_content').doseForm);
        
        wrapper.find('div').find('.addMedicineButton').at(1).simulate('click');

        let medicineClassification = {
            "value" : "medicineClassification"
        }
        wrapper.instance().onSelectClassification(medicineClassification)
        expect('medicineClassification').toEqual(wrapper.state('add_medicine_content').medicineClassification);
        
        wrapper.find('div').find('.addMedicineButton').at(1).simulate('click');

        let status = {
            "value" : "status"
        }
        wrapper.instance().onSelectStatus(status)
        expect('status').toEqual(wrapper.state('add_medicine_content').status);

        wrapper.instance().medicineToJson()

        wrapper.find('div').find('.addMedicineButton').at(1).simulate('click');

    })
})





describe('<MedicineManagementPage>', () => {
    const wrapper = mount(<MedicineManagementPage />)
    test('Check API', () => {
        wrapper.instance().getMedicineList();
        wrapper.instance().addMedicineAPI();
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