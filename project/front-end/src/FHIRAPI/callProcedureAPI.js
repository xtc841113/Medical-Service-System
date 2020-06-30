import Config from '../config.js'

function CallProcedureAPI(id) {
    return (fetch(Config.fhir_api +'/Procedure?patient=' + id, { method: 'GET' })
        .then(response => response.json())
        .then((data) => data.entry)
        .catch(console.log()));
}

export default CallProcedureAPI;