import Config from '../config.js'

export default function callPostFamilyHistoryAPI(obj) {
    fetch(Config.fhir_api +'/Condition/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(
            obj
        )
    }).then((response) => {
        return response.json();

    }).then((jsonData) => {
    }).catch((err) => {
        console.log('錯誤:', err);
    })
}