$(document).ready(function() {

    function createCheckoutProductCard(obj) {
        // <div class="checkout-card">
        //     <div>
        //         <img class="checkout-product-img" src="/assets/default-product.png" />
        //     </div>
        //     <div>
        //         <h4>Product Title</h4>
        //         <p>x3</p>
        //         <p>Amount: Rs <span>30000</span></p>
        //     </div>
        // </div>

        var card = document.createElement('div');
        card.classList.add('checkout-card');

        var firstInnerDiv = document.createElement('div');
        var productImg = document.createElement('img');
        productImg.classList.add('checkout-product-img');
        productImg.src = obj.preview;
        firstInnerDiv.appendChild(productImg);

        var secondInnerDiv = document.createElement('div');
        var productName = document.createElement('h4');
        productName.innerHTML = obj.name; 
        var quantityinc = document.createElement('button') ;  
        var productCount = document.createElement('p'); 
        var quantitydec = document.createElement('button') ;  
        var quantity = document.createElement('span') ; 
        productCount.appendChild(quantityinc) ; 
        quantity.innerHTML = 'x'+obj.count;  
        productCount.appendChild(quantity) ; 
        productCount.appendChild(quantitydec) ;  
        quantityinc.classList.add("quan-btn") ; 
        quantitydec.classList.add("quan-btn1") ;  
        quantityinc.innerText = "+" ; 
        quantitydec.innerText = "-" ; 
        productCount.classList.add("quan-para") ;  
        var delbtn = document.createElement('button') ;  
        delbtn.classList.add("del-btn") ; 
        delbtn.innerText="Remove Item" ; 

        var amountLabel = document.createElement('span');
        amountLabel.innerHTML = 'Amount: Rs ';
        var amountSpan = document.createElement('span');
        amountSpan.innerHTML = parseInt(obj.count) * parseInt(obj.price);
        var productAmount = document.createElement('p');
        productAmount.appendChild(amountLabel);
        productAmount.appendChild(amountSpan);
        secondInnerDiv.appendChild(productName);
        secondInnerDiv.appendChild(productCount);
        secondInnerDiv.appendChild(productAmount);
        secondInnerDiv.appendChild(delbtn) ; 
        card.appendChild(firstInnerDiv);
        card.appendChild(secondInnerDiv);
    
        quantityinc.onclick= function(){ 

            if (obj.count<50){ 
                
            obj.count +=1 ;    
            quantity.innerHTML = "x" + obj.count;
            amountSpan.innerHTML = parseInt(obj.count) * parseInt(obj.price); 
            // console.log(obj.count) ; 
            quantinc(obj.id) ; 
            totalamt(obj); 
            // console.log("1") ; 
        }} ; 
        quantitydec.onclick=()=>{ 
            if(obj.count>1) {  
              obj.count--;    
              quantity.innerText= "x" + obj.count; 
              amountSpan.innerHTML = parseInt(obj.count) * parseInt(obj.price); 
              quantdec(obj.id) ; 
              totalamt(obj); 
        }}
        delbtn.onclick = ()=>{
          card.remove(); 
          deletedata(obj.id) ; 
          totalamt(obj);  

        }      




        return card;
    }

    var productl = window.localStorage.getItem('product-list');
    productl = productl === null || productl === '' ? [] : productl;
    productl = productl.length > 0 ? JSON.parse(productl) : [];
    console.log(productl) ; 
    
    var grandTotal = 0;
    for(var i=0; i<productl.length; i++) {
        $('#card-list').append(createCheckoutProductCard(productl[i]));
        // console.log('Count => ', productl[i].count);
        // console.log('Price => ', productl[i].price);

        var totalForCurrentProduct = parseFloat(productl[i].count) * parseFloat(productl[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;

        // console.log('Total For Product '+ i + ' is=> ' + totalForCurrentProduct);
    }
    
    

    




    $('#item-count').html(productl.length);
    $('#total-amount').html(grandTotal);

    $('#btn-place-order').click(function() {

        var orderItemArr = [];
        for(var i=0; i<productl.length; i++) {
            var prodObj = {
                "id": productl[i].id,
                "brand": productl[i].brand,
                "name": productl[i].name,
                "price": productl[i].price,
                "preview": productl[i].preview,
                "isAccessory": productl[i].isAccessory
            }

            orderItemArr.push(prodObj);
        }

          var dataObj = {
            amount: grandTotal,
            products: orderItemArr
        } 
        if(productl.length>0) {
        $.post('https://5ee90a15ca595700160298cc.mockapi.io/Assignment-10-orderdetails', dataObj, function() {
            alert('Order Placed Successfully')
            localStorage.setItem('product-list', []);

            location.assign('./thankyou.html');
        }) } 
        else {
            alert("Cart cannot be empty !!") ; 
            location.assign("./index.html")
        }

    })
     
    function quantinc(id){ 
        var flag = 0 ;   
     var productl = JSON.parse(window.localStorage.getItem("product-list")) ; 
     for(var i = 0 ; i<productl.length ; i++) {
        
        if (productl[i].id==id){
           flag=1 ; 
           break ; 
        }
    
     }    
     if(flag==1) {
    
        $('#cart-count').text(parseInt($('#cart-count').text()) + 1);  
        productl[i].count+=1 ; 
        window.localStorage.setItem("product-list" , JSON.stringify(productl)) ; 
     }

    }
    function totalamt() { 
        var totamt=0 ; 
        var productl = JSON.parse(window.localStorage.getItem("product-list")) ;  
        
        productl.map((item)=>{
            
            totamt += item.count*item.price ;
               
                  
        } )
        $('#total-amount').html(totamt);



    }
    function quantdec(id){
        
     var flag = 0 ;   
     var productl = JSON.parse(window.localStorage.getItem("product-list")) ; 
     for(var i = 0 ; i<productl.length ; i++) {
        
        if (productl[i].id==id){
           flag=1 ; 
           break ; 
        }
    
     }     
        if(flag==1) {
       
           $('#cart-count').text(parseInt($('#cart-count').text()) - 1); 
           productl[i].count-=1 ; 
           
        //    console.log(productl) ;  
           
           window.localStorage.setItem("product-list" , JSON.stringify(productl)) ; 
        }
   
       }
    function deletedata(id){ 
    $('#item-count').text(parseInt($('#item-count').text()) - 1);  
    var productl = JSON.parse(window.localStorage.getItem("product-list")) ;
    var flag = 0 ;     
        for(var i=0 ; i<productl.length ; i++) {       
        if(productl[i].id==id){
            flag=1 ; 
            break ; 
        }    
       
      } 
    
       if(flag==1){
        $('#cart-count').text(parseInt($('#cart-count').text()) - productl[i].count );  
       productl.splice(i,1) ; 
       window.localStorage.setItem("product-list",JSON.stringify(productl)) ; 
       }
    

    }


})