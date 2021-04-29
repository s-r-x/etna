local headers = ngx.req.get_headers();

if headers["x-etna-target"] then
 ngx.var.target = headers["x-etna-target"]
else
 error("x-etna-target header is not specified")
end

