local Cors = require "cors"
local Headers = require "headers"
local method_name = ngx.req.get_method()

if method_name == 'OPTIONS' then Cors.handle_options_method() end

Headers.set_ngx_target()
Headers.normalize_etna_headers()

Cors.prevent_browser_errors();
