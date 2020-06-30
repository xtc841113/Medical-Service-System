import fetch from 'node-fetch';
import { act } from "react-dom/test-utils";
import CallConditionAPI from '../FHIRAPI/callConditionAPI.js'
import { expect } from 'chai';

it('asynchronous fetch promise', function() {
  return fetch('http://hapi.fhir.org/baseR4/Condition?patient=99409')
    .then(function(response) { return response.json() })
    .then(function(json) { 
     expect(json).to.be.an('object');
    });
});

// it('get condition', () => {
//     let id = "99409";
//     return CallConditionAPI(id).then(data => {
//       expect(data).to.be.an('array');
//     });
// });

// it('get condition api faild', () => {
//   return expect(CallConditionAPI('99409')).rejects.toEqual({
//     error: 'User with 3 not found.',
//   });
// });