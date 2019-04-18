module.exports = class SkyService {
  constructor() {
    this.access_token,
    this.refresh_token
  }

  isRunning() {
    return 'yes it is instantiated!!'
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