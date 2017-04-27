/**
 * Created by spider on 4/17/17.
 */
let  fetch = require('node-fetch');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('http://120.76.243.226/business/purchase/bill/', {})
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      console.log('request succeeded with JSON response', data)
    }).catch(function (error) {
  console.log('request failed', error)
})

fetch('http://120.76.243.226/business/login', {})
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      console.log('request succeeded with JSON response', data)
    }).catch(function (error) {
  console.log('request failed', error)
})