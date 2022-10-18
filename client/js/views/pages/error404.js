import Component from '../component.js';

class Error404 extends Component{
    async render() {
        return `                
            <div class="error-404">
                <p class="not_found" data-text="404">404</p>
                <small class="clr-grey">Извините, данная страница не найдена ...</small>
                <a href="#/app" class="btn-underline">На домашнюю старницу ...</a>
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
    }
}

export default Error404;