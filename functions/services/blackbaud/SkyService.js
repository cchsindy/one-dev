module.exports = class SkyService {
  constructor(token) {
    this.axios = require('axios')
    this.access_token = token.access_token
    this.refresh_token = token.refresh_token
  }
  
  async getConstituent(id) {
    try {
      const res = await this.axios.get(`https://api.sky.blackbaud.com/constituent/v1/constituents/${id}`, {
        headers: {
          'Bb-Api-Subscription-Key': '0e6dc7f6dd6148f99b5c8468320ebcd6',
          Authorization: 'Bearer ' + this.access_token
        }  
      })
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }
  
  async refreshToken() {
    try {
      const qs = require('qs')
      const rd = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: this.refresh_token
      })
      const res = await this.axios.post('https://oauth2.sky.blackbaud.com/token', rd, {
        headers: {
          'Authorization': 'Basic MjlhNjFiNjQtM2M4OS00ODI3LWJkMjUtNmUwYzlhMmVhOWJmOnZqa0ZsTFo5WWJYMzlsRkltUUF5b05KK29TK2FUWjdCVmJaSk5DNkkwQVU9',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      this.access_token = res.data.access_token
      this.refresh_token = res.data.refresh_token
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }
}