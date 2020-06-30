import Config from '../config.js'

function CallConditionAPI(id) {
    return (fetch(Config.fhir_api +'/Condition?patient=' + id, { method: 'GET' })
        .then(response => response.json())
        .then((data) => data.entry)
        .catch(console.log(id, " get faild.")));
}

export default CallConditionAPI;