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