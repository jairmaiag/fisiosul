window.onload = function () {
    criarMenu();
    exibeConteudo('home');
    ajustarLinkHome();
}
const ajustarLinkHome = function () {
    const host = window.location.hostname;
    if(host == 'jairmaiag.github.io'){
        const link = 'https://jairmaiag.github.io/fisiosul/';
        const logoMenu = $('#linklogomenu');
        logoMenu.attr('href',link);
        const logoBanner = $('#linkbanner');
        logoBanner.attr('href',link);
    }
}
const criarParagrafoCard = function (texto) {
    const paragrafo = $(document.createElement('p'));
    paragrafo.addClass("card-text");
    paragrafo.html(texto);
    return paragrafo;
};

const exibeConteudo = function (link) {
    const pagina = $.get(`paginas/${link}/index.html`);
    pagina.done(data => {
        let pirncipal = $('main');
        pirncipal.html(data);
    });
};
const clickLink = function (event) {
    const idClicado = event.target.id;
    const pagina = $(event.target).attr('href');
    const lista = $('.nav-item');
    event.preventDefault();
    for (let i = 0; i < lista.length; i++) {
        let item = $(lista[i]);
        let id = item.children().attr('id');
        item.removeClass('active');
        if (idClicado == id) {
            item.addClass('active');
        }
    }
    if (pagina != '#') {
        exibeConteudo(pagina);
    }
    const botaoHamburger = $('#hamburger');
    if (!botaoHamburger.hasClass('collapsed')) {
        botaoHamburger.addClass('collapsed');

    }
    const divMenuPrincipal = $('#menuprincipal');
    if (divMenuPrincipal.hasClass('show')) {
        divMenuPrincipal.removeClass('show');
    }
};
const criarMenu = function () {
    const jsonMenu = getMenu();
    jsonMenu.done(data => {
        const nav = $('nav');
        const divMenu = $(document.createElement('div')).attr('id', 'menuprincipal');
        const rodape = $('#containerRodape');
        const divLinksRodape = $(document.createElement('div')).attr('id', 'linksRodape');
        const ulRodape = $(document.createElement('ul'));
        const pRodape = $(document.createElement('p'));
        const copyRightRodape = $(document.createElement('em')).attr('aria-hidden', 'true');
        copyRightRodape.addClass('fa');
        copyRightRodape.addClass('fa-copyright');
        copyRightRodape.html(' 2022 | Jair M. Diniz');

        ulRodape.addClass('list-unstyled');
        pRodape.addClass('container');
        pRodape.addClass('text-center');
        pRodape.html('Copyrigth ');
        copyRightRodape.appendTo(pRodape);

        divLinksRodape.appendTo(rodape);
        pRodape.appendTo(rodape);

        divMenu.addClass('collapse');
        divMenu.addClass('navbar-collapse');
        divMenu.appendTo(nav);

        const ulMneu = $(document.createElement('ul'));
        ulMneu.attr('id', 'listaMenu');
        ulMneu.addClass('navbar-nav');
        ulMneu.addClass('mr-auto');

        ulMneu.appendTo(divMenu);
        data.itensMenu.forEach((item, index) => {
            const menu = $(document.createElement('li'));
            const link = $(document.createElement('a'));

            const liRodape = $(document.createElement('li'));
            const linkRodape = $(document.createElement('a'));
            linkRodape.click(clickLink);

            link.addClass('nav-link');
            link.addClass('corFontMenu');
            link.click(clickLink);

            menu.addClass('nav-item');
            if (index === 0) {
                menu.addClass('active');
            }
            link.attr('href', item.link);
            link.html(`${item.label}`);
            link.attr('id', `${item.id}_${item.label}`);

            link.appendTo(menu);
            menu.appendTo(ulMneu);
            
            linkRodape.attr('href', item.link);
            linkRodape.html(`${item.label}`);

            linkRodape.appendTo(liRodape);
            liRodape.appendTo(ulRodape);
        });
        ulRodape.appendTo(divLinksRodape);
    });
};
const getMenu = function(){
    const jsonMenu = $.getJSON('assets/json/menu.json');
    return jsonMenu;
}