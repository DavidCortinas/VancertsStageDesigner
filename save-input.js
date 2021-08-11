$('#saveInputList').click(function() {

    // Code form KonvaJS wiki
    var list = new jsPDF();

    var img = new Image();

    img.src = 'input_list_for_image-page-001.jpg'
    list.addImage(img, 'JPEG', 0, 15, 209.55, 270.933333333)

    list.addImage(
        stage.toDataURL({ pixelRatio: 2 }),
        // 0, 0, 600, 350
        -20,
        0,
        250,
        104.17,
        // stage.width(),
        // stage.height(),
    );

    // var img = new Image();

    // img.src = 'input_list_for_image-page-001.jpg'
    // list.addImage(img, 'JPEG', 0, 0, 209.55, 270.933333333)

    var band = $('#bandname').val();
    var venue = $('#venue').val();
    var date = $('#showdate').val();
    var input1 = $('#input1').val();
    var input2 = $('#input2').val();
    var input3 = $('#input3').val();
    var input4 = $('#input4').val();
    var input5 = $('#input5').val();
    var input6 = $('#input6').val();
    var input7 = $('#input7').val();
    var input8 = $('#input8').val();
    var input9 = $('#input9').val();
    var input10 = $('#input10').val();
    var input11 = $('#input11').val();
    var input12 = $('#input12').val();
    var input13 = $('#input13').val();
    var input14 = $('#input14').val();
    var input15 = $('#input15').val();
    var input16 = $('#input16').val();

    list.text(38, 120, band);
    list.text(38, 129, venue);
    list.text(38, 138, date);
    list.text(38, 147, input1);
    list.text(38, 156, input2);
    list.text(38, 165, input3);
    list.text(38, 174, input4);
    list.text(38, 182.5, input5);
    list.text(38, 191.5, input6);
    list.text(38, 200, input7);
    list.text(38, 208.5, input8);
    list.text(38, 217, input9);
    list.text(38, 227, input10);
    list.text(38, 235.5, input11);
    list.text(38, 245, input12);
    list.text(38, 253, input13);
    list.text(38, 262, input14);
    list.text(38, 270.5, input15);
    list.text(38, 279.5, input16);

    list.save('input-list.pdf');

    // var stage_list = list.output('blob');
    // var data = new FormData();
    // data.append('data', stage_list);

    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //         if (this.status !== 200) {
    //             // handle error
    //         }
    //     }
    // }

    // xhr.open('POST', 'upload.php', true);
    // xhr.send(data);

    // $.ajax()

});