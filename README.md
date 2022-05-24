
# ICT4D_group_16_NTFP_marketplace
The web application is deployed here: https://forest-marche.herokuapp.com/

# Directories
- *foret-marche-backend* contains the Flask backend with the postgresql database
- *foret-marche-ui* contains the React frontend
- *vxml_files* contains the vxml files for Voxeo
- *other directories* contain the recording files 

# Setup and Development

### Prerequisites
- yarn
- python
- git
- heroku-cli

## Frontend
**yarn v1.22.17**

```
cd foret-marche-frontend/
# installing dependencies
yarn
```

Start local development server for frontend with:
```
yarn start
```

## Backend
**python v3.7.9**

```
# run this once for a virtual environment
python -m venv ./ict4d
# install dependencies
pip install -r requirements.txt

```

```
# always run this when opening a new terminal
source ict4d/bin/activate
```

Start server with:
```
cd foret-marche-backend/
python main.py
```

## Stitch backend and frontend together
Frontend and backend are hosted together, that's why we need to bootstrap both together before deploying.
```
# removing the old build
rm -r foret-marche-backend/build/ 
cd foret-marche-frontend/ 
# building the new frontend
yarn build 
# moving frontend to the backend folder
cp build/ ../foret-marche-backend/build/ 
```

And updating the repository with the new version
```
git add .
git commit -m "Release"
git push origin main
```

## Deploy application to Heroku
Prerequiste: access to the heroku foret marche dashboard, ask in WhatsApp


We only want to deploy one folder (where the application is fully bootstrapped) to be hosted on heroku, therefore we use the `git subtree` command:

```
git checkout main
git pull origin main
git subtree push --prefix foret-marche-backend/ heroku main
```
