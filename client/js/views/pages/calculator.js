import Component from '../component.js';

import {calculationRequiredCalories} from '../../helpers/utils.js';

class Calculator extends Component{
    constructor() {
        super();
        this.sex = 'female';
        this.height = 0;
        this.weight = 0;
        this.age = 0;
        this.ratio = 1.375;
    }

    async render() {
        return `
            <div class="wraper wrapper_app">
                <div class="app__bg app__bg_breakfast"></div>
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
            <div class="calculating">
                <div class="calculating__container">
                    <h2 class="calculating__title">Калькулятор для расчета суточного потребления калорий
                    </h2>
                    <div class="calculating__field">
                        <div class="calculating__subtitle">
                            Ваш пол
                        </div>
                        <div class="calculating__choose" id="gender">
                            <div id="female" class="calculating__choose-item calculating__choose-item_active">Женщина</div>
                            <div id="male" class="calculating__choose-item">Мужчина</div>
                        </div>

                        <div class="calculating__subtitle">
                            Ваш рост, вест и возраст
                        </div>
                        <div class="calculating__choose calculating__choose_medium">
                            <input type="text" id="height" placeholder="Введите рост" class="calculating__choose-item">
                            <input type="text" id="weight" placeholder="Введите вес"  class="calculating__choose-item">
                            <input type="text" id="age" placeholder="Введите возраст" class="calculating__choose-item">
                        </div>

                        <div class="calculating__subtitle">
                            Выберите вашу физическая активность
                        </div>
                        <div class="calculating__choose calculating__choose_big">
                            <div data-ratio="1.2" id="low" class="calculating__choose-item">Низкая активность </div>
                            <div data-ratio="1.375" id="small"  class="calculating__choose-item calculating__choose-item_active">Невысокая активность</div>
                            <div data-ratio="1.55" id="medium" class="calculating__choose-item">Умеренная активность</div>
                            <div data-ratio="1.725" id="high" class="calculating__choose-item">Высокая активность</div>
                        </div>

                        <div class="calculating__divider"></div>

                        <div class="calculating__total">
                            <div class="calculating__subtitle">
                                Ваша суточная норма калорий:
                            </div>
                            <div class="calculating__result">
                                <span>2700</span> ккал
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        `;
    }

    afterRender() {
        this.setActions();

        this.calculationResult();
    }

    setActions() {
        const container = document.querySelector('.page-container');

        container.addEventListener('click', event => {
            event.stopImmediatePropagation();
        })

        const hamburgerSidebar = document.querySelector('.navbar__hamburger'),
              listSidebar = document.querySelector('.list'),
              wrapperTypesOfCuisines = document.querySelector('.wrapper-typesOfCuisines'),
              wrapperCalculating = document.querySelector('.calculating');

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperTypesOfCuisines.classList.add('wrapper-typesOfCuisines_position');
                wrapperCalculating.classList.add('calculating_position');
            } else {
                wrapperTypesOfCuisines.classList.remove('wrapper-typesOfCuisines_position');
                wrapperCalculating.classList.remove('calculating_position');
            }
        })

        listSidebar.addEventListener('click', e => {
            const target = e.target;

            if (target && target.classList.contains('list__item-link')) {
                this.hideActiveSidebar();
            
                target.classList.add('active');
            }
        })

        const parentSelectorGender = document.getElementById('gender'),
              childrenSelectorGender = document.querySelectorAll('#gender .calculating__choose-item'),
              parentSelectorActivity = document.getElementsByClassName('calculating__choose_big'),
              childrenSelectorActivity= document.querySelectorAll('.calculating__choose_big .calculating__choose-item');

        parentSelectorGender.addEventListener('click', event => {
            const target = event.target;

            if (target.id == 'male' || target.id == 'female') {
                this.sex = target.getAttribute('id');
  
                childrenSelectorGender.forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active');
                });
                
                target.classList.add('calculating__choose-item_active');
            }
                
            this.calculationResult();
        })

        parentSelectorActivity[0].addEventListener('click', event => {
            const target = event.target;

            if (target.getAttribute('data-ratio')) {
                this.ratio = target.getAttribute('data-ratio');

                childrenSelectorActivity.forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active');
                });

                target.classList.add('calculating__choose-item_active');
            }

            this.calculationResult();
        })

        this.getDynamicInformation('#height');
        this.getDynamicInformation('#weight');
        this.getDynamicInformation('#age');
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

    calculationResult() {
        const result = document.querySelector('.calculating__result span');

        if (!this.sex || !this.height || !this.weight || !this.age || !this.ratio) {
            result.textContent = '____'; 
            return;
        }

        result.textContent = calculationRequiredCalories(this.sex, this.weight, this.height, this.age, this.ratio);
        this.setСaloriesToLS(calculationRequiredCalories(this.sex, this.weight, this.height, this.age, this.ratio));
    }

    getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height':
                    this.height = input.value;
                    break;
                case 'weight':
                    this.weight = input.value;
                    break;
                case 'age':
                    this.age = input.value;
                    break;
            }

            this.calculationResult();
        });
    }

    setСaloriesToLS(result) {
        localStorage.setItem('resultCalories', result);
    }
}

export default Calculator;