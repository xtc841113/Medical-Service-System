import Config from '../config.js'

function CallPatientAPI(id) {
    return (fetch(Config.fhir_api +'/Patient/' + id, 
    { method: 'GET'})
        .then(response => response.json())
        .then(function(data) {return data})
        .catch(console.log()));
}

export default CallPatientAPI;