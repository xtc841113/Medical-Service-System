import Config from '../config.js'

async function CallObservationAPI(id) {
    return (await fetch(Config.fhir_api +'/Observation?patient=' + id, { method: 'GET' })
        .then(response => response.json())
        .then((data) => data.entry)
        .catch(console.log()));
}

export default CallObservationAPI;