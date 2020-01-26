new Vue({
    el: '#app',

    data: {
        currOption: 0,
        options:[
            'Início',
            'OpinionZoom',
            'Ferramentas',
            'API'
            ],
        currSubOp: -1,
        subOpActive: true,
        subOptions: [
            {
                ops:[],
                id: 0
            },

            {
                ops: [
                    'Como usar?'
                ],
                id: 1
            },

            {
                ops:[
                    'Normalizador',
                    'Filtro de qualidade',
                    'Filtro de subjetividade',
                    'Extrator e classificador de aspectos',
                    'Sumarizador de revisões'
                ],
                id: 2
            },

            {
                ops:[
                    'Documentação',
                    'Dependências',
                    'Download'
                ],
                id: 3
            }
        ],
        mainPageSelected: 0,    //variavel para controlar opcoes selecionadas(flexivel)
    }
    ,

    methods: {
        changeCurrOp(index){
            this.currOption = index
            this.currSubOp = -1
            this.subOpActive = true;

            //verificar antes se a opcao clicada esta ativa(se estiver, desativar)
            if(document.getElementsByClassName('option-box')[index].className === 'option-box active'){
                document.getElementsByClassName('option-box')[index].className = 'option-box'
                this.subOpActive = false;
                return
            }

            //controla className para fazer highlight na opcao selecionada
            var prevElem = document.getElementsByClassName('option-box active')
            if(prevElem.length != 0)
                prevElem[0].className = 'option-box'
            document.getElementsByClassName('option-box')[index].className += ' active'
        },

        changeCurrSubOp(subOpIndex){
            this.currSubOp = subOpIndex

            this.mainPageSelected = 0;  //reseta variavel de controle de opcoes
            //controla className para fazer highlight na subopcao selecionada
            var prevElem = document.getElementsByClassName('suboption active')
            if(prevElem.length != 0)
                prevElem[0].className = 'suboption'
            document.getElementsByClassName('suboption')[subOpIndex].className += ' active'

        },

        setSelectionOp(val){
            this.mainPageSelected = val;
            var prevOp = document.getElementsByClassName('input-option active')
            if(prevOp.length != 0)
                prevOp[0].className = 'input-option'
            document.getElementsByClassName('input-option')[val].className += ' active'
        }
    }

})
