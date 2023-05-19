copyAll:
	scp -r ./* root@45.8.249.62:/root/energy
	scp -r ./* root@81.163.30.240:/root/energy

copyNext:
	scp -r ./.next/* root@45.8.249.62:/root/energy/.next
	scp -r ./.next/* root@81.163.30.240:/root/energy/.next

copyEnvLocal:
	scp -r ./.env.local root@45.8.249.62:/root/energy/
	scp -r ./.env.local root@81.163.30.240:/root/energy/

run docker mongo auth:
	docker run -d -p 707:27017 --name mongodb -v mongo-data:/data/db mongo –-auth

	mongo mongodb://82.148.29.252:707