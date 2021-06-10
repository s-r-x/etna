app_npm_prefix = npm --prefix ./app
proxy_npm_prefix = npm --prefix ./node-proxy
fixture_npm_prefix = npm --prefix ./fixtures

app.dev:
	$(app_npm_prefix) start
app.prod:
	$(app_npm_prefix) run build
app.test:
	$(app_npm_prefix) npm test
app.compile-themes:
	$(app_npm_prefix) npx gulp less
proxy.start:
	docker-compose -f proxy/docker-compose.yml up nginx
node-proxy.dev:
	$(proxy_npm_prefix) dev
fixture.http:
	$(fixture_npm_prefix)/http start
