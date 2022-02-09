## EQUIPE ESPECTRO #
- Produto: Espectro* (nome temporário);
- Versão do produto: 0.2;
- Responsáveis: Isadora Bruno Leite, Georgia Rebeka da Silva,
Bernardo Castro Diniz, Jean Carlos Martins e Paloma Bizze;
- Cliente: Associação Fortaleza Azul;

A aplicação feita em parceria com a Associação Fortaleza Azul, idealizadora inicial do projeto, será usada por pessoas com TEA e pelos pais e/ou
responsáveis de pessoas com TEA para o monitoramento e controle da rotina diária
a fim de auxiliar na organização pessoal para evitar a quebra da rotina.


### Mapeamento de Funcionalidades

| Código  | Funcionalidade  | Situação |  Codigo/Arquivo|
| :------------ |:---------------:| :-----:| --------:|
| RF_B001      | Cadastrar Usuário | Desenvolvido| Funções app.get('/cadastro') e app.post('/cadastro) no arquivo index.js  |
| RF_B002     | Autenticar Usuário       | Desenvolvido |function initialize(passport, getUserByEmail, getUserById) no arquivo passport-config.js |
| RF_B003  | Fazer Login       |    Desenvolvido |função passport.authenticate('local', {successRedirect: '/inicio'...} no arquivo index.js|
| RF_B003.1     | Recuperar Senha | Desenvolvido| Arquivo recover.ejs na pasta views |
| RF_B004     | Fazer Logout       |   Desenvolvido | Botão com link de redirecionamento /sessionLogout e função app.get('/sessionLogout') no arquivo index.js   |
| RF_B005  | Mostrar Tela Home       |    Desenvolvido|rota app.get('/inicio') no arquivo index.js |
| RF_B005.1     | Adicionar Atividade  | Desenvolvido|botão de classe addTarefa no arquivo listaTarefas.ejs e ação de adicionar tarefa na function adicionaTarefa no arquivo script.js|
| RF_B005.2     | Remover Atividade       |   Desenvolvido|  Função appg.get('/removeTarefa') no arquivo index.js e botão do tipo button com link de redirecionamento para /removeTarefa no arquivo listaTarefas.ejs na pasta partes    |
| RF_B006 | Mostrar tela Perfil do Usuário       |    Suspenso | 
| RF_B006.1     | Adicionar Nome de exibição      |   Desenvolvido | Nome adicionado no cadastro é exibido na tela inicial através do requerimento name: req.user.name na rota app.get('/inicio') e exibido na pagina inicio.ejs com o codigo Perfil de <%= name%> |
| RF_B006.2  | Adicionar Avatar       |    Suspenso |   |
| RFE_001  | Mostrar Calendário       |    Desenvolvido | Arquivo calendar.js na pasta js e arquivo calendario.ejs na pasta partes  |


### Download do executável da Versão 0.2 disponivel aqui
[Windows](https://drive.google.com/file/d/1xmq5NTEs6BIaV2B31DzNkkyka6WpIOXn/view?usp=sharing"Windows")

[MacOS](https://drive.google.com/file/d/1xlLzH_Furuog0mBhvVtylXW3-HYNKGlv/view?usp=sharing"MacOS")
