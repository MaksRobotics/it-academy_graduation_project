import Component from '../component.js';

class Home extends Component {
    async render() {

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
            <div class="wrapper-welcome">
                <div class="welcome">
                    <img class="welcome__img" src="images/images/pages/welcome.gif" alt="">
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
              wrapperWelcome = document.querySelector('.wrapper-welcome');

        hamburgerSidebar.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector('.wrapper-sidebar').classList.toggle('active');

            if (document.querySelector('.wrapper-sidebar').classList.contains('active')) {
                wrapperSearch.classList.add('wrapper-search_position');
                wrapperTypesOfCuisines.classList.add('wrapper-typesOfCuisines_position');
                wrapperWelcome.classList.add('wrapper-welcome_position');
            } else {
                wrapperSearch.classList.remove('wrapper-search_position');
                wrapperTypesOfCuisines.classList.remove('wrapper-typesOfCuisines_position');
                wrapperWelcome.classList.remove('wrapper-welcome_position');
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

        if (!localStorage.getItem('arrayTypesOfCuisines') && localStorage.getItem('typesOfCuisines')) {
            arrayCuisines.push(localStorage.getItem('typesOfCuisines'));
        }

        if (localStorage.getItem('arrayTypesOfCuisines') && localStorage.getItem('typesOfCuisines')) {
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

export default Home;