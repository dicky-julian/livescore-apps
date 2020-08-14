const showAlert = (msg, type) => {
    const mainEl = document.querySelector('.error__container');
    mainEl.innerHTML += `<div class='alert__show ${type}'>
    <div>${msg}</div>
    <div class='close'>x</div>
    </div>`
    
    const close = mainEl.querySelectorAll('.alert__show .close');
    close.forEach(el => {
        el.addEventListener('click', () => el.parentElement.remove());
    })
}

export default {
    showAlert
}