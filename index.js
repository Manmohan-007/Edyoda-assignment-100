$(document).ready(function(){

    $('#main-banner').slick({
        autoplay: true,
        dots: true,
        arrows: false,autoplaySpeed: 1500 
      });
    function createHomePageProductCard(obj) {
      // <div class="product-card">
      //     <a href='/details.html'>
      //     <img class="product-image" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg" />
          
      //     <div class="product-meta">
      //         <h4>Men Navy Solid Sweatshirt</h4>
      //         <h5>United Colors of Benetton</h5>
      //         <p>Rs 2599</p>
      //     </div>
      //     </a>
      // </div>

      var mainDiv = document.createElement('div');
      mainDiv.classList.add('product-card');

      var productLink = document.createElement('a');
      productLink.href = 'details.html?p='+obj.id;

      var productImage = document.createElement('img');
      productImage.classList.add('product-image');
      productImage.src = obj.preview;
      productImage.alt = obj.name + ' Pic';

      productLink.appendChild(productImage);

      var innerDiv = document.createElement('div');
      innerDiv.classList.add('product-meta');

      var productName = document.createElement('h4');
      var productNameText = document.createTextNode(obj.name);
      productName.appendChild(productNameText);

      var productBrand = document.createElement('h5');
      var productBrandText = document.createTextNode(obj.brand);
      productBrand.appendChild(productBrandText);

      var productPrice = document.createElement('p');
      var productPriceText = document.createTextNode('Rs ' + obj.price);
      productPrice.appendChild(productPriceText);
      var addcartbtn = document.createElement("button") ; 
      addcartbtn.classList.add("add-cart-btn") ; 
      addcartbtn.innerText="Add to Cart"; 
      productPrice.classList.add("price-wrapper") ; 
      productPrice.appendChild(addcartbtn) ;
      innerDiv.appendChild(productName);
      innerDiv.appendChild(productBrand);
      innerDiv.appendChild(productPrice);

      mainDiv.appendChild(productLink);
      mainDiv.appendChild(innerDiv);
      // console.log(obj)
      $(addcartbtn).click(function() {
        $(addcartbtn).addClass('bigger');
        setTimeout(function() {
            $(addcartbtn).removeClass('bigger');
        }, 200)
        // alert("123") ; 
        var productl = window.localStorage.getItem('product-list');
        productl = productl === null || productl === '' ? [] : productl;
        productl = productl.length > 0 ? JSON.parse(productl) : [];
        
        // productList.push(currentObj);
        // window.localStorage.setItem('product-list', JSON.stringify(productList));
        // console.log(productList);
        // var res = {...obj} ; 
        // console.log(res) ; 
        var flag=0 ; 
        for(var i=0; i < productl.length; i++) {
            
            if(productl[i].id == obj.id) { 
                // console.log(productl[i]) ; 
                flag=1 ; 
                break ; 
            }
            else if (productl[i].id!=obj.id) {
                    
               
            }
        } 
        // console.log(obj) ; 
        // console.log(productl[i],"found") ; 
        // console.log(productl[i] , "not found") ; 
        if(flag==1) {
            productl[i].count += 1; 
            // console.log(productl[i],"found") ; 
            window.localStorage.setItem('product-list', JSON.stringify(productl));
        }else { 
            // console.log(productl[i] , "not found") ; 
            obj.count = 1;  
            
            console.log(obj ,"notfound") ; 
            // console.log(productl) ; 
            productl.push(obj); 
            
            window.localStorage.setItem('product-list', JSON.stringify(productl)); 
        }

        var totalCount = 0;
        for(var i=0; i<productl.length; i++) {
            totalCount = totalCount + productl[i].count;
        }
    
        $('#cart-count').html(totalCount);
    })




      return mainDiv;
    }

    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(data, status) {
      var response = data;

      for(var i=0; i<response.length; i++) {
        if(response[i].isAccessory) {
          $('#accessory-grid').append(createHomePageProductCard(response[i]))
        } else {
          $('#clothing-grid').append(createHomePageProductCard(response[i]))
        }
      }
    }) 
});