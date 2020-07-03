$(document).ready(function() {
    var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    var totalCount = 0;
    for(var i=0; i<productList.length; i++) {
        totalCount = totalCount + productList[i].count;
    }

    $('#cart-count').html(totalCount); 

    $('#ham-item').bind("click" , ()=>{
        // alert("fine") ; 
        $("#overlay").css("transform","translateX(100%)") ? $("#overlay").css("transform", "translateX(0%)") :$("#overlay").css("transform", "translateX(100%)") ;     
        console.log($("#overlay").css("transform")) ; 
        $('#black-overlay').css('display')=="none" ? $('#black-overlay').css('display','block') : $('#black-overlay').css('display','none') ; 
    }) ; 
    $('#black-overlay').bind('click',()=>{
            
        $("#overlay").css("transform","translateX(0%)") ? $("#overlay").css("transform", "translateX(100%)") :$("#overlay").css("transform", "translateX(100%)") ;     
        console.log($("#overlay").css("transform")) ; 
        $('#black-overlay').css('display')=="none" ? $('#black-overlay').css('display','block') : $('#black-overlay').css('display','none') ; 
         


    }) ;
    $('#overlay a').bind('click',()=>{
      
        $("#overlay").css("transform","translateX(0%)") ? $("#overlay").css("transform", "translateX(100%)") :$("#overlay").css("transform", "translateX(100%)") ;    ; 
        console.log($("#overlay").css("transform")) ; 
        $('#black-overlay').css('display')=="none" ? $('#black-overlay').css('display','block') : $('#black-overlay').css('display','none') ; 
        

    })  



})