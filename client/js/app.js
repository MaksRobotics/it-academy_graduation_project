import {parseCurrentURL} from './helpers/utils.js';

import Start from './views/pages/start.js';
import Home from './views/pages/home.js';
import ReadyRecipes from './views/pages/ready-recipes.js';
import Calculator from './views/pages/calculator.js';
import GroceryList from './views/pages/grocery-list.js';
import Favorites from './views/pages/favorites.js';
import Settings from './views/pages/settings.js';
import SearchRecipes from './views/pages/search_recipes.js';
import Error404 from './views/pages/error404.js';
import InfoRecipes from './views/pages/info-recipes.js';

const Routes = {
    '/': Start,
    '/app': Home,
    '/app/ready-recipes': ReadyRecipes,
    '/app/calculator': Calculator,
    '/app/favorites': Favorites,
    '/app/grocery-list': GroceryList,
    '/app/settings': Settings,
    '/app/recipes': SearchRecipes,
    '/app/info-recipes/:id': InfoRecipes
};

const router = async() => {
    const contentContainer = document.getElementsByClassName('content-container')[0];

    const urlParts = parseCurrentURL(),
          pagePath = `/${urlParts.page || ''}${urlParts.task ? `/${urlParts.task}` : ''}${urlParts.id ? '/:id' : ''}${urlParts.action ? `/${urlParts.action}` : ''}`,
          page = Routes[pagePath] ? new Routes[pagePath]() : new Error404();

    const pageData = await page.getData();
   
    contentContainer.innerHTML = await page.render(pageData);
    page.afterRender();

    $(document).ready(function() {
        $('.info-recipes__popup-link').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
    
            fixedContentPos: false
        });
    });
};

window.onload = router;
window.onhashchange = router;