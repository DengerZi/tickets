export default {
  APP_URL: "http://localhost:4000",
  APP_URI: "/api",
  APP_VERSION: "/v1.0.0",
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json",
    "Accept-Language": "es"
  },
  headersAuth: function(token) {
    return {
      "Accept": "application/json",
      "Content-type": "application/json",
      "Accept-Language": "es",
      "Authorization": `Bearer ${token}`
    }
  }
}