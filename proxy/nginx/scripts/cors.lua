local CorsMod = {}
function CorsMod.handle_options_method()
    ngx.header["Access-Control-Allow-Origin"] = "*"
    ngx.header["Access-Control-Allow-Methods"] = "*"
    ngx.header["Access-Control-Allow-Headers"] = "*"
    ngx.header["Access-Control-Max-Age"] = 1728000
    ngx.header["Content-Type"] = "text/plain; charset=utf-8"
    ngx.header["Content-Length"] = 0
    ngx.header["Access-Control-Expose-Headers"] = "*"
    ngx.exit(ngx.HTTP_NO_CONTENT)
end

function CorsMod.prevent_browser_errors()
    ngx.header["Access-Control-Allow-Origin"] = "*"
    ngx.header["Access-Control-Expose-Headers"] = "*"
end

return CorsMod
