copyAll:
	scp -r ./* root@80.249.145.139:/root/energy
	scp -r ./* root@81.163.30.240:/root/energy
	scp -r ./* root@37.228.117.222:/root/ru-don.ru

copyNext:
	scp -r ./.next/* root@80.249.145.139:/root/energy/.next
	scp -r ./.next/* root@81.163.30.240:/root/energy/.next
	scp -r ./.next/* root@37.228.117.222:/root/ru-don.ru/.next

copyEnvLocal:
	scp -r ./.env.local root@80.249.145.139:/root/energy/
	scp -r ./.env.local root@81.163.30.240:/root/energy/
	scp -r ./.env.local root@37.228.117.222:/root/ru-don.ru/

run docker mongo auth:
	docker run -d -p 707:27017 --name mongodb -v mongo-data:/data/db mongo –-auth

	mongo mongodb://82.148.29.252:707