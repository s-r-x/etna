app_npm_prefix = npm --prefix ./app

dev:
	$(app_npm_prefix) start
prod:
	$(app_npm_prefix) run build
test:
	$(app_npm_prefix) npm test
compile-themes:
	$(app_npm_prefix) npx gulp less
proxy.run:
	docker-compose -f proxy/docker-compose.yml up nginx
