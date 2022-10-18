import Component from '../component.js';

import Recipes from '../../models/recipes.js';

import {parseCurrentURL} from '../../helpers/utils.js';

class InfoRecipes extends Component {

    async getData() {
        this.createCurrentRecipesInLs({});

		return await Recipes.getRecipe(this.urlPartsIdPage());
	}

    async render(data) {
        this.createCurrentRecipesInLs(data);

        return `
            <div class="wraper wrapper_app">
                <div class="app__bg app__bg_dark"></div>
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

            <div class="wrapper-info-recipes">
                <div class="info-recipes">
                    <div class="info-recipes__headers">
                        <div class="info-recipes__headers-meal">${data.mealRus}</div>
                        <h2 class="info-recipes__headers-dish">${data.dish}</h2>
                        <i class="recipe-icon recipe-icon_position far fa-heart fa-2x"></i>
                        <i class="recipe-icon recipe-icon_position-cart fas fa-cart-plus fa-2x"></i>
                    </div>
                    <div class="container-info-recipes">
                        <div class="info-recipes__right_row1">
                            <a class="info-recipes__popup-link" href=${data.youtube}>
                                <img class="info-recipes__popup-img" src=${data.path} alt="">
                                <img class="info-recipes__icon-play" src="images/icons/Play_blue.png" alt="">
                            </a>  
                        </div>
                        <div class="info-recipes__right_row2">
                            <h3 class="info-recipes__header-uppercase">Описание:</h3>
                            <p class="info-recipes__description">${data.description}</p>
                        </div>
                        <div class="info-recipes__left_row1">
                            <div class="recipe-info">
                                <div class="recipe-info_row">
                                    <i class="recipe-icon fas fa-utensils fa-2x"></i>
                                    <div class="flex-row">
                                        <p class="recipe-info_text">Кухня:</p>
                                        <p class="recipe-info_text">${data.cuisineRUS}</p>
                                    </div>
                                </div>
                                <div class="recipe-info_row">
                                    <i class="recipe-icon fas fa-bell fa-2x"></i>
                                    <div class="flex-row">
                                        <p class="recipe-info_text">Время:</p>
                                        <p class="recipe-info_text">${data.time} минут</p>
                                    </div>
                                </div>
                                <div class="recipe-info_row">
                                    <i class="recipe-icon fas fa-pizza-slice fa-2x"></i>
                                    <div class="flex-row">
                                        <p class="recipe-info_text">Ингредиенты:</p>
                                        <p class="recipe-info_text">${data.numberIngredients} шт.</p>
                                    </div>
                                </div>
                                <div class="recipe-info_row">
                                    <i class="recipe-icon fas fa-fire-alt fa-2x"></i>
                                    <div class="flex-row">
                                        <p class="recipe-info_text">Калории:</p>
                                        <p class="recipe-info_text">${data.calories} Ккал</p>
                                    </div>
                                </div>
                                <div class="recipe-info_row">
                                    <i class="recipe-icon fas fa-dna fa-2x"></i>
                                    <div class="flex-row">
                                        <p class="recipe-info_text">Б/Ж/У:</p>
                                        <p class="recipe-info_text">${data.proteins} гр./${data.fats} гр./${data.carbohydrates} гр.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-recipes__left_row2">
                            <h3 class="info-recipes__header-uppercase">Ингредиенты:</h3>
                            <div class="info-recipes__tablet_left">
                                <p class="info-recipes__header-normal"></p>
                                <p class="info-recipes__list_list">${this.getStringIngredients(data)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        `;
    }

    afterRender() {
        this.setActions();

        this.checkIconsStatus('.fa-heart','favorites');
        this.checkIconsStatus('.fa-cart-plus','cart');
    }

    setActions() {
        const container = document.querySelector('.page-container');

        container.addEventListener('click', event => {
            event.stopImmediatePropagation();
        })

        const hamburgerSidebar = document.querySelector('.navbar__hamburger'),
              listSidebar = document.querySelector('.list'),
              wrapperInfoRecipes = document.querySelector('.wrapper-info-recipes');
              

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperInfoRecipes.classList.add('wrapper-info-recipes_position');
                
            } else {
                wrapperInfoRecipes.classList.remove('wrapper-info-recipes_position');
            }
        })

        listSidebar.addEventListener('click', e => {
            const target = e.target;

            if (target && target.classList.contains('list__item-link')) {
                this.hideActiveSidebar();
            
                target.classList.add('active');
            }
        }) 

        const heart = document.querySelector('.fa-heart'),
              cart = document.querySelector('.fa-cart-plus');

        heart.addEventListener('click', () => {
            heart.classList.toggle('recipe-icon_active');

            if (heart.classList.contains('recipe-icon_active')) {
                this.setItemInLS('favorites');
            } else {
                this.deleteItemInLS('favorites');
            }
        })

        cart.addEventListener('click', () => {
            cart.classList.toggle('recipe-icon_active');

            if (cart.classList.contains('recipe-icon_active')) {
                this.setItemInLS('cart');
            } else {
                this.deleteItemInLS('cart');
            }
        })
    }

    urlPartsIdPage() {
        const objPartsPage = parseCurrentURL();

        return objPartsPage.id;
    }

    hideActiveSidebar() {
        const linkSidebar = document.querySelectorAll('.list__item-link');

        linkSidebar.forEach(item => {
            item.classList.remove('active');
        })
    }

    getStringIngredients(data) {
        let srtIngredients = '';

        for (let item in data.ingredients) {
            srtIngredients += `${item} (${data.ingredients[item]}), `;
        }

        return srtIngredients.slice(0, (srtIngredients.length - 2));
    }

    createCurrentRecipesInLs(data) {
        localStorage.setItem('currentRecipes', JSON.stringify(data));
    }

    setItemInLS(name) {
        const objectRecipe = JSON.parse(localStorage.getItem('currentRecipes'));

        if (!JSON.parse(localStorage.getItem(name))) {
            localStorage.setItem(name, JSON.stringify([]));

            const array = JSON.parse(localStorage.getItem(name));

            array.push(objectRecipe.id);

            localStorage.setItem(name, JSON.stringify(array));
        } else {
            const array = JSON.parse(localStorage.getItem(name));

            array.push(objectRecipe.id);

            localStorage.setItem(name, JSON.stringify(array));
        }
    }

    deleteItemInLS(name) {
        const objectRecipe = JSON.parse(localStorage.getItem('currentRecipes'));

        if (!JSON.parse(localStorage.getItem(name))) {
            localStorage.setItem(name, JSON.stringify([]));

            const array = JSON.parse(localStorage.getItem(name));

            const bool = array.indexOf(objectRecipe.id);

            if (bool != (-1)) {
                
                for (let index of array) {
                    if (array[index] == objectRecipe.id) {
                        array.splice(index, 1);
                    }
                }

            localStorage.setItem(name, JSON.stringify(array));
            }
        } else {
            const array = JSON.parse(localStorage.getItem(name));

            const bool = array.indexOf(objectRecipe.id);

            if (bool != (-1)) {
                for(let i = 0; i < array.length; i++) {
                    if (array[i] == objectRecipe.id) {
                        array.splice(i, 1);
                    }
                }

            localStorage.setItem(name, JSON.stringify(array));
            }
        }
    }

    checkIconsStatus(item, string) {

        if (JSON.parse(localStorage.getItem(string))) {
            const array = JSON.parse(localStorage.getItem(string)),
                  objectRecipe = JSON.parse(localStorage.getItem('currentRecipes')),
                  html = document.querySelector(item),
                  bool = array.indexOf(objectRecipe.id);

        if (bool != (-1)) {
            html.classList.add('recipe-icon_active');
            }
        }
    }
}

export default InfoRecipes;