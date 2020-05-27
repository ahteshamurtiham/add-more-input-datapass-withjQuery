**********************************html*****************
 <div class="card-body">
                            <form action="{{ route('purchase.post') }}" method="POST" id="myform">
                                @csrf

                                <table class="table table-bordered" width="100%">
                                    <thead class="table-sm table-bordered">
                                        <tr class="table table-primary">
                                            <th>Category</th>
                                            <th>Product Name</th>
                                            <th width="7%">Pcs/Kg</th>
                                            <th width="10%">Unit price</th>
                                            <th>Description</th>
                                            <th  style=" " >Total Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="addRow" class="addRow" >

                                    </tbody>
                                    <tbody>
                                        <tr >
                                            <td></td>
                                            <td ></td>
                                            <td ></td>
                                            <td ></td>
                                            <td ></td>
                                            <td >
                                                <input  type="text" name="estimated_amount" value="0" id="estimated_amount" class="from-control from-control-sm text-right estimated_amount" readonly style="background-color:#d8fdba; width: 130px; ">
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>

                                </table>
                                <br>
                                <button type="submit" class="btn btn-outline-primary" id="storeButton">Purchase Store</button>
                            </form>
                        </div>


//*****************handlebars js cdn link nd set master*********
 <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js"></script>

******************add_purchase page er niche script*********
  {{--  je part ta add hbe add more e click korle  --}}
 <script id="document-template" type="text/x-handlebars-template">
    <tr class="delete_add_more_item col-lg-10" id="delete_add_more_item" >
    {{--  ei field gola ami hidden kore niye jabo controller e bt show korabona add page er niche  --}}
        <input type="hidden" name="date[]" value="@{{ date }}">
        <input type="hidden" name="purchase_no[]" value="@{{ purchase_no }}">
        <input type="hidden" name="supplier_id[]" value="@{{ supplier_id }}">
        {{--  ei field gola ami hidden kore niye o jabo controller e  show korabo add page er niche  --}}
        {{--  r 7 ta td add hbe upore tbody te jeheto 7 ta th niyesi  --}}
        <td>
            <input type="hidden" name="category_id[]" value="@{{ category_id }}">
            @{{ category_name }}
        </td>
        <td>
            <input type="hidden" name="product_id[]" value="@{{ product_id }}">
            @{{ product_name }}
        </td>
        <td>
            <input style="width: 130px" type="number" min="1" class="from-control form-control-sm text-right buying_qty" name="buying_qty[]" value="1">

        </td>
        <td>
            <input style="width: 130px" type="number"  class="from-control form-control-sm text-right unit_price" name="unit_price[]" value="">

        </td>
        <td>
            <input style="width: 130px; text-align:center;" type="text"  class="from-control form-control-sm " name="description[]" >

        </td>
        <td>
            <input style="width: 130px"  class="from-control form-control-sm text-right buying_price" name="buying_price[]" value="0" readonly>

        </td>
        <td style="width: 10%"><i class="btn btn-danger btn-sm fa fa-window-close removeeventmore"></i></td>

    </tr>

 </script>

  {{--  uporer script ta jetar madhome add hbe   --}}
  <script >

    $(document).ready(function(){
        $(document).on("click",".addeventmore",function(){

           {{--  prottekta field er id dhore tar input valuue ta ekta varieble a nilam  --}}
            var date = $('#date').val();
            var purchase_no = $('#purchase_no').val();
            var supplier_id = $('#supplier_id').val();
            var category_id = $('#category_id').val();
            var category_name = $('#category_id').find('option:selected').text();
            var product_id = $('#product_id').val();
            var product_name = $('#product_id').find('option:selected').text();

         {{--  kono field faka rakha jabena faka rekhe add tem e click korle validation error dekhabe  --}}
            if(date==''){
                $.notify("Date is required",{globalPosition:'top right',className: 'error'});
                return false;
            }
            if(purchase_no==''){
                $.notify("Purchase no is required",{globalPosition:'top right',className: 'error'});
                return false;
            }
            if(supplier_id==''){
                $.notify("Supplier  is required",{globalPosition:'top right',className: 'error'});
                return false;
            }
            if(category_id==''){
                $.notify("Category  is required",{globalPosition:'top right',className: 'error'});
                return false;
            }

            if(product_id==''){
                $.notify("Product  is required",{globalPosition:'top right',className: 'error'});
                return false;
            }

        {{--  uporer scripta holo source tar id dilam  --}}
            var source= $("#document-template").html();
            var template = Handlebars.compile(source);
 {{--  upore input value gola j varible nilam shb variable hbe r tar shate same r ekta varble die controller a pthabe  --}}
            var data = {
                  date:date,
                  purchase_no:purchase_no,
                  supplier_id:supplier_id,
                  category_id:category_id,
                  category_name:category_name,
                  product_id:product_id,
                  product_name:product_name,

            };
            var html = template(data);
            $('#addRow').append(html);

        });
    {{--  remove class td ta die j kaj ta mane rmv clik korle remove hbe   --}}
         $(document).on("click",".removeeventmore",function(event){
             $(this).closest(".delete_add_more_item").remove();
             totalAmountPrice();
         });

        {{--  total price math   --}}
         $(document).on('keyup click','.unit_price,.buying_qty',function(){
             var unit_price = $(this).closest("tr").find("input.unit_price").val();
             var qty = $(this).closest("tr").find("input.buying_qty").val();
             var total = unit_price * qty;

             $(this).closest("tr").find("input.buying_price").val(total);
             totalAmountPrice();
         });

         function totalAmountPrice(){
             var sum=0;
             $(".buying_price").each(function(){
                 var value = $(this).val();
                 if(!isNaN(value) && value.length !=0){
                     sum += parseFloat(value);
                 }
             });
             $('#estimated_amount').val(sum);
         }
    });
  </script>