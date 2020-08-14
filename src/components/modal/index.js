import element from '../../utils/config/element';

const showModal = (el) => {
    element.checkElement(`#${el} .modal__container`).then(wrapper => {
        const closeToogle = document.querySelector('.modal__container span');
        const isHide = wrapper.classList.contains('hide');
        closeToogle.addEventListener('click', () => closeModal());
        if (isHide) {
            wrapper.classList.remove("hide");
            wrapper.style.display = "flex";
        }
        wrapper.classList.add("show");
    })
}

const fillModal = (el) => {
    element.checkElement(`#${el} .modal-content`).then(wrapper => {
        wrapper.innerHTML = `
        <table class="highlight">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Goals</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `
    })
}

const closeModal = () => {
    const modal = document.querySelector('.modal__container');
    const modalContent = document.querySelector('.modal-content');
    modal.classList.remove("show");
    modal.classList.add("hide");
    modalContent.innerHTML = `
        <div class="loading">
            <div class="bg__loading bg__setup"></div>
            <h6>loading ...</h6>
        </div>
    `
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

export default {
    showModal,
    fillModal
}