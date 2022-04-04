const criarParagrafoCard = function (texto) {
    const paragrafo = $(document.createElement('p'));
    paragrafo.addClass("card-text");
    paragrafo.html(texto);
    return paragrafo;
};

const exibeConteudo = function(link){
    const pagina = $.get(`paginas/${link}/index.html`);
    pagina.done(data =>{
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
    if(pagina != '#'){
        exibeConteudo(pagina);
    }
    const botaoHamburger = $('#hamburger');
    if(!botaoHamburger.hasClass('collapsed')){
        botaoHamburger.addClass('collapsed');

    }
    const divMenuPrincipal = $('#menuprincipal');
    if(divMenuPrincipal.hasClass('show')){
        divMenuPrincipal.removeClass('show');
    }
};
const criarMenu = function(){
    const jsonMenu = $.getJSON('assets/json/menu.json');
    jsonMenu.done(data => {
        const nav = $('nav');
        const divMenu = $(document.createElement('div')).attr('id', 'menuprincipal');
        divMenu.addClass('collapse');
        divMenu.addClass('navbar-collapse');
        divMenu.appendTo(nav);
        
        const ulMneu = $(document.createElement('ul'));
        ulMneu.attr('id', 'listaMenu');
        ulMneu.addClass('navbar-nav');
        ulMneu.addClass('mr-auto');

        ulMneu.appendTo(divMenu);
        data.itensMenu.forEach((item, index) => {
            const submenu = item.submenu;
            const comSubMenu = submenu && item.submenu.length;
            const menu = $(document.createElement('li'));
            const link = $(document.createElement('a'));
            
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
            // if (comSubMenu) {
            //     link.className += ' dropdown-toggle';
            //     link.attr('role', "button");
            //     link.attr('data-toggle', "dropdown");
            //     link.attr('aria-haspopup', true);
            //     link.attr('aria-expanded', false);
    
            //     menu.className += ' dropdown';
            //     const divSubMenu = $('div');
            //     divSubMenu.className = 'dropdown-menu corFundoMenu';
            //     divSubMenu.attr('aria-labelledby', link.id);
            //     submenu.forEach(submenuItem => {
            //         const sublink = $('a');
            //         sublink.className = 'dropdown-item';
            //         sublink.attr('href',submenuItem.link);
            //         sublink.textContent = `${submenuItem.label}`;
            //         divSubMenu.appendTo(sublink);
            //     });
            //     menu.appendChild(divSubMenu);
            // }
            menu.appendTo(ulMneu);
            // menuPrincipal.add(menu);
            // console.log(menuPrincipal);
        });
    });
};
criarMenu();
// exibeConteudo('clinicas.html');
exibeConteudo('home');