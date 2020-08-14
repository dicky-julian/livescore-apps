import fetchData from '../../utils/api';

const navbar = () => {
    document.addEventListener('DOMContentLoaded', (() => {
        let page = window.location.hash.substr(1);
        if (!page) page = 'match';

        loadPage(page);
        loadNav();
    }))

    const loadPage = (page) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                const wrapper = document.querySelector("#main");
                fetchData(page);
                if (this.status == 200) {
                    wrapper.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    wrapper.innerHTML = '<p>Halaman tidak ditemukan.</p>';
                } else {
                    wrapper.innerHTML = `<div class='empty__field'><div class='bt bt__primary'>Need Internet to get newest data.</div></div>`;
                }
            }
        }

        xhttp.open('GET', `${page}.html`, true);
        xhttp.send();
    }

    const loadNav = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status === 200) {
                    document.querySelector('.nav__link').innerHTML = xhttp.responseText;

                    document.querySelectorAll('.nav__link a').forEach((el) => {
                        el.addEventListener('click', ((e) => {
                            const historyPage = window.location.hash.substr(1);
                            const page = e.target.getAttribute('href').substr(1);
                            
                            if (page !== historyPage) {
                                document.querySelector('.active').classList.remove('active');
                                e.target.classList.add('active');
                                loadPage(page);
                            }
                        }));
                    });
                }
            }
        }
        xhttp.open('GET', 'navbar.html', true);
        xhttp.send();
    }
}

export default navbar;