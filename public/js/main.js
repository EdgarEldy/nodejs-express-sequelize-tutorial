// Get products related to a category using ajax get request
$(function () {
    $('#cat_id').on('change', function () {
        var cat_id = $(this).val();
        $.ajax({
            type: 'GET',
            async: true,
            url: '/orders/getProducts/' + cat_id,
            data: {
                cat_id: cat_id
            },
            success: function (data) {
                $('#product_id').empty();
                $.each(data, function (index, row) {
                    $('#product_id').append("<option value='" + row.id + "'>" + row.product_name + "</option>")
                });
            }
        });
    });
});

// Get unit price by product id using ajax get request
$(function () {
    $('#product_id').on('change', function () {
        var product_id = $(this).val();
        $.ajax({
            type: 'GET',
            async: true,
            url: '/orders/getUnitPrice/' + product_id,
            data: {
                product_id: product_id
            },
            success: function (data) {
                $('.unit-price').val(data.unit_price);
            }
        });
    });
});

//Calculate the total
$(function () {
    $('#qty').on('keyup', function () {
        var qty = $(this).val();
        var unit_price = $('.unit-price').val();
        var total = qty * unit_price;
        $('#total').val(total);
    });
});