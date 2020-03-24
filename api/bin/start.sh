#!/bin/bash
BYellow='\033[1;33m'
NC='\033[0m' # No Color
BCyan='\033[1;36m' # Cyan   

echo -e "\n${BYellow}Init ${BCyan}MySQL${BYellow} container${NC}"
docker-compose up -d
echo -e "${BYellow}Waiting for ${BCyan}MySQL${BYellow} to be ready for ~30 secs.${NC}"
sleep 25s
echo -e "${BCyan}MySQL${BYellow} is ready! :D${NC}"
npm run dev