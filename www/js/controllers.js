var appControllers = angular.module('controllers', []);

appControllers.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.nome = "Vinicio Miranda Covalski";

    $scope.VerificarUsuario = function () {


        var storage = window.localStorage;
        var usuario_autenticacao = [];
        console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        console.log("Carregado", tab_usuarios);
        console.log("Carregado", cont);

        var usuario_autenticacao = cont.usuario_email;
        $scope.usuario_autenticacao = usuario_autenticacao;

    }


}]);

appControllers.controller('CadNovCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.cadastrar = function () {

        var storage = window.localStorage;


        var cont = 0;
        var nome = [];
        var data_nasc = [];
        var telefone = [];
        var email = [];
        var senha = [];
        var checkbox = [];

        var id = [];

        

        var testes = JSON.parse(storage.getItem('cadastro_clientes') || length);
        console.log("testes", testes);

        var cont = testes.length;


        if (cont == null) {

            cont = 0;

        }

        nome[cont] = $scope.nome;
        data_nasc[cont] = $scope.data_nasc;
        telefone[cont] = $scope.telefone;
        email[cont] = $scope.email;
        senha[cont] = $scope.senha;
        checkbox[cont] = $scope.checkbox;
        id[cont] = cont + 1;


        console.log("Enviando para o localStorage", nome[cont], data_nasc[cont])

        var cadastro_clientes = JSON.parse(storage.getItem('cadastro_clientes') || '[]');
        cadastro_clientes.push({
            nome: nome[cont],
            data_nasc: data_nasc[cont],
            telefone: telefone[cont],
            email: email[cont],
            senha: senha[cont],
            checkbox: checkbox[cont],
            id: id[cont],

        });

        storage.setItem("cadastro_clientes", JSON.stringify(cadastro_clientes));

        console.log(cadastro_clientes);
        console.log("INSERINDO NO LOCALSTORAGE");

        window.location.href = "#!clientes";
        confirm("Cadastro realizado com sucesso");


    }

    $scope.cancelar = function () {
        $scope.nome = "";
        $scope.data_nasc = "";
        $scope.telefone = "";
        $scope.email = "";
        $scope.senha = "";
        $scope.checkbox = "off";


        window.location.href = "#!clientes";


    }



}]);

appControllers.controller('LoginCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.validar = function () {

        var storage = window.localStorage;

        var id = [];
        var id_usuario = 0;


        var cadastro_clientes = JSON.parse(storage.getItem('cadastro_clientes') || '[]');


        var usuario_encontrado = -1;


        for (i = 0; i < cadastro_clientes.length; i++) {
            console.log("Usuario localStorage", cadastro_clientes[i].email, $scope.email);
            console.log("Senha localStorage", cadastro_clientes[i].senha, $scope.senha);
            //console.log(cadastro_clientes[i].nome);

            if (cadastro_clientes[i].senha === $scope.email || cadastro_clientes[i].senha === $scope.senha) {
                console.log("cadastro realizado com sucesso");

                usuario_encontrado = 1;
                id_usuario = cadastro_clientes[i].id;
                usuario_email = cadastro_clientes[i].email;
                break
            } else {

                usuario_encontrado = 0;


            }
        }


        console.log("Saiu do for usuario encontrado", usuario_encontrado);

        id = id_usuario;


        if (usuario_encontrado == 1) {

            var data_login = new Date();


            var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
            tab_usuarios.push({
                usuario_email: usuario_email,
                id: id,
                data_login: data_login.toLocaleString(),

            });
            storage.setItem("tab_usuarios", JSON.stringify(tab_usuarios));

            window.location.href = "index.html";
            console.log("REDIRECIONANDO");

        } else {

            console.log("NÃO Redirecionar");
            var texto_aviso = "Seu usuário ou senha estão incorretos.";
            $scope.mensagem = texto_aviso;

        }

    }
}]);

appControllers.controller('ListCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.id = $scope.params;

    $scope.VerificarUsuario = function () {

        var storage = window.localStorage;
        var usuario_autenticacao = [];
        console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        console.log("Carregado", tab_usuarios);
        console.log("Carregado", cont);

        var usuario_autenticacao = cont.usuario_email;
        $scope.usuario_autenticacao = usuario_autenticacao;


    }

    $scope.Pesquisa = function () {

        var storage = window.localStorage;
        var cadastro_clientes = JSON.parse(storage.getItem('cadastro_clientes') || '[]');



        listascadastro = cadastro_clientes.map(function (item, indice) {
            return `<tr>
            <td>${item.nome}</td>
            <td>${item.telefone}</td>
            <td>${item.email}</td>
            <td><a href="/#!clientes/deletar/:id=${item.id}"  class="btn btn-danger">Apagar</a>
            <td><a href="/#!clientes/editar_clientes/:id=${item.id}" ng-click="Editar()" class="btn btn-success">Editar</a> 
         </td>
            </tr>`;
        });



        document.querySelector("#tbdetalhes tbody").innerHTML = listascadastro.join("");
        var pesquisa = "Pesquisa"
        console.log(pesquisa);

    }


}]);


appControllers.controller('EdtCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.VerificarInicial = function () {

        var storage = window.localStorage;
        var usuario_autenticacao = [];
        //  console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        //  console.log("Carregado", tab_usuarios);
        //  console.log("Carregado", cont);

        var usuario_autenticacao = cont.usuario_email;
        $scope.usuario_autenticacao = usuario_autenticacao;


    }

    $scope.VerificarUsuario = function () {

        var url = window.location.href;
        var res = url.split('=');
        var id = res[1];
        var usuario_encontrado = -1;
        var usuario_email = [];
        var nome = [];
        var data_nasc = [];
        var id_usuario = [];
        var telefone = [];
        var senha = [];
        var storage = window.localStorage;






        var cadastro_clientes = JSON.parse(storage.getItem('cadastro_clientes') || '[]');

        console.log("$scope.id", id);
        console.log("$scope.id", res[1]);
        console.log("cadastro_clientes edição", cadastro_clientes)

        for (i = 0; i < cadastro_clientes.length; i++) {
            console.log("Usuario localStorage", cadastro_clientes[i].id, id);

            //console.log(cadastro_clientes[i].nome);

            if (cadastro_clientes[i].id == id) {
                console.log("Encontrou o usuário");

                usuario_encontrado = 1;
                id_usuario = cadastro_clientes[i].id;
                nome = cadastro_clientes[i].nome;
                email = cadastro_clientes[i].email;
                telefone = cadastro_clientes[i].telefone;
                data_nasc = cadastro_clientes[i].data_nasc;
                senha = cadastro_clientes[i].senha;
                //     cadastro_clientes.splice[i].id;
                //      storage.setItem('cadastro_clientes',JSON.stringify(cadastro_clientes));



                break
            } else {

                usuario_encontrado = 0;


            }
        }

        console.log("Editar usuario_encontrado", usuario_encontrado);
        console.log("Editar id_usuario", id_usuario);
        console.log("Editar nome", nome);
        console.log("Editar usuario_email", email);
        console.log("Editar telefone", telefone);
        console.log("Editar data_nasc", data_nasc);
        console.log("Editar data_nasc", senha);
        console.log("Editar");
        //        cadastro_clientes_exclusão = JSON.stringify(cadastro_clientes[id_usuario]);
        $scope.nome = nome;
        $scope.data_nasc = data_nasc;
        $scope.telefone = telefone;
        $scope.email = email;
        $scope.senha = senha;




    }



    $scope.salvar = function () {



        var url = window.location.href;
        var res = url.split('=');
        var id = res[1];
        var usuario_encontrado = -1;
        var email = [];
        var nome = [];
        var data_nasc = [];
        var cont = 0;
        var telefone = [];
        var senha = [];




        var storage = window.localStorage;
       

        var cadastro_clientes = JSON.parse(storage.getItem('cadastro_clientes'));
        console.log("Editar 1",cadastro_clientes);

        var usuario = cadastro_clientes.find( usuario => usuario.id == id );
        console.log("usuario",usuario)

        usuario.nome = $scope.nome;
        usuario.data_nasc = $scope.data_nasc;
        usuario.telefone = $scope.telefone;
        usuario.email = $scope.email;
        usuario.senha = $scope.senha;

        storage.setItem(cadastro_clientes, JSON.stringify(usuario) );
     //   console.log("cadastro_clientes depois do stringify", JSON.stringify(lista_cadastro_clientes[cont]));



    }      
       


        
      
        







$scope.cancelar = function () {
    $scope.nome = "";
    $scope.data_nasc = "";
    $scope.telefone = "";
    $scope.email = "";
    $scope.senha = "";
    $scope.checkbox = "off";


    window.location.href = "#!clientes";


}

}]);

appControllers.controller('DeltCrtl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.deletar = function () {

        var url = window.location.href;
        var res = url.split('=');
        var id = res[1];
        var usuario_encontrado = -1;
        var usuario_email = [];
        var id_usuario = [];
        var storage = window.localStorage;
        var cadastro_clientes = JSON.parse(storage.getItem('cadastro_clientes') || '[]');

        console.log("$scope.id", id);
        console.log("$scope.id", res[1]);
        console.log("cadastro_clientes exclusão", cadastro_clientes)

        for (i = 0; i < cadastro_clientes.length; i++) {
            console.log("Usuario localStorage", cadastro_clientes[i].id, id);

            //console.log(cadastro_clientes[i].nome);

            if (cadastro_clientes[i].id == id) {
                console.log("Encontrou o usuário");

                usuario_encontrado = 1;
                id_usuario = cadastro_clientes[i].id;
                usuario_email = cadastro_clientes[i].email;
                //     cadastro_clientes.splice[i].id;
                //      storage.setItem('cadastro_clientes',JSON.stringify(cadastro_clientes));



                break
            } else {

                usuario_encontrado = 0;


            }
        }

        console.log("Del usuario_encontrado", usuario_encontrado);
        console.log("Del id_usuario", id_usuario);
        console.log("Del usuario_email", usuario_email);
        console.log("Deletar");
        cadastro_clientes_exclusão = JSON.stringify(cadastro_clientes[id_usuario]);

        cadastro_clientes.splice(cadastro_clientes, id_usuario);
        storage.setItem('cadastro_clientes', JSON.stringify(cadastro_clientes));

        console.log("cadastro_clientes");
        confirm("Deseja realmente realizar a exclusão?");
        window.location.href = "#!clientes";


    }


}]);


appControllers.controller('ImcCrtl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.VerificarUsuario = function () {
        console.log("passou pelo imc");

        var storage = window.localStorage;
        var usuario_autenticacao = [];
        console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        console.log("Carregado", tab_usuarios);
        console.log("Carregado", cont);

        var usuario_autenticacao = cont.usuario_email;
        console.log("usuario_autenticacao", usuario_autenticacao);
        $scope.usuario_autenticacao = usuario_autenticacao;


    }

    $scope.calcular = function () {


        console.log("passou pelo calcularimc");
        var id = [];
        var altura = []
        var peso = []
        var imc = []
        var cont = 0;
        var texto_classificacao = "";

        var storage = window.localStorage;
        var usuario_autenticacao = [];
        var usuario_id_auth = []
        console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        console.log("Carregado", tab_usuarios);
        console.log("Carregado", cont);

        var usuario_id_auth = cont.id
        var usuario_autenticacao = cont.usuario_email;
        console.log("usuario_autenticacao", usuario_autenticacao);
        console.log("usuario_id_auth", usuario_id_auth);


        calc_imc = $scope.peso / ($scope.altura * $scope.altura);


        if (calc_imc < 18.5) {
            texto_classificacao = "Abaixo do peso ";
        } else if (calc_imc < 24.9) {
            texto_classificacao = "Peso normal";
        } else if (calc_imc < 29.9) {
            texto_classificacao = "Pré-obesidade";
        } else if (calc_imc < 34.9) {
            texto_classificacao = "Obesidade Grau 1";

        } else if (calc_imc < 39.9) {
            texto_classificacao = "Obesidade Grau 2";
        } else if (calc_imc > 40.0) {
            texto_classificacao = "Obesidade Grau 4";
        }

        id[cont] = usuario_id_auth;
        altura[cont] = $scope.altura;
        peso[cont] = $scope.peso;
        imc[cont] = calc_imc;

        var texto_aviso = "O seu IMC é " + calc_imc + " e a sua classificação: " + texto_classificacao;
        console.log(texto_aviso);
        $scope.adicionar_texto = texto_aviso;

        var calculo_imc = JSON.parse(localStorage.getItem('calculo_imc') || '[]');

        var id_usuario = id[cont];
        var altura_imc = altura[cont];
        var peso_imc = peso[cont];
        var imc_resultado = imc[cont];
        var usuario_encontrado = 0;

        for (i = 0; i < calculo_imc.length; i++) {

            //console.log(cadastro_clientes[i].nome);

            if (calculo_imc[i].id === usuario_autenticacao) {
                console.log("cadastro realizado com sucesso");

                console.log("calculo_imc", calculo_imc[i].id);
                console.log("calculo_imc", usuario_autenticacao);
                usuario_encontrado = 1;
                id_usuario = calculo_imc[i].id;
                altura_imc = calculo_imc[i].altura
                peso_imc = calculo_imc[i].peso;
                imc_resultado = calculo_imc[i].imc;

                console.log("usuario_encontrado", usuario_encontrado);
                console.log("ID do usuário ", id_usuario);



                break

            } else if (calculo_imc[i].id == 0) {

                console.log("Não encontrado")

            }
        }

        console.log("O TESTE")
        console.log("id_usuario", id_usuario);
        console.log("altura_imc", altura_imc);
        console.log("peso_imc", peso_imc);
        console.log("imc_resultado,", imc_resultado);

        calculo_imc.push({
            altura: altura[cont],
            peso: peso[cont],
            imc: imc[cont],
            id: id[cont],

        });



        localStorage.setItem("calculo_imc", JSON.stringify(calculo_imc));





    }


}]);

appControllers.controller('ExerCrtl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.VerificarUsuario = function () {
        //    console.log("passou pelo exercicios");

        var storage = window.localStorage;
        var usuario_autenticacao = [];
        //       console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        //    console.log("Carregado", tab_usuarios);
        //     console.log("Carregado", cont);

        var usuario_autenticacao = cont.usuario_email;
        //   console.log("usuario_autenticacao", usuario_autenticacao);
        $scope.usuario_autenticacao = usuario_autenticacao;


    }


}]);

appControllers.controller('ExerACrtl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.VerificarUsuario = function () {
        console.log("passou pelo exercicios aerobico");

        var storage = window.localStorage;
        var usuario_autenticacao = [];
        console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        console.log("Carregado", tab_usuarios);
        console.log("Carregado", cont);

        var usuario_autenticacao = cont.usuario_email;
        console.log("usuario_autenticacao", usuario_autenticacao);
        $scope.usuario_autenticacao = usuario_autenticacao;


    }

    $scope.salvar = function () {

        var id = [];
        var storage = window.localStorage;
        var usuario_id_auth = [];
        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];
        var usuario_id_auth = cont.id;
        var calorias = [];
        var km = [];
        var t_gasto = [];
        var cod_aerobica = [];
        var nome_aerobica = [];


        console.log("km", km, "calorias", calorias, "t_gasto", t_gasto);

        var codaerobica = $('#aerobica option:selected').val();
        var nomeaerobica = $('#aerobica option').filter(':selected').text();



        console.log("usuario_id_auth", usuario_id_auth);

        id[cont] = usuario_id_auth;
        calorias[cont] = $scope.calorias;
        km[cont] = $scope.km;
        cod_aerobica[cont] = codaerobica;
        nome_aerobica[cont] = nomeaerobica;

        console.log("id[cont]", id[cont]);
        console.log("calorias[cont]", calorias[cont])
        console.log("km[cont]", km[cont])
        console.log("cod_aerobica[cont]", cod_aerobica[cont]);
        console.log("nome_aerobica[cont]", nome_aerobica[cont]);

        var data_atividade = new Date();

        var tab_exerc_aerobicos = JSON.parse(localStorage.getItem('tab_exerc_aerobicos') || '[]');


        tab_exerc_aerobicos.push({

            id: id[cont],
            calorias: calorias[cont],
            km: km[cont],
            cod_aerobica: cod_aerobica[cont],
            nome_aerobica: nome_aerobica[cont],
            data_atividade: data_atividade.toLocaleString(),

        });

        localStorage.setItem("tab_exerc_aerobicos", JSON.stringify(tab_exerc_aerobicos));

        alert("Atividade cadastrada com sucesso!");

        window.location.href = "#!exercicios_aerobicos";


    }


}]);

appControllers.controller('ExerMCrtl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.VerificarUsuario = function () {
        console.log("passou pelo exercicios musculação");

        var storage = window.localStorage;
        var usuario_autenticacao = [];
        console.log("Carregado");

        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];

        console.log("Carregado", tab_usuarios);
        console.log("Carregado", cont);

        var usuario_autenticacao = cont.usuario_email;
        console.log("usuario_autenticacao", usuario_autenticacao);
        $scope.usuario_autenticacao = usuario_autenticacao;


    }


    $scope.salvar = function () {


        var id = [];
        var storage = window.localStorage;
        var usuario_id_auth = [];
        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];
        var usuario_id_auth = cont.id;
        var nome_grupo_treinos = [];
        var cod_grupo_treinos = [];
        var nome_grupo_series = [];
        var cod_grupo_series = [];
        var i_carga = [];
        var nome_exercicio = [];
        var cod_exercicio = [];
        var nome_grupo_treinos = [];
        var n_grupo_treinos = $('#g_treinos option:selected').text();
        var c_grupo_treinos = $('#g_treinos option:selected').val();
        var n_grupo_series = $('#g_series option:selected').text();
        var c_grupo_series = $('#g_series option:selected').val();
        var q_carga = $scope.carga;
        var n_exercicio = $('#g_exercicios option:selected').text();
        var c_exercicio = $('#g_exercicios option:selected').val();

        console.log("tab_usuarios", tab_usuarios);
        console.log("usuario_id_auth", usuario_id_auth)
        console.log("n_grupo_treinos", n_grupo_treinos);
        console.log("c_grupo_treinos", c_grupo_treinos);
        console.log("n_grupo_series", n_grupo_series);
        console.log("c_grupo_series", c_grupo_series);
        console.log("q_carga", q_carga);
        console.log("n_exercicio", n_exercicio);
        console.log("c_exercicio", c_exercicio);


        id[cont] = usuario_id_auth;
        nome_grupo_treinos[cont] = n_grupo_treinos;
        cod_grupo_treinos[cont] = c_grupo_treinos;
        nome_grupo_series[cont] = n_grupo_series;
        cod_grupo_series[cont] = c_grupo_series;
        i_carga[cont] = q_carga;
        nome_exercicio[cont] = n_exercicio;
        cod_exercicio[cont] = c_exercicio;

        var data_atividade = new Date();

        var tab_exerc_musculacao = JSON.parse(localStorage.getItem('tab_exerc_musculacao') || '[]');

        tab_exerc_musculacao.push({

            id: id[cont],
            nome_grupo_treinos: nome_grupo_treinos[cont],
            cod_grupo_treinos: cod_grupo_treinos[cont],
            nome_grupo_series: nome_grupo_series[cont],
            cod_grupo_series: cod_grupo_series[cont],
            i_carga: i_carga[cont],
            nome_exercicio: nome_exercicio[cont],
            cod_exercicio: cod_exercicio[cont],
            data_atividade: data_atividade.toLocaleString(),

        });


        localStorage.setItem("tab_exerc_musculacao", JSON.stringify(tab_exerc_musculacao));

        alert("Atividade cadastrada com sucesso!");

        window.location.href = "#!exercicios_musculacao";



    }


}]);

appControllers.controller('DetalhesCrtl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.CarregarUsuario = function () {


        var id = [];
        var usuario_id_auth = [];
        var altura = [];
        var peso = [];
        var imc = [];
        var usuario_autenticacao = [];
        var storage = window.localStorage;
        var tab_usuarios = JSON.parse(storage.getItem('tab_usuarios') || '[]');
        var cont = tab_usuarios[tab_usuarios.length - 1];
        var usuario_id_auth = cont.id;
        var nome = "";
        var email = "";
        var data_nasc = "";
        var calorias = [];
        var km = [];

        var nome_aerobica = [];
        var cadastro_clientes = JSON.parse(storage.getItem('cadastro_clientes') || '[]');
        var tab_exerc_aerobicos = JSON.parse(localStorage.getItem('tab_exerc_aerobicos') || '[]');
        var tab_exerc_musculacao = JSON.parse(localStorage.getItem('tab_exerc_musculacao') || '[]');
        var calculo_imc = JSON.parse(localStorage.getItem('calculo_imc') || '[]');
        var id_usuario = []
        var altura_imc = [];
        var peso_imc = [];
        var imc_resultado = [];
        var usuario_encontrado = 0;
        var usuario_autenticacao = "";




        usuario_autenticacao = cont.usuario_email;
        $scope.usuario_autenticacao = usuario_autenticacao;

        id[cont] = usuario_id_auth;

        console.log("id[cont]", id[cont])

        console.log("calculo_imc", calculo_imc);
        console.log("tab_exerc_musculacao", tab_exerc_musculacao);
        console.log("tab_exerc_aerobicos", tab_exerc_aerobicos);
        console.log("cadastro_clientes", cadastro_clientes);

        id_usuario = id[cont];
        altura_imc = altura[cont];
        peso_imc = peso[cont];
        imc_resultado = imc[cont];
        usuario_encontrado = 0;

        for (i = 0; i < calculo_imc.length; i++) {

            //console.log(cadastro_clientes[i].nome);

            if (calculo_imc[i].id === usuario_id_auth) {
                console.log("cadastro realizado com sucesso");

                console.log("calculo_imc", calculo_imc[i].id);
                console.log("calculo_imc", usuario_id_auth);
                usuario_encontrado = 1;
                id_usuario = calculo_imc[i].id;
                altura_imc = calculo_imc[i].altura
                peso_imc = calculo_imc[i].peso;
                imc_resultado = calculo_imc[i].imc;

                console.log("imc_resultado", imc_resultado);
                console.log("peso_imc", peso_imc);
                console.log("altura_imc", altura_imc);
                console.log("usuario_encontrado", usuario_encontrado);
                console.log("ID do usuário ", id_usuario);



                break

            } else if (calculo_imc[i].id == 0) {

                console.log("Não encontrado")

            }

        }

        $scope.altura = "Altura :" + altura_imc;
        $scope.peso = "Peso :" + peso_imc;
        $scope.imc = "IMC : " + imc_resultado;


        for (i = 0; i < cadastro_clientes.length; i++) {
            console.log("Usuario localStorage", cadastro_clientes[i].id, usuario_id_auth);


            if (cadastro_clientes[i].id === usuario_id_auth) {
                console.log("cadastro encontrado");

                usuario_encontrado = 1;
                id_usuario = cadastro_clientes[i].id;
                nome = cadastro_clientes[i].nome;
                data_nasc = cadastro_clientes[i].data_nasc;
                email = cadastro_clientes[i].email;
                telefone = cadastro_clientes[i].telefone;

                console.log("id_usuario", id_usuario);
                console.log("data_nasc", data_nasc);
                console.log("usuario_email", email);
                console.log("telefone", telefone);
                console.log("nome", nome);




                break
            } else {

                usuario_encontrado = 0;


            }
        }

        $scope.nome = "Nome :" + nome;
        $scope.telefone = "Telefone :" + telefone;
        $scope.email = "E-mail :" + email;
        $scope.data_nascimento = "Data de Nascimento :" + data_nasc;


        /*    for (i = 0; i < tab_exerc_aerobicos.length; i++) {
                console.log("Usuario localStorage", tab_exerc_aerobicos[i].id, usuario_id_auth);
    
    
                if (tab_exerc_aerobicos[i].id === usuario_id_auth) {
                    console.log("cadastro encontrado");
    
                    usuario_encontrado = 1;
                    id_usuario = tab_exerc_aerobicos[i].id;
                    km = tab_exerc_aerobicos[i].km;
                    calorias = tab_exerc_aerobicos[i].calorias; 
                    nome_aerobica = tab_exerc_aerobicos[i].nome_aerobica;
                    data_atividade = tab_exerc_aerobicos[i].data_atividade;
    
    
              
    
                ;
    
        
                    
                } else {
    
                    usuario_encontrado = 0;
    
    
                }
            }*/


        /*      $scope.data_aerobico = data_atividade;
              $scope.exercicios_aerobicos = nome_aerobica;
              $scope.km = km ;
              $scope.calorias = calorias;
      */









        $scope.records = tab_exerc_aerobicos = JSON.parse(storage.getItem('tab_exerc_aerobicos') || '[]');
        $scope.meuObject = $scope.records;
        $scope.records2 = tab_exerc_musculacao = JSON.parse(storage.getItem('tab_exerc_musculacao') || '[]');
        $scope.meuObject2 = $scope.records2;

    }


}]);