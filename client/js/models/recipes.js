class Recipes {
    static async getRecipesList() {
		const response = await fetch('http://localhost:3000/api/recipes');

		return await response.json();
    }

	static async addRecipe(newRecipe) {
		const response = await fetch('http://localhost:3000/api/recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newRecipe)
		});

		return await response.json();
	}

	static async getRecipe(id) {
		const response = await fetch(`http://localhost:3000/api/recipe/${id}`);

		return await response.json();
	}

	static async editRecipe(updatedRecipe) {
		await fetch(`http://localhost:3000/api/task/${updatedRecipe.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedRecipe)
		});
	}
}

export default Recipes;