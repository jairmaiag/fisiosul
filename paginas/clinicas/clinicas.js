window.jsonClinicas = $.getJSON('/assets/json/clinicas.json');
window.jsonClinicas.done(data => {
    const lista = $('#listaUnidades');
    const divCardDeck = $(document.createElement('div'));
    divCardDeck.addClass("card-deck");

    data.clinicas.forEach(clinica => {
        const divCard = $(document.createElement('div'));
        divCard.addClass("card");
        divCard.addClass("mb-3");
        divCard.addClass("shadow");
        divCard.addClass("rounded");

        divCard.appendTo(divCardDeck);
        const divCardHead = $(document.createElement('div'));
        divCardHead.addClass("card-header");
        divCardHead.html(clinica.nome);
        divCardHead.appendTo(divCard);

        const divCardBody = $(document.createElement('div'));
        divCardBody.addClass("card-body");

        const endereco = clinica.endereco;
        const endCompleto = `${endereco.logradouro} ${endereco.nome}, ${endereco.numero} - ${endereco.bairro} - ${endereco.cidade}, ${endereco.uf} - CEP: ${endereco.cep}`;
        const pEndereco = criarParagrafoCard(endCompleto);
        pEndereco.appendTo(divCardBody);

        const pHorario = $(document.createElement('p'));
        const celular = window.navigator.userAgent.toLocaleLowerCase().match(/android/g) == "android";
        if (clinica.telefones.length > 0) {
            clinica.telefones.forEach(fone => {
                const pFones = $(document.createElement('p'));
                let linkWahtssIni = "";
                if (fone.tipo == 'movel') {
                    if (celular) {
                        linkWahtssIni = `<a href="http://api.whatsapp.com/send?1=pt_BR&amp;phone=55${fone.ddd}${fone.numero}&text=Olá!%20Estou%20em%20seu%20site%2C%20pode%20me%20ajudar%3F" target="_blank" rel="noopener noreferrer">`;
                    }else {
                        linkWahtssIni = `<a href="https://web.whatsapp.com/send?phone=55${fone.ddd}${fone.numero}&text=Olá!%20Estou%20em%20seu%20site%2C%20pode%20me%20ajudar%3F" target="_blank" rel="noopener noreferrer">`;
                    }
                } 
                const icone = fone.tipo == "fixo" ? 'fonefixo.png' : 'fonemovel.png';
                let texto = `${linkWahtssIni}<img src="/assets/images/${icone}" class="fone" alt="icone"> (${fone.ddd}) ${fone.numero}${celular ? "</a>" : fone.tipo == 'movel' ? '</a>': ''} `;
                pFones.html(texto);
                pFones.appendTo(divCardBody);
            });
        }

        const aVisitar = $(document.createElement('a'));
        aVisitar.attr('href', endereco.mapa);
        aVisitar.attr('target', 'blank');
        aVisitar.addClass('btn');
        aVisitar.addClass('btn-primary');
        aVisitar.html('Mapa');
        aVisitar.appendTo(divCardBody);

        divCardBody.appendTo(divCard);
    });
    divCardDeck.appendTo(lista);
});
delete window.jsonClinicas;