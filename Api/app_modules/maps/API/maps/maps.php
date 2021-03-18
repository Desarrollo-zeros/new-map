<?php
        session_start();
     /*
	    Controlador WEB SERVICES CREADO POR
	    Steven Moreno Correa
	    @StevenMorenoCr
	    2016-05-16
	  */
	  header('Access-Control-Allow-Origin: *');
	   header("Access-Control-Allow-Headers: *");
	  header('Content-Type: application/json');

	  include '../../ModelEntities/Maps.class.php';
	  include '../../../../Core/Config.php';


	  $obj = new Maps();
	  $utils = new Utils();
	  # si enbl_sql -> habilita debug de sql
	  $debug = array(
	    'enb_jwt'=>false,
	    'enb_sql'=>false,
	    'dbg_name'=>'Maps'
	  );

      # arreglo que representa la respuesta standard a devolver
	  # para cualquier consulta
	  #->'STATUS'=>VERIFICA SI LA RESPUESTA FUE VALIDA
	  #->'RSP'=> LOS DATOS A RESPONDER PARA SER MANEJADOS POR EL CLIENTE
	  #->'MSG'=> EL MENSAJE QUE SE LE VISUALIZARA AL USUARIO
	  #->'DEBUG'=> EN EL CASO QUE PARA EFECTOS DE TRACE BUG SE NECESITE SQL, INPUTS
	  #->'DISTRUST'=> EN EL CASO QUE EL TOKEN NO COINCIDA DESCONFIANZA
	  #->'KEY'=> TOKEN NUEVO DE SEGURIDAD QUE SE ENVIA AL CLIENTE
	  $RSP_REST = array(
	    'STATUS'=>true,
	    'RSP'=>array(),
	    'MSG'=>'',
	    'DEBUG'=>array(),
	    'DISTRUST'=>array(),
	    'KEY'=>''
	  );

	  /**Arreglo para el registro de los metodos**/
	  $metodos = array(
	                     'upl_excel'=>"UploadXlsxMapsAsync",
                         'get_data_nfc' => 'GetDataNfc',
                          'login' => 'login'
	                  );


	  #@Path('maps/upl_excel')
	# Load data
	function UploadXlsxMapsAsync(){
             global $obj, $RSP_REST, $CONFIG;
		     $file = isset($_FILES['estruct']) ? $_FILES['estruct'] : array();
		     $msg = "Registros insertados ";
		     #$header = apache_request_headers(); $header['Authorization']
		     $resultados = $obj->UploadXlsxMaps($file,$_REQUEST['anio']);
		     $RSP_REST['STATUS'] = $resultados;
			 $RSP_REST['RSP']= array();
             # respuesta de reender log
			 if($resultados):
			 	$list = $obj->GetRowsAffeted();
			 	foreach ($list as $k => $count) {
			 	    $msg .= "$k : $count,";
			 	}
			 endif;
			 $RSP_REST['MSG'] = ($resultados) ? $msg : $obj->GetError();

			 return $RSP_REST;
	}


     function encryptAccount($username, $password)
    {
        if(!is_string($username)) { $username = ""; }
        if(!is_string($password)) { $password = ""; }
        $sha_pass_hash = sha1(strtoupper($username).':'.strtoupper($password));

        return strtoupper($sha_pass_hash);
    }

    #@Path('maps/login')
    # Load login
	function login(){
        $usuario = $_POST["username"];
        $password = $_POST["password"];

        $u = "mapasfnc";
        $p = "@dm1nM4p4s";

        $result = [
            "success" => false,
        ];

        if("D78FAB4CF8E2EFDE636A7A8216945C306B82E87F" == encryptAccount($usuario,$password)){
            $result = [
              "success" => true,
            ];
        }
        $_SESSION["login"] = $result;
        return $result;
    }

    #@Path('maps/get_data_nfc')
    # Load data
	function GetDataNfc(){
        global $obj, $RSP_REST, $CONFIG;
        $dpto ="";
        $municipio ="";
        $dependencia_id = 0;
        $type = $_POST["type"];
        if(isset($_POST["dpto"])){
            $dpto = $_POST["dpto"];
        }

        if(isset($_POST["municipio"])){
            $municipio = $_POST["municipio"];
        }

        if(isset($_POST["dependencia_id"])){
            $dependencia_id = $_POST["dependencia_id"];
        }

        $table = $_POST["table"];



        $result = [];


        switch ( $type){
            //inversion
            case 0:{
                if(empty($dpto)){
                    $result =  $obj->conn->get_result_from_query("select * from ".$table." where ano_carge = '".$_POST["anio"]."' ");
                }else if(empty($municipio)){
                    $table = $table."_dpta";
                    $result =  $obj->conn->get_result_from_query("select * from $table where ano_carge = ".$_POST["anio"]." and lower(dpto) =  '".strtolower($dpto)."' ");

                }else{
                    $table = $table."_dpta_municipio";
                    $result =  $obj->conn->get_result_from_query("select * from $table where ano_carge = ".$_POST["anio"]." and lower(dpto) =  '".strtolower($dpto)."' and  lower(municipio) = '".strtolower($municipio)."'");

                }
                break;
            }
            case 1:{
                if(empty($dpto)){
                    $result =  $obj->conn->get_result_from_query("select * from ".$table." where ano_carge = '".$_POST["anio"]."' ")[0];
                }else if(empty($municipio)){
                    $table = $table."_dpta";
                    $result =  $obj->conn->get_result_from_query("select * from $table where ano_carge = ".$_POST["anio"]." and lower(dpto) =  '".strtolower($dpto)."' ")[0];
                }else{
                    $table = $table."_dpta_municipio";
                    $result =  $obj->conn->get_result_from_query("select * from $table where ano_carge = ".$_POST["anio"]." and lower(dpto) =  '".strtolower($dpto)."' and  lower(municipio) = '".strtolower($municipio)."' ")[0];
                }
                break;
            }
            case 2:{
                if(empty($dpto)) {
                    $vectores = $obj->conn->get_result_from_query("select * from vectores where ano_carge = '".$_POST["anio"]."' ");
                    $proyectos = $obj->conn->get_result_from_query("select * from view_proyecto where ano_carge = '".$_POST["anio"]."'");
                    $result = ["vectores" => $vectores, "proyectos" => $proyectos];
                }else if(empty($municipio)){
                    $vectores = $obj->conn->get_result_from_query("select * from vectores_dpta where ano_carge = '".$_POST["anio"]."' and lower(dpto) =  '".strtolower($dpto)."' ");
                    $proyectos = $obj->conn->get_result_from_query("select * from view_proyecto_dpta where ano_carge = '".$_POST["anio"]."' and lower(dpto) =  '".strtolower($dpto)."' ");
                    $result = ["vectores" => $vectores, "proyectos" => $proyectos];
                }else{
                    $vectores = $obj->conn->get_result_from_query("select * from vectores_dpta_municipio where ano_carge = '".$_POST["anio"]."' and lower(dpto) =  '".strtolower($dpto)."' and  lower(municipio) = '".strtolower($municipio)."' ");
                    $proyectos = $obj->conn->get_result_from_query("select * from view_proyecto_dpta_municipio where ano_carge = '".$_POST["anio"]."' and lower(dpto) =  '".strtolower($dpto)."' and lower(municipio) = '".strtolower($municipio)."' ");
                    $result = ["vectores" => $vectores, "proyectos" => $proyectos];
                }
                break;
            }
            case 5:
            case 3:{
                $result =  $obj->conn->get_result_from_query("select * from ".$table." ");
                break;
            }
            case 4:{
                $result =  $obj->conn->get_result_from_query("select * from ".$table." where ano_carge = '".$_POST["anio"]."' and lower(dpto) = '".strtolower($dpto)."'  and lower(municipio) = '".strtolower($municipio)."' ");
                break;
            }
            case 6:{
                $result =  $obj->conn->get_result_from_query("select * from ".$table." where ano_carge = '".$_POST["anio"]."' and lower(dpto) = '".strtolower($dpto)."'");
                break;
            }
            case 7:{
                $result =  $obj->conn->get_result_from_query("select * from ".$table." where ano_carge = '".$_POST["anio"]."' and lower(dependencia_id) = '".strtolower($dependencia_id)."'");
                break;
            }

        }

        return $result;


    }

		#Execute -----------------------------------------------------------------------------------------
	  /**Recibe las peticiones y ejecuta el metodo respectivo solicitado**/
	  if(array_key_exists($_GET['solicitud'],$metodos))
	  {
	    #// valida si esta habilitado la verificacion del token
	    # si todo es correcto permite la consulta al api
	    # devuelve el status un boolean y tambien el nuevo token
	    if($debug['enb_jwt']):
	      $header = apache_request_headers();
		  if(isset($header['Authorization']))
		  {
	        $access = $obj->verifyToken($header['Authorization']);
	        $RSP_REST['DISTRUST'] = $access;
	        //$RSP_REST['KEY'] = $header['Authorization'];
	      }
	    endif;
        // si esta habilitado el jwt 
        if($debug['enb_jwt']){
        	// Si el toquen no es correcto ingresa en este if && $RSP_REST['DISTRUST']['vld_tk'] == null
        	if( !isset($RSP_REST['DISTRUST']['vld_tk']) )
        	{
             $RSP_REST['STATUS']= false;
             //$RSP_REST['DISTRUST'] = null;    
        	}else{
              $mt = $metodos[$_GET['solicitud']];
              $RSP_REST['DISTRUST'] = array();
        	}

        }else{
        	#obtiene el metodo solicitado
	        $mt = $metodos[$_GET['solicitud']];
        }
	    
	    # si esta habilitado la opcion de debug de sql y variables de entrada
	    # ejecuta la siguiente sentencia
	    if($debug['enb_sql']):
	      $RSP_REST['DEBUG'] = array('INPUTS'=>$_POST,'QUERYS'=>$obj);
	    endif;
	    # en el caso de que el token no sea valido no hay retorno de data valida
	   	$resultados = ($RSP_REST['STATUS']) ? $mt() : $RSP_REST;
	  }
	  else
	  {
	    header('HTTP/1.1 405 Method Not Allowed');
	   	exit;
	  }

	  echo json_encode($resultados);

?>