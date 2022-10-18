const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dbFilePath = 'recipesDB.json',
	  authorization = 'authorization.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/recipes', (req, res) => res.send(getRecipesFromDB()));

app.post('/api/recipe', (req, res) => {
	const recipesData = getRecipesFromDB(),
		recipe = req.body;

	recipe.id = shortId.generate();
	recipe.description = recipe.description || 'No Description';
	recipe.status = 'In Progress';

    recipesData.push(recipe);
    setRecipesToDB(recipesData);

	res.send(recipe);
});

app.get('/api/recipe/:id', (req, res) => {
	const recipesData = getRecipesFromDB(),
		recipe = recipesData.find(recipe => recipe.id === req.params.id);

    recipe ? res.send(recipe) : res.status(404).send({error: 'Recipe with given ID was not found'});
});

app.put('/api/recipe/:id', (req, res) => {
	const recipesData = getRecipesFromDB(),
		recipe = recipesData.find(recipe => recipe.id === req.params.id),
		updatedRecipe = req.body;

	recipe.title = updatedRecipe.title;
	recipe.description = updatedRecipe.description || 'No Description';

    setRecipesToDB(recipesData);

	res.sendStatus(204);
});

app.get('/api/app', (req, res) => res.send(getInfoForAuthorization()));

function getRecipesFromDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setRecipesToDB(recipesData) {
    fs.writeFileSync(dbFilePath, JSON.stringify(recipesData));
}

function getInfoForAuthorization() {
	return JSON.parse(fs.readFileSync(authorization, 'utf8'));
}

app.listen(3000, () => console.log('Server has been started...'));
