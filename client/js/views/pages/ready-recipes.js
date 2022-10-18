import Component from '../component.js';

import Recipes from '../../models/recipes.js';

import {getRandomInt} from '../../helpers/utils.js';

class ReadyRecipes extends Component{
    constructor() {
        super();
        self = this;
    }

    async getData() {
        return await Recipes.getRecipesList();
    }

    async render(data) {
        const objBreakfast = this.getFilteredRecipesForCards(data, 'breakfast'),
              objLunch = this.getFilteredRecipesForCards(data, 'lunch'),
              objDinner = this.getFilteredRecipesForCards(data, 'dinner');

        return `
            <div class="wraper wrapper_app">
                <div class="app__bg app__bg_spaghetti"></div>
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
            <div class="wrapper-ready-recipes">
                ${this.renderCardRecipes(objBreakfast, objLunch, objDinner)}
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
              wrapperReadyRecipes = document.querySelector('.wrapper-ready-recipes');

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperTypesOfCuisines.classList.add('wrapper-typesOfCuisines_position');
                wrapperReadyRecipes.classList.add('wrapper-ready-recipes_position');
            } else {
                wrapperTypesOfCuisines.classList.remove('wrapper-typesOfCuisines_position');
                wrapperReadyRecipes.classList.remove('wrapper-ready-recipes_position');
            }
        })

        listSidebar.addEventListener('click', e => {
            const target = e.target;

            if (target && target.classList.contains('list__item-link')) {
                this.hideActiveSidebar();
            
                target.classList.add('active');
            }
        })

        let length = JSON.parse(localStorage.getItem('arrayTypesOfCuisines')).length;
        
        if (length) {
            const tabs = document.querySelectorAll('.select-recipes__item'),
                  tabsParent = document.querySelector('.select-recipes'),
                  tabsContent = document.querySelectorAll('.ready-recipes');

            this.hideTabContent(tabs, tabsContent);
            this.showTabContent(tabs, tabsContent);

            tabsParent.addEventListener('click', event => {
                event.stopPropagation();

                const target = event.target;

                if (target && target.classList.contains('select-recipes__item')) {
                    tabs.forEach((item, i) => {
                        if (target == item) {
                            self.hideTabContent(tabs, tabsContent);
                            self.showTabContent(tabs, tabsContent, i);
                        }
                    });
                }
            });
        } 
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

    hideTabContent(items, content) {
        content.forEach(item => {
            item.classList.add('ready-recipes_hide');
            item.classList.remove('ready-recipes_show', 'ready-recipes_fade');
        });

        items.forEach(item => {
            item.classList.remove('select-recipes__item_active');
        });
    }

    showTabContent(items, content, i = 0) {
        let length = JSON.parse(localStorage.getItem('arrayTypesOfCuisines')).length;
        
        if (localStorage.getItem('typesOfCuisines') && JSON.parse(localStorage.getItem('arrayTypesOfCuisines')) && !length) {
            return;
        }

        content[i].classList.add('ready-recipes_show', 'ready-recipes_fade');
        content[i].classList.remove('ready-recipes_hide');
        items[i].classList.add('select-recipes__item_active');
    }

    renderCardRecipes(breakfast, lunch, dinner) {
        let length = JSON.parse(localStorage.getItem('arrayTypesOfCuisines')).length;
        
        if (localStorage.getItem('typesOfCuisines') && JSON.parse(localStorage.getItem('arrayTypesOfCuisines')) && !length) {
            return `
                <div class="cuisines-not-found">
                    <div class="cuisines-not-found__img">
                        <img src="images/images/cuisines_not_found.jpg" alt="Ничего не найдено">
                    </div>
                </div>                    
            `;
        }

        return `
            <div class="select-recipes">
                <div class="select-recipes__item select-recipes__breakfast select-recipes__item_active">Завтра</div>
                <div class="select-recipes__item select-recipes__lunch">Обед</div>
                <div class="select-recipes__item select-recipes__dinner">Ужин</div>
            </div>
            <div class="ready-recipes ready-recipes__breakfast ready-recipes_show ready-recipes_fade" data-id="${breakfast.id}">
                <div class="ready-recipes__card">
                    <div class="ready-recipes__thumbnail"><img class="left" src="${breakfast.path}" alt="Изображение рецепта"/></div>
                    <div class="ready-recipes__right-block">
                        <h1 class="ready-recipes__title"><a href="#/app/info-recipes/${breakfast.id}">${breakfast.dish}</a></h1>
                        <div class="ready-recipes__period-of-eating">
                              <img src="images/icons/icon_breakfast.svg"/>
                        </div>
                        <div class="ready-recipes__separator"></div>
                        <p class="ready-recipes__text">${breakfast.description}</p>
                    </div>
                    <h5 class="ready-recipes__calories-number">${breakfast.calories}</h5>
                    <h6 class="ready-recipes__calories-units">ккал</h6>
                    <ul class="ready-recipes__icons">
                        <li>
                            ${breakfast.proteins}
                            <i class="fas fa-dna"></i>
                        </li>
                        <li>
                            ${breakfast.fats}
                            <i class="fas fa-hamburger"></i>
                        </li>
                        <li>
                            ${breakfast.carbohydrates}
                            <i class="fas fa-cookie"></i>
                        </li>
                        <li>
                            ${breakfast.numberIngredients}
                            <i class="fas fa-list-ol"></i>
                        </li>
                    </ul>
                    <div class="ready-recipes__fab"><img src="images/images/pages/flags/flag_${breakfast.cuisine}.png" alt=""></div>
                </div>
            </div>
            <div class="ready-recipes ready-recipes__lunch ready-recipes_hide" data-id="${lunch.id}">
                <div class="ready-recipes__card">
                    <div class="ready-recipes__thumbnail"><img class="left" src="${lunch.path}" alt="Изображение рецепта"/></div>
                    <div class="ready-recipes__right-block">
                        <h1 class="ready-recipes__title"><a href="#/app/info-recipes/${lunch.id}">${lunch.dish}</a></h1>
                        <div class="ready-recipes__period-of-eating">
                            <img src="images/icons/icon_lunch.svg"/>
                        </div>
                        <div class="ready-recipes__separator"></div>
                        <p class="ready-recipes__text">${lunch.description}</p>
                    </div>
                    <h5 class="ready-recipes__calories-number">${lunch.calories}</h5>
                    <h6 class="ready-recipes__calories-units">ккал</h6>
                    <ul class="ready-recipes__icons">
                        <li>
                            ${lunch.proteins}
                            <i class="fas fa-dna"></i>
                        </li>
                        <li>
                            ${lunch.fats}
                            <i class="fas fa-hamburger"></i>
                        </li>
                        <li>
                            ${lunch.carbohydrates}
                            <i class="fas fa-cookie"></i>
                        </li>
                        <li>
                            ${lunch.numberIngredients}
                            <i class="fas fa-list-ol"></i>
                        </li>
                    </ul>
                    <div class="ready-recipes__fab"><img src="images/images/pages/flags/flag_${lunch.cuisine}.png" alt=""></div>
                </div>
            </div>
            <div class="ready-recipes ready-recipes__dinner ready-recipes_hide" data-id="${dinner.id}">
                <div class="ready-recipes__card">
                    <div class="ready-recipes__thumbnail"><img class="left" src="${dinner.path}" alt="Изображение рецепта"/></div>
                    <div class="ready-recipes__right-block">
                        <h1 class="ready-recipes__title"><a href="#/app/info-recipes/${dinner.id}">${dinner.dish}</a></h1>
                        <div class="ready-recipes__period-of-eating">
                            <img src="images/icons/icon_dinner.svg"/>
                        </div>
                        <div class="ready-recipes__separator"></div>
                        <p class="ready-recipes__text">${dinner.description}</p>
                    </div>
                    <h5 class="ready-recipes__calories-number">${dinner.calories}</h5>
                    <h6 class="ready-recipes__calories-units">ккал</h6>
                    <ul class="ready-recipes__icons">
                        <li>
                            ${dinner.proteins}
                            <i class="fas fa-dna"></i>
                        </li>
                        <li>
                            ${dinner.fats}
                            <i class="fas fa-hamburger"></i>
                        </li>
                        <li>
                            ${dinner.carbohydrates}
                            <i class="fas fa-cookie"></i>
                        </li>
                        <li>
                            ${dinner.numberIngredients}
                            <i class="fas fa-list-ol"></i>
                        </li>
                    </ul>
                    <div class="ready-recipes__fab"><img src="images/images/pages/flags/flag_${dinner.cuisine}.png" alt=""></div>
                </div>
            </div>
        `;
    }

    getFilteredRecipesForCards(data, str) {
        const CONST_PORTION_BREAKFAST = 3,
              CONST_PORTION_LUNCH = 3.5,
              CONST_PORTION_DINNER = 2.5,
              CONST_BREAKFAST = 0.3,
              CONST_LUNCH = 0.45,
              CONST_DINNER = 0.25;

        let arrayFilteredBreakfast, arrayFilteredLunch, arrayFilteredDinner;
        
        if (localStorage.getItem('resultCalories')) {

            if (str == 'breakfast') {
                arrayFilteredBreakfast = data.filter(item => {
                    return ((item.meal == str) && ((localStorage.getItem('resultCalories') * CONST_BREAKFAST) >= (CONST_PORTION_BREAKFAST  * item.calories)));
                })
    
                const result = this.getFilteredRecipesWithCuisine(arrayFilteredBreakfast);
                
                return result[getRandomInt(0, (result.length))];
            }
    
            if (str == 'lunch') {
                arrayFilteredLunch = data.filter(item => {
                    return ((item.meal == str) && ((localStorage.getItem('resultCalories') * CONST_LUNCH) >= (CONST_PORTION_LUNCH  * item.calories)));
                })
                
                const result = this.getFilteredRecipesWithCuisine(arrayFilteredLunch);

                return result[getRandomInt(0, (result.length))];
            }
    
            if (str == 'dinner') {
                arrayFilteredDinner = data.filter(item => {
                    return ((item.meal == str) && ((localStorage.getItem('resultCalories') * CONST_DINNER) >= (CONST_PORTION_DINNER  * item.calories)));
                })

                const result = this.getFilteredRecipesWithCuisine(arrayFilteredDinner);

                return result[getRandomInt(0, (result.length))];
            }
        } else {
            if (str == 'breakfast') {
                arrayFilteredBreakfast = data.filter(item => {
                    return (item.meal == str);
                })

                const result = this.getFilteredRecipesWithCuisine(arrayFilteredBreakfast);

                return result[getRandomInt(0, (result.length))];
            }
    
            if (str == 'lunch') {
                arrayFilteredLunch = data.filter(item => {
                    return (item.meal == str);
                })

                const result = this.getFilteredRecipesWithCuisine(arrayFilteredLunch);

                return result[getRandomInt(0, (result.length))];
            }
    
            if (str == 'dinner') {
                arrayFilteredDinner = data.filter(item => {
                    return (item.meal == str);
                })

                const result = this.getFilteredRecipesWithCuisine(arrayFilteredDinner);

                return result[getRandomInt(0, (result.length))];
            }
        }
    }

    getFilteredRecipesWithCuisine(data) {
        const typesOfCuisines = localStorage.getItem('typesOfCuisines');

        if (localStorage.getItem('typesOfCuisines') && !localStorage.getItem('arrayTypesOfCuisines')) {
            return data.filter(item => {
                return (item.cuisine == typesOfCuisines);
            })
        }

        if (localStorage.getItem('typesOfCuisines') && localStorage.getItem('arrayTypesOfCuisines')) {
            const arrayTypesOfCuisines = JSON.parse(localStorage.getItem('arrayTypesOfCuisines'));
            let   resultFilterRecipes = [];

            for (let i = 0; i < arrayTypesOfCuisines.length; i++) {
                for (let item of data) {
                    if (item.cuisine == arrayTypesOfCuisines[i]) {
                        resultFilterRecipes.push(item);
                    }
                }
            }

            return resultFilterRecipes;
        }
    }
}

export default ReadyRecipes;