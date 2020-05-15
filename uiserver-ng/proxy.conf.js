const PROXY_CONFIG = [
    {
      context: [
        "/api"
      ],
      target: "http://localhost:8080",
      loglevel: "debug",
      secure: false
    },
    {
      context: [
        "/stomp"
      ],
      target: "http://localhost:8080",
      loglevel: "debug",
      secure: false
    }
  ];
  
  module.exports = PROXY_CONFIG;
