const fs = require('fs')
const axios = require('axios')
const qs = require('qs')

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

  async getConstituent(id) {
    try {
      const res = await axios.get(`https://api.sky.blackbaud.com/constituent/v1/constituents/${id}`, {
          headers: {
            'Bb-Api-Subscription-Key': '0e6dc7f6dd6148f99b5c8468320ebcd6',
            Authorization: 'Bearer ' + this.access_token
          }  
        })
      return res.data
    } catch (err) {
      return err.response.data
    }
}

  async refreshToken() {
    try {
      const rd = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: this.refresh_token
      })
      const res = await axios.post('https://oauth2.sky.blackbaud.com/token', rd, {
        headers: {
          'Authorization': 'Basic MjlhNjFiNjQtM2M4OS00ODI3LWJkMjUtNmUwYzlhMmVhOWJmOnZqa0ZsTFo5WWJYMzlsRkltUUF5b05KK29TK2FUWjdCVmJaSk5DNkkwQVU9',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(res.data)
      this.access_token = res.data.access_token
      this.refresh_token = res.data.refresh_token
      fs.writeFileSync('./re.token', JSON.stringify(res.data))
      return 'token refreshed'
    } catch (err) {
      return err
    }
  }

  // STEPS
  // 1. load existing tokens from file
  // 2. try making API call
  // 3. if 401 Not Authorized then refresh token
  // 4. save new tokens to file
  // 5. retry API call (keep a queue?)

  // methods to load/save tokens to local file

  // methods to work with API
}