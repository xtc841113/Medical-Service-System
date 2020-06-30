import Config from '../config.js'

export default function callPostProcedureAPI(obj) {
    fetch(Config.fhir_api +'/Procedure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(
            obj.resource
        )
    }).then((response) => {
        return response.json();

    }).then((jsonData) => {
    }).catch((err) => {
        console.log('錯誤:', err);
    })
}