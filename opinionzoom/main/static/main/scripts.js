Vue.component('text-input-component', {
    template: '#text-input-template',
    props: ['mainPageSelected'],
    methods: {
        setSelectionOp: function(val){
            this.$emit("input", val)

            var prevOp = document.getElementsByClassName('input-option active')
            if(prevOp.length != 0)
                prevOp[0].className = 'input-option'
            document.getElementsByClassName('input-option')[val].className += ' active'
        }
    }
})

new Vue({
    el: '#app',
    delimiters: ["[[", "]]"],
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
        searchField : '',
        waitingResponse : false,
    },

    methods: {
        changeCurrOp: function(index){
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

        changeCurrSubOp: function(subOpIndex){
            this.currSubOp = subOpIndex

            //controla className para fazer highlight na subopcao selecionada
            var prevElem = document.getElementsByClassName('suboption active')
            if(prevElem.length != 0)
                prevElem[0].className = 'suboption'
            document.getElementsByClassName('suboption')[subOpIndex].className += ' active'

            //resetando opcoes de input das ferramentas
            this.mainPageSelected = 0;
            var prevOp = document.getElementsByClassName('input-option active')
            if(prevOp.length != 0)
                prevOp[0].className = 'input-option'
            var currOp = document.getElementsByClassName('input-option')
            if(currOp.length != 0)
                currOp[0].className += ' active'
        },

        searchQuery: function(){
            if (!this.waitingResponse){
                this.waitingResponse = true;
                this.$http.get('main/search', {params: {'searchField' : this.searchField}}).then(
                    function(response){
                        console.log(response)
                        this.waitingResponse = false;
                    },
                    function(response){//error
                        console.log("error")
                    }
                );
            }
        },
    },

})
