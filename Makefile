app_npm_prefix = npm --prefix ./app

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
