import Config from '../config.js'
function CallAllergyIntoleranceAPI(id) {
    return (fetch(Config.fhir_api + '/AllergyIntolerance?patient=' + id, { method: 'GET' })
        .then(response => response.json())
        .then(function(data) {
            return data.entry[0] 
            })
        .catch(console.log()));
}

export default CallAllergyIntoleranceAPI;