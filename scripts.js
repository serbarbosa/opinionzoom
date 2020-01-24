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
        ]
    },

    methods: {
        changeCurrOp(index){
            this.currOption = index
            this.currSubOp = -1
            //controla className para fazer highlight na opcao selecionada
            var prevElem = document.getElementsByClassName('option-box active')
            if(prevElem.length != 0)
                prevElem[0].className = 'option-box'
            document.getElementsByClassName('option-box')[index].className += ' active'
        },

        changeCurrSubOp(subOpIndex){
            this.currSubOp = subOpIndex

            //controla className para fazer highlight na subopcao selecionada
            var prevElem = document.getElementsByClassName('suboption active')
            if(prevElem.length != 0)
                prevElem[0].className = 'suboption'
            document.getElementsByClassName('suboption')[subOpIndex].className += ' active'
        },

    }

})
