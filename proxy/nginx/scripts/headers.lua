local HeadersMod = {}

local etna_header_pattern = "^x-etna-header-"

function get_ngx_headers() return ngx.req.get_headers() end

function HeadersMod.set_ngx_target()
    local target = get_ngx_headers()['x-etna-target']
    if target ~= nil and target ~= '' then
        ngx.var.target = target
        ngx.req.clear_header("x-etna-target")
    else
        ngx.exit(ngx.HTTP_BAD_REQUEST)
    end
end
function HeadersMod.normalize_etna_headers()
    for key, value in pairs(get_ngx_headers()) do
        if key:find(etna_header_pattern) ~= nil then
            ngx.req.set_header(key:gsub(etna_header_pattern, ""), value)
            ngx.req.clear_header(key)
        end
    end
end

return HeadersMod
