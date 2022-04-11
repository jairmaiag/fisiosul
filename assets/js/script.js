window.onload = function () {
    criarMenu();
    exibeConteudo('home');
    ajustarLinkHome();
}
const montarListaCards = function(dados,destino){
    let divRow = $(document.createElement('div'));
    divRow.addClass('row');
    dados.forEach((data, i) => {
        if (i % 3 == 0) {
            divRow = $(document.createElement('div'));
            divRow.addClass('row');
        }
        let divCol = $(document.createElement('div'));
        divCol.addClass('col-sm-4');
        divCol.appendTo(divRow);
        montarCard(data).appendTo(divCol);
        divRow.appendTo(destino);
    });
}
const montarImageCard = function (imagem) {
    const imageCard = $(document.createElement('img'));
    imageCard.addClass('card-img-top');
    imageCard.addClass('mt-3');
    imageCard.attr('width', imagem.largura);
    imageCard.attr('height', imagem.altura);
    imageCard.attr('src', imagem.arquivo);
    imageCard.attr('alt', imagem.alt);
    return imageCard;
}
const montarParagrafoCard = function (texto) {
    const textoCard = $(document.createElement('p'));
    textoCard.addClass('card-text');
    textoCard.html(texto);
    return textoCard;
}
const montarCard = function (dados) {
    const divCard = $(document.createElement('div'));
    divCard.addClass('card');
    divCard.addClass('shadow');
    divCard.addClass('rounded');
    divCard.addClass('mb-3');
    divCard.addClass('ml-3');

    const divCardHead = $(document.createElement('div'));
    divCardHead.addClass("card-header");
    divCardHead.addClass("text-primary");
    divCardHead.html(dados.titulo);
    divCardHead.appendTo(divCard);
    montarImageCard(dados.imagem).appendTo(divCard);

    const divCardBody = $(document.createElement('div'));
    divCardBody.addClass("card-body");

    montarParagrafoCard(dados.textoprincipal).appendTo(divCardBody);
    dados.outrosTextos.forEach(texto =>{
        montarParagrafoCard(texto).appendTo(divCardBody);
    });
    divCardBody.appendTo(divCard);
    return divCard;
};
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
        const pirncipal = $('main');
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
        copyRightRodape.html('');

        ulRodape.addClass('list-unstyled');
        pRodape.addClass('container');
        pRodape.addClass('text-center');
        pRodape.html('Copyrigth ');
        copyRightRodape.appendTo(pRodape);

        const contato = $(document.createElement('span'));
        contato.html(` 2022 | <a href="mailto:jairmaiag@gmail.com" target="blanck" id="contatoDesenvolvedor">Jair M. Diniz</a>`);

        divLinksRodape.appendTo(rodape);
        contato.appendTo(pRodape);
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
const montarCarrossel = function (idDivCarrossel,arquivoJson) {
    if (idDivCarrossel === undefined) {
        return;
    }
    if(arquivoJson === undefined){
        return;
    }
    const carro = $(`#${idDivCarrossel}`);
    const jsonCarro = $.getJSON(`assets/json/${arquivoJson}`);
    jsonCarro.done(data => {
        const divInner = $(document.createElement('div'));
        divInner.addClass('carousel-inner');

        const olIndicador = $(document.createElement('ol'));
        olIndicador.addClass('carousel-indicators');
        data.imagens.forEach((image, index) => {
            const liIndicador = $(document.createElement('li'));
            liIndicador.attr('data-target', `#${idDivCarrossel}`);
            liIndicador.attr('data-slide-to', index);
            const divCarroItem = $(document.createElement('div'));
            divCarroItem.addClass('carousel-item')
            if (index === 0) {
                liIndicador.addClass('active');
                divCarroItem.addClass('active');
            }
            const imgImagem = $(document.createElement('img'));
            imgImagem.addClass('d-block');
            imgImagem.addClass('w-100');
            imgImagem.appendTo(divCarroItem);
            imgImagem.attr('src', `${image.local}/${image.nome}`);
            imgImagem.attr('alt',`${image.textoAlternativo}`);
            imgImagem.attr('width', `${image.largura}`);
            imgImagem.attr('height', `${image.largura}`);

            liIndicador.appendTo(olIndicador);
            divCarroItem.appendTo(divInner);

            const divLegendaItem = $(document.createElement('div'));
            divLegendaItem.addClass('carousel-caption');
            divLegendaItem.addClass('d-none');
            divLegendaItem.addClass('d-md-block');
            divLegendaItem.appendTo(divCarroItem);

            const h5TituloLegenda = $(document.createElement('h5'));
            h5TituloLegenda.html(`${image.tituloSlide}`);
            h5TituloLegenda.appendTo(divLegendaItem);
            
            const pTextoLegenda = $(document.createElement('p'));
            pTextoLegenda.html(`${image.descricaoSlide}`);
            pTextoLegenda.appendTo(divLegendaItem);
        });
        olIndicador.appendTo(carro);
        divInner.appendTo(carro);
        const aAnterior = $(document.createElement('a'));
        aAnterior.addClass('carousel-control-prev');
        aAnterior.attr('href', `#${idDivCarrossel}`);
        aAnterior.attr('role', `button`);
        aAnterior.attr('data-slide', `prev`);

        const spAnteriorIcon = $(document.createElement('span'));
        spAnteriorIcon.addClass('carousel-control-prev-icon')
        spAnteriorIcon.attr(`aria-hidden`,'true');
        spAnteriorIcon.appendTo(aAnterior);
        
        const spAnteriorSr = $(document.createElement('span'));
        spAnteriorSr.addClass('sr-only');
        spAnteriorSr.html('Anterior')
        spAnteriorSr.appendTo(aAnterior);

        aAnterior.appendTo(carro);

        const aProximo = $(document.createElement('a'));
        aProximo.addClass('carousel-control-next');
        aProximo.attr('href', `#${idDivCarrossel}`);
        aProximo.attr('role', `button`);
        aProximo.attr('data-slide', `next`);

        const spProximoIcon = $(document.createElement('span'));
        spProximoIcon.addClass('carousel-control-next-icon')
        spProximoIcon.attr(`aria-hidden`,'true');
        spProximoIcon.appendTo(aProximo);
        
        const spProximoSr = $(document.createElement('span'));
        spProximoSr.addClass('sr-only');
        spProximoSr.html('Próximo')
        spProximoSr.appendTo(aProximo);
        
        aProximo.appendTo(carro);
    });
}