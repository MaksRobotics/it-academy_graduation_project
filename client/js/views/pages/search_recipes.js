import Component from '../component.js';

import Recipes from '../../models/recipes.js';

class SearchRecipes extends Component{
    async getData() {
        return await Recipes.getRecipesList();
    }

    async render(data) {
        return `                
            <div class="wraper wrapper_app">
                <div class="app__bg"></div>
                <div class="wrapper-sidebar">
                    <div class="sidebar">
                        <div class="sidebar__logo">
                            <img class="sidebar__logo-img" src="images/logos/app_logo.svg" alt="">
                        </div>
                        <h3 class="sidebar__welcome">Добро пожаловать, ${localStorage.getItem('login')}</h3>
                        <ul class="list">
                            <li class="list__item">
                                <a class="list__item-link" href="#/app">
                                    <span class="list__item-icon"><i class="fas fa-home"></i></span>
                                    Домашняя
                                </a>
                            </li>
                            <li class="list__item">
                                <a class="list__item-link" href="#/app/ready-recipes">
                                    <span class="list__item-icon"><i class="fas fa-book"></i></span>
                                    Готовые рецепты
                                </a>
                            </li>
                            <li class="list__item">
                                <a class="list__item-link" href="#/app/calculator">
                                    <span class="list__item-icon"><i class="fas fa-calculator"></i></span>
                                    Калькулятор
                                </a>
                            </li>
                            <li class="list__item">
                                <a class="list__item-link" href="#/app/favorites">
                                    <span class="list__item-icon"><i class="fas fa-bookmark"></i></span>
                                    Избранное
                                </a>
                            </li>
                            <li class="list__item">
                                <a class="list__item-link" href="#/app/grocery-list">
                                    <span class="list__item-icon"><i class="fas fa-shopping-cart"></i></span>
                                    Список покупок
                                </a>
                            </li>
                            <li class="list__item">
                                <a class="list__item-link" href="#/app/settings">
                                    <span class="list__item-icon"><i class="fas fa-gears"></i></span>
                                    Настройки
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="navbar">
                        <div class="navbar__hamburger">
                            <a class="navbar__hamburger-link" href=""><i class="fas fa-bars"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrapper-search">
                <form class="search" action="">
                    <input class="search__input" placeholder="Введите название рецепта..." type="text">
                    <a class="search__link" href="#/app/recipes">
                        <img class="search__button-img" src="images/icons/search.png" alt="search logo"> 
                    </a> 
                </form>
            </div>
            <div class="wrapper-typesOfCuisines">
                <div class="typesOfCuisines">
                    ${this.renderTypesOfCuisine(this.getArrayTypesOfCuisine())}
                </div>
            </div>
            <div class="wrapper-cards">
                <div class="cards-body">
                    ${this.renderFilteredRecipes(this.filterRecipes(data))}
                </div>
            </div>               
        `;
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const container = document.querySelector('.page-container');

        container.addEventListener('click', event => {
            event.stopImmediatePropagation();
        })

        const hamburgerSidebar = document.querySelector('.navbar__hamburger'),
              listSidebar = document.querySelector('.list'),
              wrapperSearch = document.querySelector('.wrapper-search'),
              wrapperTypesOfCuisines = document.querySelector('.wrapper-typesOfCuisines'),
              wrapperCards = document.querySelector('.wrapper-cards');

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperSearch.classList.add('wrapper-search_position');
                wrapperTypesOfCuisines.classList.add('wrapper-typesOfCuisines_position');
                wrapperCards.classList.add('wrapper-cards__position');
            } else {
                wrapperSearch.classList.remove('wrapper-search_position');
                wrapperTypesOfCuisines.classList.remove('wrapper-typesOfCuisines_position');
                wrapperCards.classList.remove('wrapper-cards__position');
            }
        })

        listSidebar.addEventListener('click', e => {
            const target = e.target;

            if (target && target.classList.contains('list__item-link')) {
                this.hideActiveSidebar();
            
                target.classList.add('active');
            }
        })

        const searchValue = document.querySelector('.search__input'),
              searchLink = document.querySelector('.search__link');

        searchLink.addEventListener('click', () => {

            localStorage.setItem('search', searchValue.value);

            location.reload();
        })

    }

    hideActiveSidebar() {
        const linkSidebar = document.querySelectorAll('.list__item-link');

        linkSidebar.forEach(item => {
            item.classList.remove('active');
        })
    }

    getRequestFromLS() {
        return localStorage.getItem('search');
    }

    filterRecipes(arrayRecipes) {
        const searchValue = this.getRequestFromLS().toLocaleLowerCase(),
              filteredArray = [];
        let   recipesFromLS, result = [];

        arrayRecipes.forEach(item => {
            const arr = item.dish.toLocaleLowerCase().split(" ");
            
            if (item.dish == searchValue) {
                filteredArray.push(item);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == searchValue) {
                        filteredArray.push(item);
                    }
                }
            }
        })

        if (!localStorage.getItem('arrayTypesOfCuisines') && localStorage.getItem('typesOfCuisines')) {
            recipesFromLS = localStorage.getItem('typesOfCuisines');

            return filteredArray.filter(item => {
                    return item.cuisine == recipesFromLS;
            })
        }

        if (localStorage.getItem('arrayTypesOfCuisines') && localStorage.getItem('typesOfCuisines')) {
            recipesFromLS = JSON.parse(localStorage.getItem('arrayTypesOfCuisines'));

            for (let recipe of filteredArray) {
                for (let type of recipesFromLS) {
                    if (recipe.cuisine == type) {
                        result.push(recipe);
                    }
                }
            }
        }

        return result;
    }

    renderFilteredRecipes(filteredArray) {
        let strRenderRecipes = '';

        if (filteredArray.length) {
            filteredArray.forEach(item => {
                strRenderRecipes += `
                    <div class="card-box" data-id="${item.id}">
                        <div class="card-img-body">
                            <img class= "card-img" src="${item.path}" alt="">
                        </div>
                        <div class="card-text">
                            <h1 class="card-title">
                                ${item.dish}
                            </h1>
                            <h2 class="card-subtitle">
                                ${item.cuisineStr}
                            </h2>
                            <p class="card-desc">
                                ${item.description}
                            </p>
                        </div>
                        <div class="card-button-body">
                            <a class="card-button" href="#/app/info-recipes/${item.id}">
                                Подробнее
                            </a>
                        </div>
                    </div>                    
                `;
            })
        } else {
            strRenderRecipes = `
                <div class="nothing-found">
                    <div class="nothing-found__img">
                        <img src="images/images/nothing_found.png" alt="Ничего не найдено">
                    </div>
                </div>                    
            `;
        }
        

        return strRenderRecipes;
    }

    getArrayTypesOfCuisine() {
        let arrayCuisines = [];

        if(!localStorage.getItem('arrayTypesOfCuisines') && localStorage.getItem('typesOfCuisines')) {
            arrayCuisines.push(localStorage.getItem('typesOfCuisines'));
        }

        if(localStorage.getItem('arrayTypesOfCuisines') && localStorage.getItem('typesOfCuisines')) {
            arrayCuisines = JSON.parse(localStorage.getItem('arrayTypesOfCuisines'));
        }

        return arrayCuisines;
    }

    renderTypesOfCuisine(data) {
        let strRenderCuisines = '';

        if (data.length) {
            data.forEach(item => {
                strRenderCuisines += `
                    <div class="typesOfCuisines__item" data-type="${item}">
                        <img class="typesOfCuisines__img" src="images/images/pages/flags/flag_${item}.png" alt="flag ${item}">
                    </div>                
                `;
            })
        }

        return strRenderCuisines;
    }
}

export default SearchRecipes;