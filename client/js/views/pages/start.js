import Component from '../component.js';

class Start extends Component {
    constructor() {
        super();
        this.typesOfCuisines = '';
        this.login = '';
        this.email = '';
        this.loginForAuth = '';
        this.emailForAuth = '';
        this.isAuthorization = '#';
        self = this;
    }

    static async getInfoForAuthorization() {
		const response = await fetch('http://localhost:3000/api/app');

		return await response.json();
    }

    async getData() {
		return await Start.getInfoForAuthorization();
	}

    async render(data) {
        this.isAuthorization = '#';
        this.loginForAuth = data[0].login;
        this.emailForAuth = data[0].mail;

        return `
            <div class="wrapper">
                <div class="start__bg"></div>
                <div class="start__logo">
                    <a class="start__logo-link" href="#">
                        <img class="start__logo-img" src="images/logos/app_logo.svg" alt="logo">
                    </a>
                </div>
                <div class="slogan">
                    <ul class="slogan__items">
                        <li class="slogan__link">Г</li>
                        <li class="slogan__link">о</li>
                        <li class="slogan__link">т</li>
                        <li class="slogan__link">о</li>
                        <li class="slogan__link">в</li>
                        <li class="slogan__link">и</li>
                        <li class="slogan__link">т</li>
                        <li class="slogan__link">ь</li>
                        <li class="slogan__link">&nbsp</li>
                        <li class="slogan__link">м</li>
                        <li class="slogan__link">о</li>
                        <li class="slogan__link">ж</li>
                        <li class="slogan__link">е</li>
                        <li class="slogan__link">т</li>
                        <li class="slogan__link">&nbsp</li>
                        <li class="slogan__link">к</li>
                        <li class="slogan__link">а</li>
                        <li class="slogan__link">ж</li>
                        <li class="slogan__link">д</li>
                        <li class="slogan__link">ы</li>
                        <li class="slogan__link">й</li>
                        <li class="slogan__link">!</li>
                    </ul>
                </div>
                <div class="select-block wrapper__select-block">
                    <div class="select-block__items">
                        <div class="select-block__item">Выбрать кухню</div>
                        <div class="select-block__item">Авторизация</div>
                    </div>
                    <div class="select-block__recipes-items select-block__content" style="">
                        <i class="fa-solid fa-angles-left btn-prev"></i>
                        <i class="fa-solid fa-angles-right btn-next"></i>
                        <div class="select-block__recipes-content">
                            <div class="select-block__recipes-item">
                                <div class="select-block__recipes-img_belarus"></div>
                            </div>
                            <div class="select-block__recipes-item">
                                <div class="select-block__recipes-img_russia"></div>
                            </div>
                            <div class="select-block__recipes-item">
                                <div class="select-block__recipes-img_ukraine"></div>
                            </div>
                            <div class="select-block__recipes-item">
                                <div class="select-block__recipes-img_lithuania"></div>
                            </div>
                            <div class="select-block__recipes-item">
                                <div class="select-block__recipes-img_poland"></div>
                            </div>
                            <div class="select-block__recipes-item">
                                <div class="select-block__recipes-img_vegan"></div>
                            </div>
                        </div>
                    </div>
                    <div class="select-block__login-items select-block__content">
                        <div class="select-block__login-items_posittion form">
                            <input class="form__login" required placeholder="Ваше имя" type="text">
                            <input class="form__email" required placeholder="Ваш email" type="email">
                        </div>
                    </div>
                </div>
                <a class="btn btn_ripple-effect wrapper__btn-ripple-effect" href="#"><span>Войти в приложение</span></a> 
                <span class="flight-elems"></span>
            </div>
        `;
    }

    afterRender() {
        this.setActions();

        this.setArrayTypesOfCuisinesInLS();

        this.setFavotitedInLS();
    }

    setActions() {
        let tabs = document.querySelectorAll('.select-block__item'),
            tabsParent = document.querySelector('.select-block__items'),
            tabsContent = document.querySelectorAll('.select-block__content');

        this.hideTabContent(tabs, tabsContent);
        this.showTabContent(tabs, tabsContent);

        tabsParent.addEventListener('click', event => {
            event.stopPropagation();
        
        	const target = event.target;

        	if (target && target.classList.contains('select-block__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        self.hideTabContent(tabs, tabsContent);
                        self.showTabContent(tabs, tabsContent, i);
                    }
                });
        	}
        });

        const nextElementSlider = document.querySelector('.btn-next'),
              prevElementSlider = document.querySelector('.btn-prev'),
              parentElements = document.querySelector('.select-block__recipes-content'),
              blockRecipesItems = document.querySelector('.select-block__recipes-items'),
              arrayTypesOfCuisines = ['BLR', 'RUS', 'UKR', 'LTV', 'POL', 'VEG'];

        let currentImgSlider = 0,
            indexTranslate = 300;

        nextElementSlider.addEventListener('click', event => {
            event.stopPropagation();
        
            if (currentImgSlider < 5) {
                currentImgSlider++;
            } else {
                currentImgSlider = 0;
            }

            this.updateImgSlider(parentElements, currentImgSlider, indexTranslate);
            this.setCurrentTypeOfCuisine(arrayTypesOfCuisines, currentImgSlider);
            this.updateArrayTypesOfCuisinesInLS();

        })

        prevElementSlider.addEventListener('click', event => {
            event.stopPropagation();
        
            if (currentImgSlider > 0) {
                currentImgSlider--;
            } else {
                currentImgSlider = 5;
            }

            this.updateImgSlider(parentElements, currentImgSlider, indexTranslate);
            this.setCurrentTypeOfCuisine(arrayTypesOfCuisines, currentImgSlider);
            this.updateArrayTypesOfCuisinesInLS();
        })

        blockRecipesItems.addEventListener('click', event => {
            event.stopPropagation();
        })
        
        const flightElemsArray = [
            'images/images/start_page/flight_effect/flight_cakes_.png',
            'images/images/start_page/flight_effect/flight_chinees.png',
            'images/images/start_page/flight_effect/flight_hamburger.png',
            'images/images/start_page/flight_effect/flight_pizza.png',
            'images/images/start_page/flight_effect/flight_potatoes.png',
            'images/images/start_page/flight_effect/flight_steak.png',
            'images/images/start_page/flight_effect/flight_toast.png',
            'images/images/start_page/flight_effect/flight_watermelon.png',
        ];
        
        const flightSpace = document.querySelector('.wrapper');
        
        flightSpace.addEventListener('click', event => {
            const xPOs = event.offsetX;
            const yPOs = event.offsetY;
            const spanElem = document.createElement('span');
        
            spanElem.style.left = `${xPOs}px`;
            spanElem.style.top = `${yPOs}px`;
            spanElem.style.backgroundImage = this.getFlightElemsPath(flightElemsArray);
            spanElem.classList.add('flight-elems');
        
            const size = Math.random()*200;
        
            spanElem.style.width = `${size}px`;
            spanElem.style.height = `${size}px`;
        
            flightSpace.appendChild(spanElem);
        
            setTimeout(() => {
                spanElem.remove();
            }, 2500)
        })

        const btnRippleEffect = document.querySelector('.btn_ripple-effect');

        btnRippleEffect.addEventListener('mouseover', event => {
            event.stopPropagation();

            const x = event.pageX - btnRippleEffect.offsetLeft;
            const y = event.pageY - btnRippleEffect.offsetTop;

            btnRippleEffect.style.setProperty('--xPos', `${x}px`);
            btnRippleEffect.style.setProperty('--yPos', `${y}px`);

        })

        btnRippleEffect.addEventListener('click', event => {
            event.stopPropagation();
        })

        const form = document.querySelector('.form'),
              login = document.querySelector('.form__login'),
              email = document.querySelector('.form__email');

        form.addEventListener('click', event => {
            event.stopPropagation();
        })

        login.addEventListener('change', event => {
            event.stopPropagation();

            this.setUserLogin(login.value);
        })

        email.addEventListener('change', event => {
            event.stopPropagation();
            
            this.setUserEmail(email.value);
        })

        btnRippleEffect.addEventListener('click', () => {
            
            if (this.loginForAuth == this.login && this.emailForAuth == this.email) {
                this.isAuthorization = '/app';

                btnRippleEffect.href += this.isAuthorization;
            }
        })
    }

    getFlightElemsPath(array) {
        const randomNumberItemArray = Math.floor(Math.random() * array.length);
    
        return `url('${array[randomNumberItemArray]}')`;
    }

    setCurrentTypeOfCuisine(array, index) {
        this.typesOfCuisines = array[index];

        localStorage.setItem('typesOfCuisines', this.typesOfCuisines);
    }

    setUserLogin(login) {
        this.login = login;

        localStorage.setItem('login', this.login);
    }

    setUserEmail(email) {
        this.email = email;

        localStorage.setItem('email', this.email);
    }

    hideTabContent(items, content) {
    
        content.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });

        items.forEach(item => {
        item.classList.remove('select-block__content_active');
        });
    }

    showTabContent(items, content, i = 0) {
        content[i].classList.add('show', 'fade');
        content[i].classList.remove('hide');
        items[i].classList.add('select-block__content_active');
    }

    updateImgSlider(parent, img, index) {
        parent.style.transform = `translateX(${-img * index}px)`;
    }

    setArrayTypesOfCuisinesInLS() {
        if (!localStorage.getItem('typesOfCuisines')) {
            localStorage.setItem('typesOfCuisines', 'BLR');

            const cuisine = localStorage.getItem('typesOfCuisines');

            localStorage.setItem('arrayTypesOfCuisines', JSON.stringify([cuisine]));
        }
    }

    updateArrayTypesOfCuisinesInLS() {
        if (localStorage.getItem('typesOfCuisines')) {
            const cuisine = localStorage.getItem('typesOfCuisines');

            localStorage.setItem('arrayTypesOfCuisines', JSON.stringify([cuisine]));
        }
    }

    setFavotitedInLS() {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
}

export default Start;