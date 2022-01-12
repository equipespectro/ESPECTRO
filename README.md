## EQUIPE ESPECTRO #
- Produto: Espectro* (nome temporário);
- Versão do produto: 0.2;
- Responsáveis: Isadora Bruno Leite, Georgia Rebeka da Silva,
Bernardo Castro Diniz;
- Cliente: Associação Fortaleza Azul;

A aplicação será feita em parceria com a Associação Fortaleza Azul, que foi a
idealizadora inicial do projeto, será usada por pessoas com TEA e pelos pais e/ou
responsáveis de pessoas com TEA para o monitoramento e controle da rotina diária
a fim de auxiliar na organização pessoal para evitar a quebra da rotina.


### Mapeamento de Funcionalidades

| Código  | Funcionalidade  | Situação |  Codigo/Arquivo|
| :------------ |:---------------:| :-----:| --------:|
| RF_B001      | Cadastrar Usuário | Desenvolvido|funções app.get('/cadastro') e app.post('/cadastro) no arquivo index.js  |
| RF_B002     | Autenticar Usuário       | Desenvolvido |function initialize(passport, getUserByEmail, getUserById) no arquivo passport-config.js |
| RF_B003  | Fazer Login       |    Desenvolvido |função passport.authenticate('local', {successRedirect: '/inicio'...} no arquivo index.js|
| RF_B003.1     | Recuperar Senha | Não Iniciado|    |
| RF_B004     | Fazer Logout       |   Não Iniciado |    |
| RF_B005  | Mostrar Tela Home       |    Desenvolvido|rota app.get('/inicio') no arquivo index.js |
| RF_B005.1     | Adicionar Atividade  | Desenvolvido|botão de classe addTarefa no arquivo listaTarefas.ejs e ação de adicionar tarefa na function adicionaTarefa no arquivo script.js|
| RF_B005.2     | Remover Atividade       |   Em desenvolvimento|      |
| RF_B006 | Mostrar tela Perfil do Usuário       |    Em desenvolvimento | tela de inicio (inicio.ejs) mostrada atraves da rota app.get('/inicio') e pelo arquivo layout.ejs
| RF_B006.1     | Adicionar Nome de exibição      |   Desenvolvido | Nome adicionado no cadastro é exibido na tela inicial através do requerimento name: req.user.name na rota app.get('/inicio') e exibido na pagina inicio.ejs com o codigo Perfil de <%= name%> |
| RF_B006.2  | Adicionar Avatar       |    Não Iniciado |   |

### Download do executável da Versão 0.2 disponivel aqui
-[Windows](https://drive.google.com/file/d/1xmq5NTEs6BIaV2B31DzNkkyka6WpIOXn/view?usp=sharing"Windows")**
-[MacOS](https://drive.google.com/file/d/1xlLzH_Furuog0mBhvVtylXW3-HYNKGlv/view?usp=sharing"MacOS")**
