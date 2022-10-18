import Component from '../component.js';

class Settings extends Component{
    async render() {
        return `                
            <div class="wraper wrapper_app">
                <div class="app__bg app__bg_cookie"></div>
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
            <div class="wrapper-settings">
                <div class="settings">
                    <div class="checkbox-block settings__checkbox">
                        <div class="checkbox-block__item" data-type="BLR">
                            <img class="checkbox-block__img" src="images/images/pages/flags/flag_BLR.png" alt="" data-type="BLR">
                        </div>
                        <div class="checkbox-block__item" data-type="RUS">
                            <img class="checkbox-block__img" src="images/images/pages/flags/flag_RUS.png" alt="" data-type="RUS">
                        </div>
                        <div class="checkbox-block__item" data-type="UKR">
                            <img class="checkbox-block__img" src="images/images/pages/flags/flag_UKR.png" alt="" data-type="UKR">
                        </div>
                        <div class="checkbox-block__item" data-type="LTV">
                            <img class="checkbox-block__img" src="images/images/pages/flags/flag_LTV.png" alt="" data-type="LTV">
                        </div>
                        <div class="checkbox-block__item" data-type="POL">
                            <img class="checkbox-block__img" src="images/images/pages/flags/flag_POL.png" alt="" data-type="POL">
                        </div>
                        <div class="checkbox-block__item" data-type="VEG">
                            <img class="checkbox-block__img" src="images/images/pages/flags/flag_VEG.png" alt="" data-type="VEG">
                        </div>
                    </div>
                </div>
            </div>     
        `;
    }

    afterRender() {
        this.setActions();

        this.setCuisineFromStart();

        this.setAttributeCuisines();
    }

    setActions() {
        const container = document.querySelector('.page-container');

        container.addEventListener('click', event => {
            event.stopImmediatePropagation();
        })

        const hamburgerSidebar = document.querySelector('.navbar__hamburger'),
              listSidebar = document.querySelector('.list'),
              wrapperTypesOfCuisines = document.querySelector('.wrapper-typesOfCuisines'),
              wrapperSettings = document.querySelector('.wrapper-settings');

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperSettings.classList.add('wrapper-settings_position');
                wrapperTypesOfCuisines.classList.add('wrapper-typesOfCuisines_position');
            } else {
                wrapperSettings.classList.remove('wrapper-settings_position');
                wrapperTypesOfCuisines.classList.remove('wrapper-typesOfCuisines_position');
            }
        })

        listSidebar.addEventListener('click', e => {
            const target = e.target;

            if (target && target.classList.contains('list__item-link')) {
                this.hideActiveSidebar();
            
                target.classList.add('active');
            }
        })

        const сheckboxBlock = document.getElementsByClassName('checkbox-block');

        сheckboxBlock[0].addEventListener('click', event => {
            let target = event.target;

            if(target.tagName == 'IMG') {
                target.classList.toggle('checkbox-block__img_active');
            }

            this.getArrayTypesOfCuisines();

            location.reload();
        })
    }

    hideActiveSidebar() {
        const linkSidebar = document.querySelectorAll('.list__item-link');

        linkSidebar.forEach(item => {
            item.classList.remove('active');
        })
    }

    getArrayTypesOfCuisines() {
        
        const arrayCheckboxes = document.getElementsByClassName('checkbox-block__img'),
              arrayCurrentTypesOfCuisines = [];

        for (let i = 0; i < arrayCheckboxes.length; i++) {
            if (arrayCheckboxes[i].classList.contains('checkbox-block__img_active')) {
                
            arrayCurrentTypesOfCuisines.push(arrayCheckboxes[i].dataset.type);
            }
        }

        localStorage.setItem('arrayTypesOfCuisines', JSON.stringify(arrayCurrentTypesOfCuisines));
    }

    setCuisineFromStart() {
    
        if(!localStorage.getItem('arrayTypesOfCuisines') && localStorage.getItem('typesOfCuisines')) {
            
            const currentCuisineFromStart = localStorage.getItem('typesOfCuisines'),
                  arrayCheckboxes = document.getElementsByClassName('checkbox-block__img');

            for (let i = 0; i < arrayCheckboxes.length; i++) {
                if (arrayCheckboxes[i].dataset.type == currentCuisineFromStart) {
                    arrayCheckboxes[i].classList.add('checkbox-block__img_active');
                }
            }
        }
    }

    setAttributeCuisines() {
        const currentCuisines = JSON.parse(localStorage.getItem('arrayTypesOfCuisines')),
              arrayCheckboxes = document.getElementsByClassName('checkbox-block__img');

        if(currentCuisines) {
            for (let i = 0; i < arrayCheckboxes.length; i++) {
            
                for (let j = 0; j < currentCuisines.length; j++) {
                    if (currentCuisines[j] == arrayCheckboxes[i].dataset.type) {
                        arrayCheckboxes[i].classList.add('checkbox-block__img_active');
                    }
                }
                if (currentCuisines.find(item => {
                    return item == arrayCheckboxes[i].dataset.type;
                })) {
                    arrayCheckboxes[i].classList.add('checkbox-block__img_active');
                }
            }
        }
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

export default Settings;