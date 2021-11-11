"use strict";
let txtUsers;
let sliderUtenti;
let checkBoxFiltri;

let valoreSalvato=0;
let nationalities=["AU", "BR", "CA", "DE", "ES", "FI", "FR", "GB", "US"];//AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US
let gender=["male","female"];
let password=["special","upper","lower","number"];
let dati;
let outputGenerati;
let cont=1;

window.onload = function () {

    outputGenerati=document.getElementsByClassName("generati");
    txtUsers=document.getElementById("numeroUtenti");
    sliderUtenti=document.getElementById("sliderUtenti");
    checkBoxFiltri=document.getElementsByClassName("checkBoxFiltri");
    for(let i=0;i<checkBoxFiltri.length;i++)
    {
        caricaCheck(checkBoxFiltri[i].value,checkBoxFiltri[i]);
        cambiaStatoCheck(checkBoxFiltri[i].value,checkBoxFiltri[i])
    }
    $(".nascondi").hide();
}
function generateUsers() {
    if(txtUsers.value=="")
    {
        alert("enter numbers of users to be generated");
    }else{

        let numUsers=txtUsers.value;
        let param="?results="+numUsers+"&&"+aggiungiFiltri();
        let finalUrl="https://randomuser.me/api"+param;
        console.log(finalUrl);
        $.ajax({
            url:finalUrl,
            dataType: 'json',
            success:function (usersData) {
                cont=1;
                console.log(usersData);
                dati=usersData.results;
                upload(0,dati);
                document.getElementById("labelMax").innerText="di "+dati.length;
            }
        })
    }
}
function aggiungiFiltri() {
    let filters="";
    for(let i=0;i<checkBoxFiltri.length;i++){
        if (checkBoxFiltri[i].checked)
        {
            filters+=checkBoxFiltri[i].value+"=";
            let array=document.getElementsByClassName(checkBoxFiltri[i].value);
            let primoFiltro=true;
            for(let j=0;j<array.length;j++){
                if(array[j].checked){
                    let filtro="_"+array[j].id;
                    if(primoFiltro)
                        primoFiltro=false;
                    else{
                        filters+=",";
                    }
                    filters+=document.getElementById(filtro).innerText;
                }
            }
            filters+="&&";
        }
    }
    return filters;
}

//-------------------- gestione inserimento utenti
function sliderChanged() {
    txtUsers.value=sliderUtenti.value;
}
function textChanged() {
    console.log(sliderUtenti.max);
    if (parseInt(txtUsers.value)>sliderUtenti.max||(txtUsers.value<sliderUtenti.min&&txtUsers.value!=""))
    {
        txtUsers.value=valoreSalvato;
    }else{
        valoreSalvato=txtUsers.value;
        sliderUtenti.value=valoreSalvato;
    }

}
//--------------------
function caricaCheck(tipo, checkAbilitaFiltro)
{

    switch (tipo)
    {
        case "nat":
            generaRadioOcheck(nationalities,"checkbox","nat",checkAbilitaFiltro.parentNode);
            break;
        case "gender":
          generaRadioOcheck(gender,"radio","gender",checkAbilitaFiltro.parentNode);
            break;
        case "password":
            generaRadioOcheck(password,"checkbox","password",checkAbilitaFiltro.parentNode);
            break;
    }
}
function generaRadioOcheck(array,tipo,name,doveInserire)
{
    for (let i=0;i<array.length;i++)
    {
        let labelRadioOCheck=document.createElement("label");
        labelRadioOCheck.innerText=array[i];
        labelRadioOCheck.for=array[i];
        labelRadioOCheck.id="_"+array[i];
        doveInserire.appendChild(labelRadioOCheck);
        let radioOCheck=document.createElement("input");
        radioOCheck.type=tipo;
        radioOCheck.value=array[i];
        radioOCheck.id=array[i];
        radioOCheck.name=name;
        radioOCheck.checked=false;
        radioOCheck.setAttribute("class",name);
        doveInserire.appendChild(radioOCheck);
    }
}
function upload()
{
    let indice=cont-1;
    pulisciDati();
    document.getElementById("labelContatore").innerText="elemento "+cont;
    outputGenerati[0].src=dati[indice].picture.large;
  outputGenerati[1].innerText+=" "+ dati[indice].name.first;
  outputGenerati[2].innerText+=" "+dati[indice].name.last;
  outputGenerati[3].innerText+=" "+ dati[indice].gender;
    outputGenerati[4].innerText+=" "+ dati[indice].nat;
  outputGenerati[5].innerText+=" "+dati[indice].email;
    outputGenerati[6].innerText+=" "+dati[indice].login.password;
    //$("#portfolio").slideDown();
    //$("#NomeCognomeFoto").slideDown();
    $(".nascondi").slideDown();
}
function pulisciDati(){
 for(let i=0;i<outputGenerati.length;i++)
 {
     outputGenerati[i].innerText=outputGenerati[i].id+": ";
 }
}
function cambiaStatoCheck(tipo,chkMaster) {

    switch (tipo)
    {
        case "nat":
            cambiaStato(nationalities,chkMaster.checked);
            break;
        case "gender":
            cambiaStato(gender,chkMaster.checked);
            break;
        case "password":
            cambiaStato(password,chkMaster.checked);
            break;
    }
}
function cambiaStato(array,valore) {
    for (let i=0;i<array.length;i++){
        let chkOradio=document.getElementById(array[i]);
        chkOradio.disabled=!valore;

    }
}
function cambiaIndice(step){
    step=parseInt(step);
    if((cont+step)>0&&(cont+step)<(dati.length+1)){
    cont+=step;
 upload();
    }
}