copyAll:
	scp -r ./* root@77.223.99.138:/root/energy
	scp -r ./* root@81.163.30.240:/root/energy

copyNext:
	scp -r ./.next/* root@77.223.99.138:/root/energy/.next
	scp -r ./.next/* root@81.163.30.240:/root/energy/.next

copyEnvLocal:
	scp -r ./.env.local root@77.223.99.138:/root/energy/
	scp -r ./.env.local root@81.163.30.240:/root/energy/