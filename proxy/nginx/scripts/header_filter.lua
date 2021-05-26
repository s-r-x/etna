local Cors = require "cors"

local pattern = "x-etna-header-"
local h = ngx.resp.get_headers()

local immutableHeaders = {
    ["access-control-allow-origin"] = true,
    ["content-length"] = true,
    ["content-encoding"] = true,
    ["access-control-expose-headers"] = true,
    ["content-type"] = true
}
if ngx.req.get_method() ~= 'OPTIONS' then
    for k, v in pairs(h) do
        if not immutableHeaders[k] then
            ngx.header[pattern .. k] = v
            ngx.header[k] = nil
        end
    end
end