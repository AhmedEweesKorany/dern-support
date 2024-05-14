const allowedOrgins = ["http://localhost:3010"]

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrgins.indexOf(origin) !== -1 || !origin) { // !origin only in development stage 
        return callback(null, true);
      }
      return callback(new Error("not allowed by CORS"),null);
    },
    Credential: true,
    optionsSuccessStatus: 200,
  }; 
  
  module.exports = corsOptions;