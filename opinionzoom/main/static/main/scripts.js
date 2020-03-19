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
    delimiters: ["#%", "%#"],
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
                    'Como funciona?'
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
        responseStage : 0,
        textResponse: [],       //lista contendo respostas de alguma query. Organizada como conveniente
    },

    methods: {
        changeCurrOp: function(index){
            this.currOption = index
            this.currSubOp = -1
            this.subOpActive = true;
            this.responseStage = 0;
        },

        changeCurrSubOp: function(subOpIndex){
            this.currSubOp = subOpIndex
        },

        searchQuery: function(){
            if (!this.waitingResponse){
                this.responseStage = 1;
                this.$http.get('main/search', {params: {'searchField' : this.searchField}}).then(
                    function(response){
                        //segregar dados aqui
                        this.textResponse = []
                        this.textResponse.push(response['bodyText'].split("\n"))
                        this.responseStage = 2;
                        console.log(this.textResponse[0][3])
                        this.$nextTick(() =>{   //aguarda a pagina terminar de carregar para modificar dom
                            chartBars = document.createElement("svg")
                            chartGauge = document.createElement("svg")
                            chartPie = document.createElement("svg")

                            chartBars.setAttribute("xmlns","http://www.w3.org/2000/svg")
                            chartGauge.setAttribute("xmlns","http://www.w3.org/2000/svg")
                            chartPie.setAttribute("xmlns","http://www.w3.org/2000/svg")

                            chartBars.innerHTML = this.textResponse[0][3]
                            document.getElementById("chart-bars").appendChild(chartBars)

                            chartGauge.innerHTML = this.textResponse[0][4]
                            document.getElementById("chart-gauge").appendChild(chartGauge)

                            chartPie.innerHTML = this.textResponse[0][5]
                            document.getElementById("chart-pie").appendChild(chartPie)
                        })



                    },
                    function(response){//error
                        console.log("error")
                    }
                );
            }
        },

        addPlots: function(){
            img = new Image();
            img.src = this.textResponse[0][3];
            document.getElementById("plot-area").appendChild(img);
        },
        
        updateMenuOptions: function(index, subIndex){
            this.changeCurrOp(index);
            this.changeCurrSubOp(subIndex);
        }
    },

})

// Codigo para funcionar menu burger em mobile
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });