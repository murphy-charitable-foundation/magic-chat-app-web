.PHONY: client backend

client:
	cd client && npm run start

backend:
	cd server && npm run dev

run: client backend
