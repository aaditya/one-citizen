const config = require(__base+'system/config');

module.exports = (req, res, next) => {
    if(config.settings.origin.type === "list") {
      const allowedOrigins = config.domains.whitelist;
      let origin = req.headers.origin;
      if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
    }
    else if (config.settings.origin.type === "all") {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}