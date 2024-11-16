# Patent Infringement Checker Application (Dockerized)


## Step 1 - Clone from Github Repo
Open terminal, and enter this command

`git clone https://github.com/tinghengseng/patent-infringement-check.git`

## Step 2: Set up the OpenAI API Key
Create `.env` file inside the root directory of the project and add the following text, then replace the your_openai_api_key to your own.

`OPENAI_API_KEY=your_openai_api_key`

## Step 3 - Build and Run the Application with Docker
First, please make sure there is docker on your machine, if you are not sure, kindly enter this command

`docker --version`

If there is no docker installed, kindly go to https://www.docker.com/products/docker-desktop/ to download.

If the docker is already installed, enter this command

`docker-compose up --build`

After the containers are up, you should see logs indicating that both the backend (Flask) and frontend (React) are running.

## Step 4 - Accessing the Application
Once the Docker containers are running, open your browser and go to the following URL:

- Frontend: http://localhost:3000

- Backend: http://localhost:5001

## Step 5 - Stopping the Application
If you want to stop the containers, enter this command

`docker-compose down`
