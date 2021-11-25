app_npm_prefix = npm --prefix ./app
proxy_npm_prefix = npm --prefix ./node-proxy
fixture_compose_cmd = docker-compose -f ./fixtures/docker-compose.yml

app.dev:
	$(app_npm_prefix) start
app.prod:
	$(app_npm_prefix) run build
app.test:
	$(app_npm_prefix) npm test
app.compile-themes:
	cd ./app && npx gulp less
proxy.start:
	docker-compose -f proxy/docker-compose.yml up nginx
node-proxy.dev:
	$(proxy_npm_prefix) run dev
node-proxy.prod:
	$(proxy_npm_prefix) start
fixture.all:
	$(fixture_compose_cmd) up
fixture.http:
	$(fixture_compose_cmd) up http
fixture.socketio:
	$(fixture_compose_cmd) up socketio
fixture.phx:
	$(fixture_compose_cmd) up phx
