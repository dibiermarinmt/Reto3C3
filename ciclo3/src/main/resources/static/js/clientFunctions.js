var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editar(){

    var elemento={
        idClient:idCarga,
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val()
          
    };
    
    var dataToSend=JSON.stringify(elemento);
    console.log("datos para enviar:");
    console.log(dataToSend);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Client/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            consultar();
            idCarga=null;
        }
    });
}

function eliminar(idElemento){
    var elemento={
        "idClient":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:8080/api/Client/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultar();
        }
    });
}





function cargar(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Client/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);

                var misItems=json.items;
  
          $("#name").val(json.name);
          $("#email").val(json.email);
          $("#age").val(json.age);
          $("#password").val(json.password);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
  
  
        }
    });
}

//////------------------


function consultar(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){
    let myTable="<table border='1'>";
    for(i=0; i<respuesta.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td><button onclick='eliminar("+respuesta[i].idClient+")'>Borrar</button></td>";
        myTable+="<td><button onclick='cargar("+respuesta[i].idClient+")'>Cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultados").html(myTable);
}

function guardar(){
    let var2 = {
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val()
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:8080/api/Client/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormulario();
            consultar();
        },
        error:function(jqXHR, textStatus, errorTrown){
            window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormulario(){
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
    $("#password").val("");
}