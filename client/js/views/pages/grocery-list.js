import Component from '../component.js';

import Recipes from '../../models/recipes.js';

class GroceryList extends Component {
    async getData() {
        return await Recipes.getRecipesList();
    }

    async render(data) {
        const arrayStr = this.getArrayIngredients(this.getArrayFiltered(data)),
              arrNameRecipes = this.getArrayFiltered(data);
        
        this.checkArrayTabsInLS('arrayTabs');
        this.checkArrayTabsInLS('arrayDish');
        
        return `
            <div class="wraper wrapper_app">
                <div class="app__bg app__bg_laptop"></div>
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

                </div>
            </div>
            <div class="wrapper-cart">
                <div class="container-cart-block">
                    <div class="cart-block" id="sec1">
                        <img class="cart-block__logo" src="images/icons/Cart.png" id="logo" alt="">
                        <div class="cart-block__tabs">
                            <img class="cart-block__img" src="images/icons/Лист_1.png" alt="" data-id="1">
                            <img class="cart-block__img" src="images/icons/Лист_2.png" alt="" data-id="2">
                            <img class="cart-block__img" src="images/icons/Лист_3.png" alt="" data-id="3">
                        </div>
                        <div class="cart-block__name-recipes-list">
                            ${this.renderListRecipes(arrNameRecipes)}
                        </div>
                        <div class="cart-block__list" id="list">
                            <div class="cart-block__edit-list" id="edit-list">
                                <button class="add-list-recipes"><i class="fas fa-clipboard-list"></i></button>
                                <input type="text" name="text" id="text" placeholder="Добавить ингредиент...">
                                <button id="add"><i class="fas fa-plus"></i></button>
                            </div>
                            <div class="cart-block__show-list" id="show-list">
		        	            ${this.renderIngredients(arrayStr)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        this.setActions();

        this.activateTabs();
    }

    setActions() {
        const container = document.querySelector('.page-container');

        container.addEventListener('click', event => {
            event.stopImmediatePropagation();
        })

        const hamburgerSidebar = document.querySelector('.navbar__hamburger'),
              listSidebar = document.querySelector('.list'),
              wrapperTypesOfCuisines = document.querySelector('.wrapper-typesOfCuisines'),
              wrapperCart = document.querySelector('.wrapper-cart');

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperTypesOfCuisines.classList.add('wrapper-typesOfCuisines_position');
                wrapperCart.classList.add('wrapper-cart_position');
            } else {
                wrapperTypesOfCuisines.classList.remove('wrapper-typesOfCuisines_position');
                wrapperCart.classList.remove('wrapper-cart_position');
            }
        })

        listSidebar.addEventListener('click', e => {
            const target = e.target;

            if (target && target.classList.contains('list__item-link')) {
                this.hideActiveSidebar();
            
                target.classList.add('active');
            }
        })

        const divShow = document.getElementById('show-list'),
              textBox = document.getElementById('text'),
              buttonAdd = document.getElementById('add'),
              showList = document.getElementById('show-list'),
              logo = document.querySelector('.cart-block__logo'),
              protect = '&XSS@';
        
        let addItems = (e) => {
            let result = textBox.value.replace('/', protect);
    
            result = result.replace('<', protect);
            result = result.replace('>', protect);
    
            if (e.keyCode === 13 || e.button === 0) {
               divShow.insertAdjacentHTML('afterbegin', `
                    <div class="module-list" id="module-list">
                        <p class="delete"><i class="fas fa-trash-alt"></i></p>
                        <p class="text-add">${result}</p>
                    </div>`);
            }
        }
        
        buttonAdd.addEventListener('mousedown', addItems, false);
        textBox.addEventListener('keyup', addItems, false);
        logo.addEventListener('click', onloadPage, false);

        showList.addEventListener('click', event => {
            const target= event.target;

            if (target.className == 'delete') {
                target.parentElement.remove();
            } 

            if (target.className == "fas fa-trash-alt") {
                target.parentElement.parentElement.remove();
            }
        })

        function onloadPage() {
            location.reload();
        }

        const addListRecipes = document.querySelector('.add-list-recipes'),
              cartblockTabs = document.querySelector('.cart-block__tabs'),
              cartBlockEditList = document.querySelector('.cart-block__edit-list'),
              arrayCartBlockShowList = document.querySelector('.cart-block__show-list'),
              cartBlockNameRecipesList = document.querySelector('.cart-block__name-recipes-list'),
              cartBlockNameRecipesListLink = document.getElementsByClassName('cart-block__name-recipes-list-link');
        
        addListRecipes.addEventListener('click', () => {
            let str = '';

            for (let i = 0; i < cartBlockNameRecipesListLink.length; i++) {
                str += `${cartBlockNameRecipesListLink[i].innerHTML} ` ;
            }

            this.setActualDishInLS(str);
            this.generateActualArrayList(this.getActualList());
            this.activateTabs();
        })

        cartblockTabs.addEventListener('click', event => {
            const target= event.target;

            cartBlockEditList.remove();
            cartBlockNameRecipesList.innerHTML = '';
            arrayCartBlockShowList.innerHTML = '';

            this.renderIngredientsInTab(target.dataset.id);
            this.renderNameRecipesInTab(target.dataset.id);
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
        const arrayIdFromLS = JSON.parse(localStorage.getItem('cart')),
              resultFiltered = [];

        if (arrayIdFromLS) {
            for (let i = 0; i < arrayIdFromLS.length; i++) {
                for (let item of data) {
                    if (arrayIdFromLS[i] == item.id) {
                        resultFiltered.push(item);
                    }
                }
            }
        } else {
            return [];
        }

        return resultFiltered;
    }

    getArrayIngredients(arraObj) {
        const arrayIngredients = [], arrayStrIngredients = [];

        for (let item of arraObj) {
            arrayIngredients.push(item.ingredients);
        }

        for (let item of arrayIngredients) {
            const arrayItem = item;

            for (let ingredients in arrayItem) {
                const str = `${ingredients}-${arrayItem[ingredients]}`;

                arrayStrIngredients.push(str);
            }
        }

        return arrayStrIngredients;
    }

    renderIngredients(data) {
        let strRenderIngredients = '';

        if (data.length) {
            data.forEach(item => {
                strRenderIngredients += `
                    <div class="module-list" id="module-list"> 
                        <p class="delete"><i class="fas fa-trash-alt"></i></p>
                        <p class="text-add">${item}</p>
                    </div>         
                `;
            })
        }

        return strRenderIngredients;
    }

    renderListRecipes(data) {
        let strRenderRecipes = '';

        if (data.length) {
            data.forEach(item => {
                strRenderRecipes += `
                    <a class="cart-block__name-recipes-list-link" href="#/app/info-recipes/${item.id}">${item.dish},</a>   
                `;
            })
        }

        return strRenderRecipes;
    }

    checkArrayTabsInLS(data) {
        if (!JSON.parse(localStorage.getItem(data))) {
            localStorage.setItem(data, JSON.stringify([]));
        }
    }

    getActualList() {
        const parent = document.getElementsByClassName('cart-block__show-list')[0],
              resultArray = [];
      
        if (parent.children.length) {
            const arrayTextListIngredients = parent.getElementsByClassName('text-add');

            for (let i = 0; i < arrayTextListIngredients.length; i++) {
                resultArray.push(arrayTextListIngredients[i].innerHTML);
            }
        }

        return resultArray;
    }

    generateActualArrayList(data) {
        const array = JSON.parse(localStorage.getItem('arrayTabs'));

        array.push(data);

        if (array.length < 4) {
            localStorage.setItem('arrayTabs', JSON.stringify(array));
        } else {
            array.splice(0, 1);
            localStorage.setItem('arrayTabs', JSON.stringify(array));
        }
    }

    activateTabs() {
        const array = JSON.parse(localStorage.getItem('arrayTabs')),
              tabs = document.querySelectorAll('.cart-block__img');

        for (let i = 1; i <= array.length; i++) {
            tabs[i-1].classList.add('cart-block__img_active');
        }
    }

    renderIngredientsInTab(index) {
        let strRenderIngredientsInTab = '';
        const arrayFromLS = JSON.parse(localStorage.getItem('arrayTabs')),
              cartBlockShowList = document.getElementsByClassName('cart-block__show-list'),
              cartBlockTabs = document.querySelector('.cart-block__tabs');

        if (cartBlockTabs.children[index-1].classList.contains('cart-block__img_active')) {
            if (arrayFromLS.length) {
                arrayFromLS[index-1].forEach(item => {
                    strRenderIngredientsInTab += `
                        <div class="module-list" id="module-list"> 
                            <p class="text-add">${item}</p>
                        </div>         
                    `;
                })
            }

            cartBlockShowList[0].innerHTML = strRenderIngredientsInTab;
        }
    }

    setActualDishInLS(data) {
        const arrayDishFromLS = JSON.parse(localStorage.getItem('arrayDish'));

        arrayDishFromLS.push(data);

        if (arrayDishFromLS.length < 4) {
            localStorage.setItem('arrayDish', JSON.stringify(arrayDishFromLS));
        } else {
            arrayDishFromLS.splice(0, 1);
            localStorage.setItem('arrayDish', JSON.stringify(arrayDishFromLS));
        }
    }

    renderNameRecipesInTab(index) {
        let strRenderNamerecipesInTab = '';
        const arrayFromLS = JSON.parse(localStorage.getItem('arrayDish')),
              cartBlockNameRecipesList = document.getElementsByClassName('cart-block__name-recipes-list'),
              cartBlockTabs = document.querySelector('.cart-block__tabs');

        if (cartBlockTabs.children[index-1].classList.contains('cart-block__img_active')) {
            
            if (arrayFromLS.length) {
                    strRenderNamerecipesInTab += `
                        <div class="cart-block__name-recipes-list-link">${arrayFromLS[index-1]}</div>       
                    `;
            }
  
            cartBlockNameRecipesList[0].innerHTML = strRenderNamerecipesInTab;
        }
    }
}

export default GroceryList;