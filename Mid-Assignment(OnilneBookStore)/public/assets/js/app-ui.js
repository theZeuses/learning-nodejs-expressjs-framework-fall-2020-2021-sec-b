$(function () {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }  

    $(".file-upload").on('change', function(){
        readURL(this);
    });


    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
    });
    

    $(".category-btn").on("click", function () {
        var value=$(this).attr("value");
        var data = {
            query : value
        };
        var json = JSON.stringify(data);
        $.ajax({
          type: 'GET',
          url: '/customer/categorify/'+json,
          contentType: 'application/json',
          dataType: "json",
          success: function(results) {
            var results = results.results;
            var html = '<h3>Category: <small>'+value+'</small> </h3><div class="row">';
            if(results.length > 0){
                for(var i = 0; i < results.length; i++){
                    html += '<div class="col-md-3 col-sm-6"><div class="product-grid4"><div class="product-image4">';
                    html +=    '<a href="#"><img class="pic-1" src="/public/assets/uploads/'+results[i].picture+'">';
                    html +=        '<img class="pic-2" src="/public/assets/uploads/'+results[i].picture+'"></a>';
                    html +=   '<ul class="social"><li><a data-tip="Quick View" data-toggle="modal" class="customer-book-info-modal" book-id="'+results[i].bookid+'" data-target="#exampleModalLong2"><i class="fa fa-eye"></i></a></li>';
                    html +=         '<li><a class="addToCart" value="'+results[i].bookid+'" data-tip="Add to Cart"><i class="fa fa-shopping-cart"></i></a></li></ul>';
                    html +=    '<span class="product-new-label">New</span><span class="product-discount-label">-10%</span></div>';
                    html += '<div class="product-content"><h3 class="title"><a href="#">'+results[i].name+'</a></h3><div class="price">';
                    html +=      results[i].price+'<span>$16.00</span></div><p class="card-text">'+results[i].author+'</p>';
                    html +=    '<button class="add-to-cart" value="'+results[i].bookid+'">ADD TO CART</button>';
                    html += '</div>';
                    html += '</div>';
             
                    html += '</div>';
                }
            }else{
                html += '<h4>No book available in this category</h4>';
            }
            html += '</div>';
            $('#categorify').html(html);
          }
        });
      });


      $(".ad-category-btn").on("click", function () {
        var value=$(this).attr("value");
        var data = {
            query : value
        };
        var json = JSON.stringify(data);
        $.ajax({
          type: 'GET',
          url: '/customer/categorify/'+json,
          contentType: 'application/json',
          dataType: "json",
          success: function(results) {
            var results = results.results;
            var html = '<h3>Category: <small>'+value+'</small> </h3><div class="row">';
            if(results.length > 0){
                for(var i = 0; i < results.length; i++){
                    html += '<div class="col-md-3 col-sm-6"><div class="product-grid4"><div class="product-image4">';
                    html +=    '<a href="#"><img class="pic-1" src="/public/assets/uploads/'+results[i].picture+'">';
                    html +=        '<img class="pic-2" src="/public/assets/uploads/'+results[i].picture+'"></a>';
                    html +=   '<ul class="social"><li><a data-tip="Quick View" data-toggle="modal" class="admin-book-info-modal" book-id="'+results[i].bookid+'" data-target="#exampleModalLong"><i class="fa fa-eye"></i></a></li></ul>';
                    html +=    '<span class="product-new-label">New</span><span class="product-discount-label">-10%</span></div>';
                    html += '<div class="product-content"><h3 class="title"><a href="#">'+results[i].name+'</a></h3><div class="price">';
                    html +=      results[i].price+'<span>$16.00</span></div><p class="card-text">'+results[i].author+'</p>';
                    html += '</div>';
                    html += '</div>';
             
                    html += '</div>';
                }
            }else{
                html += '<h4>No book available in this category</h4>';
            }
            html += '</div>';
            $('#categorify').html(html);
          }
        });
      });

      $(document).on("click", '.add-to-cart', function () {
        var value=$(this).attr("value");
        var data = {
            query : value
        };
        var json = JSON.stringify(data);
        console.log(json);
        $.ajax({
          type: 'GET',
          url: '/customer/addtocart/'+json,
          contentType: 'application/json',
          dataType: "json",
          success: function(results) {
            var num = results.num;
            var html = num;
            //console.log(html);
            $('#cartItemNumber').html(html);
          }
        });
      });

      $(document).on("click", '.addToCart', function () {
        var value=$(this).attr("value");
        var data = {
            query : value
        };
        var json = JSON.stringify(data);
        console.log(json);
        $.ajax({
          type: 'GET',
          url: '/customer/addtocart/'+json,
          contentType: 'application/json',
          dataType: "json",
          success: function(results) {
            var num = results.num;
            var html = num;
            //console.log(html);
            $('#cartItemNumber').html(html);
          }
        });
      });


      $(document).on("click", '.remove-from-cart', function () {
        var value=$(this).attr("value");
        var data = {
            query : value
        };
        var json = JSON.stringify(data);
        $.ajax({
          type: 'GET',
          url: '/customer/removefromcart/'+json,
          contentType: 'application/json',
          dataType: "json",
          success: function(results) {
            var books = results.books;
            var booksQuantity = results.booksQuantity;
            var prices = results.prices;
            var books = results.books;
            var subtotal = results.subtotal;
            var total = results.total;
            var cartItemNumber = results.cartItemNumber;
            var html = '<div class="table-responsive"><table class="table table-striped">';
            html += '<thead>';
            html +=        '<tr>';
            html +=            '<th scope="col"> </th>';
            html +=            '<th scope="col">Book</th>';
            html +=            '<th scope="col">Author</th>';
            html +=            '<th scope="col">Available</th>';
            html +=            '<th scope="col">Quantity</th>';
            html +=            '<th scope="col" class="text-right">Price</th>';
            html +=            '<th> </th>';
            html +=        '</tr>';
            html +=    '</thead>';
            html +=    '<tbody>';
            for(var i=0; i<books.length; i++){
              html += '<tr><td><img src="/public/assets/uploads/'+books[i].picture+'" style="height: 50px; width: 50px;"/> </td>';
               html += '<td>'+books[i].name+'</td><td>'+books[i].author+'</td><td>'+books[i].quantity+'</td><td>'+booksQuantity[i]+'</td>';
                html += '<td class="text-right">'+prices[i]+'</td><td class="text-right"><button class="btn btn-sm btn-danger remove-from-cart" value="'+books[i].bookid+'"><i class="fa fa-trash"></i> </button> </td></tr>';
            }
            
            html +=            '<tr>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td>Sub-Total</td>';
            html +=                '<td class="text-right" id="subtotal">'+subtotal+'</td>';
            html +=            '</tr>';
            html +=            '<tr>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td>Shipping</td>';
            html +=                '<td class="text-right">100</td>';
            html +=            '</tr>';
            html +=            '<tr>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td></td>';
            html +=                '<td><strong>Total</strong></td>';
            html +=                '<td class="text-right" id="total"><strong>'+total+'</strong></td></tr>';
            html +=       ' </tbody>';
            html +=    '</table>';
            html +='</div>';

            $('#remove-from-cart-result').html(html);
            $('#cartItemNumber').html(cartItemNumber);
          }
        });
      });

      $(document).on("click", ".book-remove-modal", function () {
        var myBookId = $(this).attr('book-id');
        var myBookName = $(this).attr('book-name');
        $("#modal-book-id").html( myBookId );
        $("#modal-book-name").html( myBookName );
        $("#remove-book-by-id").attr('href', '/admin/book/remove/'+myBookId);
      });

      $(document).on("click", ".user-remove-modal", function () {
        var myUserId = $(this).attr('user-id');
        var myUserName = $(this).attr('user-name');
        $("#modal-user-id").html( myUserId );
        $("#modal-user-name").html( myUserName );
        $("#remove-user-by-id").attr('href', '/admin/users/remove/'+myUserId);
      });

      $(document).on("click", ".admin-book-info-modal", function () {
        var myBookId = $(this).attr('book-id');
        var data = {
          query: myBookId
        }
        var json = JSON.stringify(data);
        console.log(json);
        $.ajax({
          type: 'GET',
          url: '/admin/fetchmodal/'+json,
          contentType: 'application/json',
          dataType: "json",
          success: function(book) {
            var book = book.book;
            var html = "";
            html += '<img src="/public/assets/uploads/'+book.picture+'" class="product-image4 pic-1">';
            html += '<h4>Book ID:</h4><h5>'+book.bookid+'</h5>';
            html += '<h4>Book Name:</h4><h5>'+book.name+'</h5>';
            html += '<h4>Author:</h4><h5>'+book.author+'</h5>';
            html += '<h4>Price:</h4><h5>'+book.price+'</h5>';
            html += '<h4>Quantity:</h4><h5>'+book.quantity+'</h5>';
            html += '<h4>Category:</h4><h5>'+book.category+'</h5>';
            html += '<h4>Details:</h4><h5>'+book.details+'</h5>';
            //console.log(html);
            $('#admin-book-info-modal-body').html(html);
            $('#admin-book-info-modal-edit').attr('href','/admin/home/book/update/'+book.bookid);
          }
        });
      });

      $(document).on("click", ".customer-book-info-modal", function () {
        var myBookId = $(this).attr('book-id');
        var data = {
          query: myBookId
        }
        var json = JSON.stringify(data);
        console.log(json);
        $.ajax({
          type: 'GET',
          url: '/admin/fetchmodal/'+json,
          contentType: 'application/json',
          dataType: "json",
          success: function(book) {
            var book = book.book;
            var html = "";
            html += '<img src="/public/assets/uploads/'+book.picture+'" class="product-image4 pic-1">';
            html += '<h4>Book ID:</h4><h5>'+book.bookid+'</h5>';
            html += '<h4>Book Name:</h4><h5>'+book.name+'</h5>';
            html += '<h4>Author:</h4><h5>'+book.author+'</h5>';
            html += '<h4>Price:</h4><h5>'+book.price+'</h5>';
            html += '<h4>Quantity:</h4><h5>'+book.quantity+'</h5>';
            html += '<h4>Category:</h4><h5>'+book.category+'</h5>';
            html += '<h4>Details:</h4><h5>'+book.details+'</h5>';
            //console.log(html);
            $('#customer-book-info-modal-body').html(html);
            $('#customer-add-to-cart-modal').attr('value', book.bookid);
          }
        });
      });
   
      (function worker() {
        $.ajax({
          url: '/admin/updateorderlist', 
          success: function(data) {
            $('#numberOfOrder').html(data.data);
          },
          complete: function() {
            // Schedule the next request when the current one's complete
            setTimeout(worker, 5000);
          }
        });
      })();

    $( '#table' ).searchable({
        striped: true,
        oddRow: { 'background-color': '#f5f5f5' },
        evenRow: { 'background-color': '#fff' },
        searchType: 'fuzzy'
    });
    
    $( '#searchable-container' ).searchable({
        searchField: '#container-search',
        selector: '.row',
        childSelector: '.col-xs-4',
        show: function( elem ) {
            elem.slideDown(100);
        },
        hide: function( elem ) {
            elem.slideUp( 100 );
        }
    })
});