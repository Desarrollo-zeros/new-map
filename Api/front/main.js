

function uploadFile(event){
	event.preventDefault();
	var formData = new FormData(document.getElementById("frm_ex"));
	$.ajax({
		beforeSend: function () {
             $("#mdl_upload").modal('show');
          },
          url: "../app_modules/maps/API/maps/upl_excel",
          type: "POST",
          data: formData,
          timeout: 30000,
          dataType: 'json',
          cache: false,
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false,
          success: function (data) { 
               //console.log('data',data);
               if(data.STATUS){
                  // $("#mdl_upload").modal('hide');
                   $("#dvExcel").html(`${data.MSG}`);
               }else{
               	//$("#mdl_upload").modal('hide');
                alert('Problemas al cargar los datos');
                $("#dvExcel").html(`${data.MSG}`);
               }

               setTimeout(function (){
                   api.post("getnoLoad",{ano_cargue : $("#anio").val()},function (response){
                       $("#mdl_upload").modal('hide');

                       $("#table-noload tbody").html("");

                       let table = '';



                       let index = 1;
                       response.forEach(x => {

                           table += `<tr>`;
                           table += `<td>${index}</td>`;
                           table += `<td>${x.dependencia}</td>`;
                           table += `<td>${x.codigo_proyecto_sap}</td>`;
                           table += `<td>${x.nombre_proyecto}</td>`;
                           table += `<td>${x.pais}</td>`;
                           table += `<td>${x.departamento}</td>`;
                           table += `<td>${x.municipio}</td>`;
                           table += `<td>${x.vr_ejecutivo}</td>`;
                           table += `<td>${x.cobertura}</td>`;
                           table += `<td>ERROR</td>`;
                           table += `</tr>`;
                           index++;
                       });


                       $("#table-noload tbody").html(table);

                       $('#table-noload').DataTable({
                           //rollY: false,
                           paging: false,
                           searching: true,
                           "language": {
                               "search": "Buscar:",
                               "info": "Paginas: _PAGE_ de _PAGES_",
                           },
                           "oLanguage": {
                               "sSearch": "Buscar:",
                               "sEmptyTable": "Tabla vacia",
                               "sInfoEmpty": "paginas : 1 de 1",
                               "sInfo": "Paginas: _PAGE_"
                           },
                           "ordering": true,
                           "info": true,
                           "colReorder": true,
                           dom: 'Bfrtip',
                           buttons: [
                               'excel'
                           ],
                           "bDestroy": true
                       });
                       $(".buttons-excel").addClass("btn btn-sm btn-success")

                   },function (err){
                       $("#mdl_upload").modal('hide');
                   });
               },2000);

          },
          error: function (data) { console.log(data); $("#mdl_upload").modal('hide'); }
    });   
}

// reender de años
function reenderComboBox(){
	 $.getJSON('params.json', function(jd) {
		var htm = `<option value=''>--seleccionar--</option>`;
		for (var i = jd.anio_init; i < (jd.anio_fin+1); i++) {
			htm+=`<option value='${i}'>${i}</option>`;
		}
		$("#anio").html(htm);
	 });
	// al cargar archivo
	 document.getElementById("estruct").addEventListener("change", () => {
                document.getElementById("estructlabel").innerHTML = document.getElementById("estruct").value.split("\\")[document.getElementById("estruct").value.split("\\").length - 1];
            })
}
