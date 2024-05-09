sudo yes | sudo docker kill $(sudo docker ps -a -q) 
sudo yes | sudo docker container prune
sudo yes | sudo docker image prune
sudo docker build -t webserver --build-arg VITE_WS_HOST=localhost:80/ws --build-arg PORT=80 . 
sudo docker run -it --rm -p 80:80 --name web webserver