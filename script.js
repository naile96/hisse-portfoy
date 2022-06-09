const hisse = document.getElementById('hisse');
const adet = document.getElementById('adet');
const price = document.getElementById('price');

var asilDizi = []


function button(){
    let tempHTML = "";
    for(var i=0 ; i<asilDizi.length;i++){
        tempHTML +=
            '<div class="col-2 mb-2 btn-group ">\n' +
            '<button type="button" onclick="Delete(' + i + ')" class="btn btn-outline-dark">'+asilDizi[i].name + " " + asilDizi[i].adet+'</button>\n' +
            '</div>'
    }
    document.getElementById('hisseName').innerHTML = tempHTML;
}


function AddHisse(){
  //  const  asilDizi = JSON.parse(localStorage.getItem("asilDizi"));
    asilDizi.push({
        "name": hisse.value,
        "adet" : adet.value,
        "maliyet": price.value,
        "deger" :  adet.value * price.value,
        "renk" :randomColor()
    })
    localStorage.setItem("asilDizi", JSON.stringify(asilDizi));

    hisse.value = null;
    adet.value = null;
    price.value = null;

    refreshChart();
    button();
}

function Delete(id){
    console.log("id = "+ id)
    // arraylerin id  inci elemanını sıl
    asilDizi.splice(id,1)
    localStorage.setItem("asilDizi", JSON.stringify(asilDizi));

    button();
    refreshChart();
}

<!--sayfa açıldığında / yenilendiğinde çalışacak localStorageta ki itemlarımızı getirecek -->
const startConf = () => {
    asilDizi = JSON.parse(localStorage.getItem("asilDizi"));
    if (!asilDizi){
        localStorage.setItem("asilDizi", JSON.stringify([]));
    }else{
        refreshChart();
        button();
    }
}
startConf();



let data = {}
function randomColor(){

    var a = "ABCDEF0123456789";
    var text = "#";

    for (var i=0; i<6; i++){
        var random = Math.round(Math.random() * 15);
        text += a.charAt(random);
    }
    return text
}

var chart
function refreshChart(){
   var data = {
        labels: asilDizi.map( function (e){ return e.name }),
        datasets: [
            {
                label: 'Hisseler',
                data: asilDizi.map( function (e){ return e.deger }),
                backgroundColor: asilDizi.map( function (e){ return e.renk }),
            }
        ]
    };

    console.log(data)
    if(chart){
        chart.destroy();
    }

    config = {
        type: 'pie',
        data: data,
        options: {
            animation:{
                animateScale: true,
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        },
    };

    chart = new Chart("myChart", config)

}
