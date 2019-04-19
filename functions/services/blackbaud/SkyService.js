const fs = require('fs')
const fetch = require('node-fetch')
const axios = require('axios')

module.exports = class SkyService {
  constructor() {
    try {
      const data = fs.readFileSync('./services/blackbaud/re.token')
      const json = JSON.parse(data)
      this.access_token = json.access_token
      this.refresh_token = json.refresh_token
    } catch (err) {
      console.log(err.code)
    }
  }

  getConstituent(id) {
    axios.get(`https://api.sky.blackbaud.com/constituent/v1/constituents/${id}`, {
      headers: {
        'Bb-Api-Subscription-Key': '0e6dc7f6dd6148f99b5c8468320ebcd6',
        Authorization: 'Bearer ' + this.access_token
      }  
    })
      .then(res => { return res.data })
      .catch(err => { return err })
    // fetch(`https://api.sky.blackbaud.com/constituent/v1/constituents/${id}`, {
    //   headers: {
    //     'Bb-Api-Subscription-Key': '0e6dc7f6dd6148f99b5c8468320ebcd6',
    //     Authorization: 'Bearer ' + this.access_token
    //   }
    // })
    //   .catch(err => { return err })
    //   .then(res => res.json())
    //   .then(json => {
    //     return json
    //   })
  }

  // STEPS
  // 1. load existing tokens from file
  // 2. try making API call
  // 3. if 401 Not Authorized then refresh token
  // 4. save new tokens to file
  // 5. retry API call (keep a queue?)

  // methods to load/save tokens to local file

  // method to get refresh token
  // async refreshToken() {
    // fetch('https://oauth2.sky.blackbaud.com/token', {
    //   method: 'post',
    //   headers: {
    //     'Authorization': 'Basic MjlhNjFiNjQtM2M4OS00ODI3LWJkMjUtNmUwYzlhMmVhOWJmOnZqa0ZsTFo5WWJYMzlsRkltUUF5b05KK29TK2FUWjdCVmJaSk5DNkkwQVU9',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body:
    //     'grant_type=refresh_token&refresh_token=' + this.refresh_token
    // }).catch(error => 
    //   console.log(error)
    // ).then(response => 
    //   response.json()
    // ).then(json => 
    //   console.log(json)
    // )
  // }

  // methods to work with API
}