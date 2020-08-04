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
            'OpinionSpot',
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
                    'Use Agora'
                ],
                id: 1
            },

            {
                ops:[
                    'Normalizador Enelvo',
                    'Filtro de qualidade(MLP)',
                    'Filtro de subjetividade',
                    'Extrator e classificador de aspectos',
                    'Sumarizador Opizer'
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
        responseStage : 0,
        textResponse: [],       //lista contendo respostas de alguma query. Organizada como conveniente
        chartData: [],
        summaryData: '',

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
                        console.log(response)
                        //segregar dados aqui
                        this.textResponse = response['bodyText'].split("\n")
                        this.summaryData = this.textResponse.slice(4).join("\n")
                        this.waitingResponse = false;
                        this.responseStage = 2;
                        this.$nextTick(() =>{   //aguarda a pagina terminar de carregar para modificar dom
                            //convertendo dados para formato JSON
                            this.chartData = JSON.parse(this.textResponse[3])
                            var ctx = document.getElementById("aspects-chart");

                            data = this.plotBarChart()//atualmente dados de plotagem ficando na posicao 2, checar log caso altere
                            //console.log(data)
                            options = {
                                legend: {display: false},
                                title: {
                                    display: false,
                                    text: "Classificação dos aspectos"
                                }

                            };

                            var chartGraph = new Chart(ctx, {type: 'bar', data, options})
                        })
                    },
                    function(response){//error
                        console.log("error")
                    }
                );
            }

        },

        runEnelvo: function(){
            if (!this.waitingResponse){
                //recuperando texto da textarea
                var textarea = document.getElementById("enelvo-input").getElementsByClassName("textarea")[0]
                var text = textarea.value

                //desabilitando textarea e button
                document.getElementById("enelvo-input").getElementsByClassName("textarea")[0].disabled = true
                document.getElementById("normalize-btn").disabled = true
                this.waitingResponse = true
                this.responseStage = 1

                this.$http.get('main/enelvo', {params: {'text' : text}}).then(
                    function(response){
                        //reabilitando elementos para nova consulta
                        document.getElementById("enelvo-input").getElementsByClassName("textarea")[0].disabled = false
                        document.getElementById("normalize-btn").disabled = false
                        this.responseStage = 2
                        this.waitingResponse = false
                        //console.log(response)
                        this.$nextTick(()=> {
                            document.getElementById("enelvo-result").getElementsByClassName("textarea")[0].value = response['bodyText']
                        })

                    }
                );
            }
        },

        runQltFilter: function(){
            if (!this.waitingResponse){
                //recuperando texto da textarea
                var textarea = document.getElementById("qlt-filter-input").getElementsByClassName("textarea")[0]
                var text = textarea.value

                //desabilitando textarea e button
                document.getElementById("qlt-filter-input").getElementsByClassName("textarea")[0].disabled = true
                document.getElementById("qlt-filter-btn").disabled = true
                this.waitingResponse = true
                this.responseStage = 1

                this.$http.get('main/qltFilter', {params: {'text' : text}}).then(
                    function(response){
                        //reabilitando elementos para nova consulta
                        document.getElementById("qlt-filter-input").getElementsByClassName("textarea")[0].disabled = false
                        document.getElementById("qlt-filter-btn").disabled = false
                        this.responseStage = 2
                        this.waitingResponse = false
                        //console.log(response)
                        this.$nextTick(()=> {
                            document.getElementById("qlt-filter-result").getElementsByClassName("textarea")[0].value = response['bodyText']
                        })

                    }
                );
            }
        },

        runSbjFilter: function(){
            if (!this.waitingResponse){
                //recuperando texto da textarea
                var textarea = document.getElementById("sbj-filter-input").getElementsByClassName("textarea")[0]
                var text = textarea.value

                //desabilitando textarea e button
                document.getElementById("sbj-filter-input").getElementsByClassName("textarea")[0].disabled = true
                document.getElementById("sbj-filter-btn").disabled = true
                this.waitingResponse = true
                this.responseStage = 1

                this.$http.get('main/sbjFilter', {params: {'text' : text}}).then(
                    function(response){
                        //reabilitando elementos para nova consulta
                        document.getElementById("sbj-filter-input").getElementsByClassName("textarea")[0].disabled = false
                        document.getElementById("sbj-filter-btn").disabled = false
                        this.responseStage = 2
                        this.waitingResponse = false
                        //console.log(response)
                        this.$nextTick(()=> {
                            document.getElementById("sbj-filter-result").getElementsByClassName("textarea")[0].value = response['bodyText']
                        })

                    }
                );
            }
        },
        runAspect: function(){
            if (!this.waitingResponse){
                //recuperando texto da textarea
                var textarea = document.getElementById("aspect-input").getElementsByClassName("textarea")[0]
                var text = textarea.value

                //desabilitando textarea e button
                document.getElementById("aspect-input").getElementsByClassName("textarea")[0].disabled = true
                document.getElementById("aspect-btn").disabled = true
                this.waitingResponse = true
                this.responseStage = 1

                this.$http.get('main/aspect', {params: {'text' : text}}).then(
                    function(response){
                        //reabilitando elementos para nova consulta
                        document.getElementById("aspect-input").getElementsByClassName("textarea")[0].disabled = false
                        document.getElementById("aspect-btn").disabled = false
                        this.responseStage = 2
                        this.waitingResponse = false
                        //console.log(response)
                        this.$nextTick(()=> {
                            document.getElementById("aspect-result").getElementsByClassName("textarea")[0].value = response['bodyText']
                        })

                    }
                );
            }
        },
        runOpizer: function(){
            if (!this.waitingResponse){
                //recuperando texto da textarea
                var textarea = document.getElementById("opizer-input").getElementsByClassName("textarea")[0]
                var text = textarea.value

                //desabilitando textarea e button
                document.getElementById("opizer-input").getElementsByClassName("textarea")[0].disabled = true
                document.getElementById("opizer-btn").disabled = true
                this.waitingResponse = true
                this.responseStage = 1

                this.$http.get('main/opizer', {params: {'text' : text}}).then(
                    function(response){
                        //reabilitando elementos para nova consulta
                        document.getElementById("opizer-input").getElementsByClassName("textarea")[0].disabled = false
                        document.getElementById("opizer-btn").disabled = false
                        this.responseStage = 2
                        this.waitingResponse = false
                        //console.log(response)
                        this.$nextTick(()=> {
                            var output = response['bodyText'].split('\n').slice(2).join('\n')
                            document.getElementById("opizer-result").getElementsByClassName("textarea")[0].value = output
                        })

                    }
                );
            }
        },
        plotBarChart: function(chartData){
            //inicializando variaveis auxiliares para plotagem
            var dataKeys = [];
            var backgroundColorPos = [];
            var backgroundColorNeg = [];
            var valuesPos = [];
            var valuesNeg = [];
            var colorPos = "#3e95cd";
            var colorNeg = "#aa3f22";

            var maxAspects = 12;
            var numberOfColumns = maxAspects;
            if(this.chartData.length < maxAspects)
                numberOfColumns = this.chartData.length;

            //reorganizando os dados para permitir plotagem em forma de barras verticais
            for (var i=0; i < numberOfColumns; i++){
                dataKeys.push(this.chartData[i][0]);

                backgroundColorPos.push(colorPos);
                valuesPos.push(this.chartData[i][1][0]);

                backgroundColorNeg.push(colorNeg);
                valuesNeg.push(this.chartData[i][1][1]);
            }

            data = {
                labels: dataKeys,    //todos os aspectos em ordem
                datasets: [
                    {
                        backgroundColor: backgroundColorPos,  //cor da barra positiva(1 entrada para cada aspecto)
                        data: valuesPos   //opinioes positivas para cada aspecto
                    },
                    {
                        backgroundColor: backgroundColorNeg,
                        data: valuesNeg   //opinioes negativas para cada aspecto
                    }
                ]
            };

            return data;

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
