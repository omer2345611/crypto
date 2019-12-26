(() => {
    $(() => {

        // Adding visuals effects
        function addingEffects(chosenClassOrId) {
            $('#lodaing').css('display', 'block');
            $(chosenClassOrId).css('display', 'none');
            $(chosenClassOrId).fadeIn(2350);
        }

        // On click functions 

        $('#displayCoinsBtn').click(() => { // Display Coins
            $('#sectionTitle > h2').html('<h2>Coins</2>');
            addingEffects('#sectionTitle > h2');
            addingEffects(".row");
            getCoins();
        });

        $('#displayChartsBtn').click(() => { // Display Chart
            $('.row').hide();
            $('#sectionTitle > h2').html('<h2>Live Charts</2>');
            addingEffects('#sectionTitle > h2');
            $('#aboutDiv').css("display", "none");
            $('#chartContainer').css("display", "block");
            showCharts();
        });

        $('#displayAboutBtn').click(() => { // Display About
            console.clear();
            console.log('Creating about-me section...')
            $('.row').hide();
            $('#sectionTitle > h2').html('<h2>About</2>');
            addingEffects('#sectionTitle > h2');
            addingEffects("#aboutDiv");
            $('#aboutDiv').css("display", "block");
            $('#aboutDiv').delay(2000);
            $('#aboutDiv').html(
                `<div class='aboutMe' style= 'font-family: Merriweather Sans; font-size: 1.1rem;'>
                        <h1>About Me</h1>
                        <img src="/assets/images/myImg.jpg"/>
                        <div class='bio'>
                        <p><b>Name:</b> Omer Shaharabani </p>
                        <p><b>Age:</b> 19 </p>
                        <p><b>Learning at:</b> John-Bryce </p>
                        <p><b>Topic:</b> Second Porject <i class="fas fa-satellite"></i></p>
                        <p><b>Full Stack Developer</p>
                        </div>
                </div>`
            );
            hideCharts();
            $('#lodaing').css('display', 'none');
        });

        // ----------------------------------------------------------------
        // On load functions

        getCoins(); // Display Coins on load
        addingEffects('#sectionTitle > h2');
        addingEffects(".row");

        $().ready(() => { // Display website title
            $("#websiteTitle").slideDown(2000);
        });
        // ----------------------------------------------------------------


        //Get coins - START
        function getCoins() {
            $('#chartContainer').css("display", "none");
            $('#aboutDiv').css("display", "none");
            $('.row').empty();
            console.clear();
            console.log('Creating coins cards...');
            console.log('*** Changing Gravity ***');
            let url = "https://api.coingecko.com/api/v3/coins/list/";
            $.getJSON(url, (data) => {
                for (let i = 140; i < 240; i++) {
                    $(".row").append(
                        `<div  class="col-sm-6  col-lg-4  card" id="${data[i].symbol}">
                    <div class="card-body">
                         <label class="switch">
                         <input type="checkbox" data-coin="${data[i].id}" data-coinid="${data[i].symbol}">
                         <span class="slider round"></span>
                         </label>
                         <h5 class="card-title">${data[i].symbol} </h5>
                        <p class="card-text">${data[i].id}</p>
                        <button  class="btn btn-primary " type="button" data-toggle="collapse" data-target="#${data[i].id}"
                            aria-expanded="false" aria-controls="collapseExample" onclick="collapseInfo(this)">
                            More info 
                        </button>

                        <div class="collapse col-sm-12 " id="${data[i].id}" >
                            <div>
                                <div class="progress-bar-container">
                                    <div class="progress-bar stripes animated reverse slower">
                                        <span class="progress-bar-inner"></span>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>`
                    );
                    hideCharts();
                    $('#lodaing').css('display', 'none');
                }
                let myCoins = localStorage.getItem("myCoins");
                if (myCoins && myCoins.length) {
                    myCoins = myCoins.split(",");
                    $.each(myCoins, function (i, e) {
                        $("input[data-coinid='" + e + "']").prop('checked', true);
                    });
                }
                $('input[type=checkbox]').change(function () {
                    if ($(this).is(':checked')) {
                        // Checkbox is checked..
                        let checkingElement = $('input[type=checkbox]:checked');
                        if (checkingElement.length > 5) {
                            $(this).prop('checked', false);
                            openCheckedCoinsModal();
                        } else {
                            let myCoins = localStorage.getItem("myCoins");
                            if (!(myCoins && myCoins.length)) myCoins = "";
                            localStorage.setItem("myCoins", myCoins + "," + $(this).data('coinid'));
                        }
                    } else {
                        let myCoins = localStorage.getItem("myCoins");
                        let removeCoin = $(this).data('coinid');
                        myCoins = myCoins.split(",");
                        for (i = 0; i < myCoins.length; i++) {
                            if (myCoins[i] === removeCoin) {
                                myCoins[i] = "";
                            }
                        }
                        let result = [];
                        $.each(myCoins, function (element) {
                            if ($.inArray(element, result) === -1 && element.length) {
                                result.push(element);
                                $("input[data-coinid='" + element + "']").prop('checked', true);
                            }
                        });
                        myCoins = result.join(",");
                        localStorage.setItem("myCoins", myCoins);
                    }
                });
            });
        }
        // Get coins - END -----------------------------------------------------------


        // Search Btn - START
        $("#searchBtn").click(function () {
            let el = $('body > main > div.container > div > div');
            var userSearch = $("#inputSearch").val();
            if (userSearch === "") {
                for (i = 0; i < el.length; i++) {
                    $(el[i]).show();
                    $(el[i]).removeClass("col-sm-12 col-lg-12").addClass("col-sm-6 col-lg-4");
                }
            } else {
                for (i = 0; i < el.length; i++) {
                    if ($(el[i]).attr("id") === userSearch) {
                        $(el[i]).show();
                        $(el[i]).removeClass("col-sm-6 col-lg-4").addClass("col-lg-12 col-sm-12");
                    } else {
                        $(el[i]).hide();
                        $(el[i]).removeClass("col-sm-12 col-lg-12").addClass("col-sm-6 col-lg-4");
                    }
                }
                console.log('Looking for your search...');
            }
        });
        //Search Button - END -----------------------------------------------


        // The Checking Modal - START 
        function openCheckedCoinsModal() {
            $('#coinsModal').append(
                `<button id="openModalBtn" type="button" data-toggle="modal" data-target="#modal" sty
            le="display: none;" ></button>
            <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Remove any coin to add other</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body row" id="coinsModalRow">
                        
                    </div>
                    <div class="modal-footer">
                        <button id="btnCloseModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>`
            );
            let checkingElement = $('input[type=checkbox]:checked');
            for (i = 0; i < checkingElement.length; i++) {
                $('#coinsModalRow').append(`
                <p class="modalCoinBlock">
                ${$(checkingElement[i]).data("coin")}  
                <label class="switch">
                <input data-coin="${$(checkingElement[i]).data("coin")}" data-coinid="${$(checkingElement[i]).data("coinid")}"
                 type="checkbox" data-toggle="toggle" data-style="ios" checked >
                 <span class="slider round"></span>
                 </label>
                </p>`);
            }
            $('input[type=checkbox]').change(function () {
                if ($(this).is(':checked')) {
                    // Checkbox is checked..
                    if (checkingElement.length > 5) {
                        $(this).prop('checked', false);
                        openCheckedCoinsModal();
                    }
                    else if (!(myCoins && myCoins.length)) myCoins = ""; {
                        let myCoins = localStorage.getItem("myCoins");
                        localStorage.setItem("myCoins", myCoins + "," + $(this).data('coinid'));
                    }
                }
                else {
                    let myCoins = $('input[type=checkbox]:checked');
                    let result = [];
                    for (i = 0; i < myCoins.length; i++) {
                        if ($(this).data("coin") === $(myCoins[i]).data("coin")) {
                            $(myCoins[i]).prop('checked', false);
                        }
                        else if ($(myCoins[i]).data("coinid") && $(myCoins[i]).data("coinid").length && $.inArray($(myCoins[i]).data("coinid"), result) === -1) {
                            result.push($(myCoins[i]).data("coinid"));
                            $("input[data-coinid='" + myCoins[i] + "']").prop('checked', true);
                        }
                    }
                    myCoins = result.join(",");
                    localStorage.setItem("myCoins", myCoins);
                }
                $('#btnCloseModal').click();
            });
            $('#modal').on('hidden.bs.modal', function () {
                $('#coinsModal').html("");
            })
            $('#openModalBtn').click();
        }
        // The Checking Modal - END ------------------------------------------------- 


        // Charts section - START 

        let chartIntervalTimer = null;
        let chartIntervalValue = 2000;
        let time = new Date;
        let dataPoints = [];
        // let dataPoints1 = [];
        // let dataPoints2 = [];
        // let dataPoints3 = [];
        // let dataPoints4 = [];
        // let dataPoints5 = [];

        // ToggleDataSeries function
        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }

        // HideCharts function
        function hideCharts() {
            $("#inputSearch").val("");
            $("#searchBtn").click();
            $('#chartContainer').attr('hidden', true);
            $('#container').attr('hidden', false);
            clearInterval(chartIntervalTimer);
        }
        // HideCharts - END ------------------------------------------------- 


        // showCharts function
        function showCharts() { // 
            let myCoins = localStorage.getItem("myCoins");
            if (myCoins && myCoins.length) {
                myCoins = myCoins.toUpperCase();
                myCoins = myCoins.replace(/^,|,$/g, '');
                myCoinsString = myCoins;
                myCoins = myCoins.split(",");

                //first load charts with local storage coin's
                let url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + myCoins;
                $.getJSON(url, function (data) {
                    console.log('Creating live charts...');
                    time.setTime(time.getTime() + chartIntervalValue);
                    let arr = Object.entries(data).map(([k, v]) => ([k, v]));
                    for (let i = 0; i < arr.length; i++) {
                        dataPoints = dataPoints || [];
                        dataPoints.push({
                            type: "line",
                            xValueType: "dateTime",
                            yValueFormatString: "###.###",
                            xValueFormatString: "hh:mm:ss TT",
                            showInLegend: false,
                            name: arr[i][0],
                            dataPoints: [{
                                x: time.getTime(),
                                y: arr[i][1].USD
                            }]
                        });
                    }
                    let options = {
                        title: {
                            text: myCoinsString
                        },
                        axisX: {
                            title: "chart updates every 2 secs"
                        },
                        axisY: {
                            suffix: "USD",
                            includeZero: true
                        },
                        toolTip: {
                            shared: true
                        },
                        legend: {
                            cursor: "pointer",
                            verticalAlign: "top",
                            fontSize: 22,
                            fontColor: "dimGrey",
                            itemclick: toggleDataSeries
                        },
                        data: dataPoints
                    };
                    if (dataPoints.length) {
                        let chart = $("#chartContainer").CanvasJSChart(options);
                        chartIntervalTimer = setInterval(updateChart, chartIntervalValue);
                        $('#lodaing').css('display', 'none');
                    }
                });
            }
            else {
                localStorage.clear();
                console.clear();
                console.log('Choose a coin first...');
                $('#lodaing').css('display', 'none');
                $('#chartContainer').html(
                    `<div id="chartContainerDiv"> 
        <h2  style="text-align: center; margin-top: 20px; color: white">Please select at least one Coin to view chart </h2>
        <img  style="width: 100%; height: 21rem;" src="/assets/images/tenor.gif"/> 
        </div>`)
            }
            $('#chartContainer').attr('hidden', false);
            $('#container').attr('hidden', true);
        }
        // HideCharts - END --------------------------------------------------------------------


        // UpdateChart function 
        function updateChart() {
            let myCoins = localStorage.getItem("myCoins");
            if (myCoins && myCoins.length) {
                myCoins = myCoins.toUpperCase();
                myCoins = myCoins.replace(/^,|,$/g, '');
            } else return;

            let url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + myCoins + "&tsyms=USD" + "&tsyms=EUR" + "&tsyms=ILS";
            $.getJSON(url, function (data) {
                time.setTime(time.getTime() + chartIntervalValue);
                let arr = Object.entries(data).map(([k, v]) => ([k, v]));
                console.log(arr)
                for (let i = 0; i < arr.length; i++) {
                    console.log(`${arr[i][0]} : ${arr[i][1].USD}$, ${arr[i][1].EUR}€, ${arr[i][1].ILS}₪`);  //Display name + USD, EUR, ILS - rate
                    for (j = 0; j < dataPoints.length; j++) {
                        if (dataPoints[j]['name'] === arr[i][0]) {
                            dataPoints[j]['dataPoints'].push({
                                x: time.getTime(),
                                y: arr[i][1].USD
                            });
                            arr[i] = [];
                        }
                    }
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].length)
                        dataPoints.push({
                            type: "line",
                            xValueType: "dateTime",
                            yValueFormatString: "###.###",
                            xValueFormatString: "hh:mm:ss TT",
                            showInLegend: false,
                            name: arr[i][0],
                            dataPoints: [{
                                x: time.getTime(),
                                y: arr[i][1].USD
                            }]
                        });
                }
                $("#chartContainer").CanvasJSChart().render();
            });
        }
        // UpdateChart - END --------------------------------------------------------------------

    }); //jQuery 
})(); //IEEFY 

// More info Btn - Collapse info
function collapseInfo(e) {
    let coinsId = $(e).next().attr("id");
    let url2 = `https://api.coingecko.com/api/v3/coins/${coinsId}`;
    $.getJSON(url2, (data2) => {
        $(`#${coinsId}`).html(
            `<div class="card card-body collapseproperty static" name="${data2.name}">
        <img src="${data2.image.small}"/></br>
        <p>USD:${data2.market_data.current_price.usd.toFixed(5)}$ </p>
        <p>EUR:${data2.market_data.current_price.eur.toFixed(5)}€ </p>
        <p>ILS:${data2.market_data.current_price.ils.toFixed(5)}₪ </p>
        </div>`);
    });
};


// ---------------------------------------------------------------


