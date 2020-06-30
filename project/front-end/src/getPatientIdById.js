import Config from './config.js';
import axios from 'axios';

export default function getPatientIdById(id) {
    return (fetch(Config.jsonServer  +'/patients?identify=' + id, { method: 'GET' })
    .then(response => response.json())
    .then(function(data) { return data[0]})
    .catch(console.log()));
}