local pattern = "^x-etna-header-"

for key, value in pairs(ngx.req.get_headers()) do
 if key:find(pattern) ~= nil then
   ngx.req.set_header(key:gsub(pattern, ""), value)
   ngx.req.clear_header(key)
 end
end
