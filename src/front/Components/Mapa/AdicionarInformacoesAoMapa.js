function add_id_do_caminho(mapa, caminho) {
    caminho.forEach((passo, index) => {
        const obj_do_mapa = mapa[passo.i][passo.j];

        if (!obj_do_mapa.de_inicio) {
            obj_do_mapa.passou_por_aqui = true;
            obj_do_mapa.caminho_id = index + 1;
        }
        
    });
}


function adicionar_informacoes_ao_mapa(mapa, caminho) {
    add_id_do_caminho(mapa, caminho);    
}

export default adicionar_informacoes_ao_mapa;