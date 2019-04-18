module.exports = class SkyService {
  constructor() {
    this.access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjREVjZzVkxIM0FtU1JTbUZqMk04Wm5wWHU3WSJ9.eyJuYW1laWQiOiIyZjQzNDg1YS1jMzU2LTRjMmYtODRmNS01NDEyMTE5NWI1NDEiLCJ0ZW5hbnRpZCI6ImEyMDg5N2QzLTM1OTYtNDY4NC1hYjY3LTFlZTBhMmRhYmJhZCIsImFwcGxpY2F0aW9uaWQiOiIyOWE2MWI2NC0zYzg5LTQ4MjctYmQyNS02ZTBjOWEyZWE5YmYiLCJlbnZpcm9ubWVudGlkIjoicC1qX2NrX3NrbXZraVZJMl9IbEVQRGlnIiwiZW52aXJvbm1lbnRuYW1lIjoiQ292ZW5hbnQgQ2hyaXN0aWFuIEhpZ2ggU2Nob29sIEVudmlyb25tZW50IDEiLCJsZWdhbGVudGl0eWlkIjoicC1Yc0Jhd1VMTWJrYVFCQmRMeDIwOUR3IiwibGVnYWxlbnRpdHluYW1lIjoiQ292ZW5hbnQgQ2hyaXN0aWFuIEhpZ2ggU2Nob29sIiwiUG9kSWQiOiJQb2QxIiwiaXNzIjoiaHR0cHM6Ly9vYXV0aDIuc2t5LmJsYWNrYmF1ZC5jb20vIiwiYXVkIjoiUkV4IiwiZXhwIjoxNTU1NjE0NDcwLCJuYmYiOjE1NTU2MTA4NzB9.A7MkFPWCn1VH-huTapfAArQLZVOrupHhsI2oU-baZLOR4Wim3U1dU38DxLUH27LzU6HpAz6Upl8qSHrFPYpatd7yhmoc1zy3W5dHT0qVNatp9pydUJphHUyh2T0PDCIuYNEqHYLwAHCYdLyd4wiX13N_cLpwCH2VomoDIer6wVQKQVqfJmjs9KbqCSzMyRceX-ttHJN7Gmq5E4hK3hyCiWRLTTYLCnorFpi1LztRZpqjzG60wE7IMH6GPtgjCqDtYfYp8wLyNfraJ4J8f-kGXDvpD05-UWLVF5fDd0SUJs8c7fPcbEbY-a_15rICc4j7vhsxx0xjtCmb-jNVYKVkYw',
    this.refresh_token = 'fa109218fe854932867618290f1f6f1a'
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