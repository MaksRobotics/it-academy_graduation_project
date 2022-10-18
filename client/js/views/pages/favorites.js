import Component from '../component.js';

import Recipes from '../../models/recipes.js';

class Favotites extends Component{

    async getData() {
        return await Recipes.getRecipesList();
    }

    async render(data) {

        return `
            <div class="wraper wrapper_app">
                <div class="app__bg app__bg_honey"></div>
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
            <div class="wrapper-typesOfCuisines">
                <div class="typesOfCuisines">
                    ${this.renderTypesOfCuisine(this.getArrayTypesOfCuisine())}
                </div>
            </div>
            <div class="wrapper-cards-favorite">
                <div class="cards-favorite">
                    ${this.renderCradsFavorite(this.getArrayFiltered(data))}
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
              wrapperTypesOfCuisines = document.querySelector('.wrapper-typesOfCuisines'),
              wrapperCardsFavorite = document.querySelector('.wrapper-cards-favorite');

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperTypesOfCuisines.classList.add('wrapper-typesOfCuisines_position');
                wrapperCardsFavorite.classList.add('wrapper-cards-favorite_position');
            } else {
                wrapperTypesOfCuisines.classList.remove('wrapper-typesOfCuisines_position');
                wrapperCardsFavorite.classList.remove('wrapper-cards-favorite_position');
            }
        })

        listSidebar.addEventListener('click', e => {
            const target = e.target;

            if (target && target.classList.contains('list__item-link')) {
                this.hideActiveSidebar();
            
                target.classList.add('active');
            }
        })

        const cardsFavorite = document.querySelector('.cards-favorite');

        cardsFavorite.addEventListener('click', event => {
            const target = event.target;

            if (target && !target.classList.contains('cards-favorite')) {
                location.hash = `#/app/info-recipes/${target.dataset.id}`; 
            }
        })
    }

    hideActiveSidebar() {
        const linkSidebar = document.querySelectorAll('.list__item-link');

        linkSidebar.forEach(item => {
            item.classList.remove('active');
        })
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

    getArrayFiltered(data) {
        const arrayIdFromLS = JSON.parse(localStorage.getItem('favorites')),
              resultFiltered = [];

        if (arrayIdFromLS.length <= 10) {
            for (let i = 0; i < arrayIdFromLS.length; i++) {
                for (let item of data) { 
                    if (arrayIdFromLS[i] == item.id) {
                        resultFiltered.push(item);
                    }
                }
            }
        } else {
            arrayIdFromLS.splice(0, arrayIdFromLS.length - 10);

            for (let i = 0; i < arrayIdFromLS.length; i++) {
                for (let item of data) {
                    if (arrayIdFromLS[i] == item.id) {
                        resultFiltered.push(item);
                    }
                }
            }
        }

        return resultFiltered;
    }

    renderCradsFavorite(data) {
        let strRenderFavorites = '';

        if (data.length) {
            data.forEach(item => {
                strRenderFavorites += `
                    <div class="cards-favorite__item" data-id="${item.id}">
                        <div class="cards-favorite__item-top" data-id="${item.id}">
                            <img src="${item.path}" alt="food picture" data-id="${item.id}">
                        </div>
                        <div class="cards-favorite__item-bottom" data-id="${item.id}">
                            <h2 class="cards-favorite__title" data-id="${item.id}">${item.dish}</h2>
                            <div class="cards-favorite__details" data-id="${item.id}">
                                <div class="cards-favorite__icon" data-id="${item.id}"><i class="far fa-clock"></i> ${item.time} минут</div>
                                <div class="cards-favorite__icon" data-id="${item.id}"><i class="fas fa-pizza-slice"></i> ${item.numberIngredients} ингредиентов</div>
                                <div class="cards-favorite__icon" data-id="${item.id}"><i class="fas fa-burn"></i> ${item.calories} Ккал</div>
                            </div>
                        </div>
                    </div>               
                `;
            })
        }

        return strRenderFavorites;
    }
}

export default Favotites;