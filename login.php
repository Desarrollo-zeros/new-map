<?php
session_start();

if(isset($_SESSION["login"]) && $_SESSION["login"]["success"] == true){
    header('Location: index.html');
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Federación Nacional de Cafeteros</title>


    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="js/Api.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <style>
        /*
     * Specific styles of signin component
     */
        /*
         * General styles
         */
        body, html {
            height: 100%;
            background-repeat: no-repeat;
            background-color: #FFFFFF;
        }

        .card-container.card {
            max-width: 350px;
            padding: 40px 40px;
        }

        .btn {
            font-weight: 700;
            height: 36px;
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            cursor: default;
        }

        /*
         * Card component
         */
        .card {
            background-color: #F7F7F7;
            /* just in case there no content*/
            padding: 20px 25px 30px;
            margin: 0 auto 25px;
            margin-top: 50px;
            /* shadows and rounded borders */
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            border-radius: 2px;
            -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        }

        .profile-img-card {
            width: 96px;
            height: 96px;
            margin: 0 auto 10px;
            display: block;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            border-radius: 50%;
        }

        /*
         * Form styles
         */
        .profile-name-card {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin: 10px 0 0;
            min-height: 1em;
        }

        .reauth-email {
            display: block;
            color: #404040;
            line-height: 2;
            margin-bottom: 10px;
            font-size: 14px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .form-signin #inputEmail,
        .form-signin #inputPassword {
            direction: ltr;
            height: 44px;
            font-size: 16px;
        }

        .form-signin input[type=email],
        .form-signin input[type=password],
        .form-signin input[type=text],
        .form-signin button {
            width: 98%;
            display: block;
            margin-bottom: 10px;
            z-index: 1;
            position: relative;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .form-signin .form-control:focus {
            border-color: rgb(104, 145, 162);
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
        }

        .btn.btn-signin {
            /*background-color: #4d90fe; */
            background-color: rgb(104, 145, 162);
            /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
            padding: 0px;
            font-weight: 700;
            font-size: 14px;
            height: 36px;
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            border: none;
            -o-transition: all 0.218s;
            -moz-transition: all 0.218s;
            -webkit-transition: all 0.218s;
            transition: all 0.218s;
        }

        .btn.btn-signin:hover,
        .btn.btn-signin:active,
        .btn.btn-signin:focus {
            background-color: #a10f2a
        }

        .forgot-password {
            color: rgb(104, 145, 162);
        }

        .forgot-password:hover,
        .forgot-password:active,
        .forgot-password:focus{
            color: rgb(12, 97, 33);
        }


        .marca-logo {
            content: "";
            width: 100%;
            height: 11.35714rem;
            min-width: 12.42857rem;
            max-width: 16.42858rem;
            background: #a10f2a;
            display: block;
            position: absolute;
            -webkit-box-shadow: 0 0 1.42857rem #000;
            box-shadow: 0 0 1.42857rem #000;
            margin-top: -60px;
        }

    </style>

</head>
<body>








<div class="container"  id="containerId" style="padding-top: 5%;">
    <div class="card card-container">
        <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
        <p id="profile-name" class="profile-name-card"></p>
        <form class="form-signin" id="form-signin">
            <span id="reauth-email" class="reauth-email"></span>
            <input type="text" id="username" class="form-control" placeholder="Usuario" required autofocus>
            <input type="password" id="password" class="form-control" placeholder="Contraseña" required>
            <button class="btn btn-lg btn-primary btn-block btn-signin" id="btn-signin" type="submit">Iniciar Sesión</button>
        </form><!-- /form -->

    </div><!-- /card-container -->
</div><!-- /container -->

</body>

<script>
    $("#form-signin").on("submit",function (event){
        event.preventDefault();

        $("#mdl_upload").modal('show');

        $("#containerId").css({"padding-top": "22%"});

        api.post("login",{
            "username" : $("#username").val(),
            "password" : $("#password").val()
        },function (response){
            if(response.success){
                localStorage.success = true;

                var p = getUrlParams()
                let d = p['dpto'];
                if (d != null) {
                    window.location.href = "index.html?dpto="+d;
                }else{
                    window.location.href = "index.html";
                }
                
            }else{
                $("#btn-signin").notify("Usuario y/o Contraseña incorrecta","error");
            }
            setTimeout(function (){
                $("#mdl_upload").modal('hide');
            },500);
            $("#containerId").css({"padding-top": "8%"});
        },function (err){
            console.log(err);
            $("#btn-signin").notify("Usuario y/o Contraseña incorrecta","error");
            $("#mdl_upload").modal('hide');
        });

    });

    function getUrlParams() {
        var url = window.location.href;
        var params = {};
        url.substring(1).replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (str, key, value) {
                params[key] = value;
            });
        return params;
    }

</script>

<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script src="js/notify.min.js"></script>

<!-- Modal -->
<div class="modal fade" id="mdl_upload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="position: absolute;
    top: 150px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body" align="center">
                <img src="loading.gif">
                Cargando...
            </div>
        </div>
    </div>
</div>

</html>




<!------ Include the above in your HEAD tag ---------->

<!--
    you can substitue the span of reauth email for a input with the email and
    include the remember me checkbox
    -->
