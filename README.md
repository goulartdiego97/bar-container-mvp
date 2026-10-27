Nome completo.

Curso universitário.

Atlética.

Matrícula universitária.

Os resultados são atualizados conforme o usuário digita, facilitando a localização dos registros.

3. Visualização de perfil

Ao selecionar um resultado da busca, é possível visualizar o perfil do usuário e consultar suas informações cadastradas.

4. Edição de cadastro

O sistema permite atualizar as informações de um cadastro existente, incluindo nome, curso, atlética, matrícula e foto de perfil.

Após salvar as alterações, os dados atualizados são exibidos no perfil.

5. Exclusão de cadastro

Também é possível excluir um registro existente. Antes da exclusão, o sistema solicita uma confirmação para evitar remoções acidentais.

Atenção: nesta versão, a exclusão não pode ser desfeita.

Interface e navegação

A interface utiliza a identidade visual do Bar Container, com predominância de azul-escuro, elementos em azul e cartões de informações.

O sistema está organizado em três áreas principais:

Início: formulário para criação de cadastros.

Busca: pesquisa e listagem dos usuários registrados.

Perfil: visualização, edição e exclusão de cadastros.

O layout é responsivo e foi pensado para proporcionar uma experiência de uso adequada em diferentes tamanhos de tela.

Tecnologias utilizadas

O MVP foi desenvolvido utilizando tecnologias web básicas:

HTML5: estrutura das páginas e dos formulários.

CSS3: identidade visual, estilização e responsividade.

JavaScript: validações, navegação, pesquisa e gerenciamento dos cadastros.

LocalStorage: armazenamento local das informações no navegador.

O projeto não exige instalação de dependências ou execução de um processo de compilação para funcionar.

Como executar o projeto

Faça o download ou clone este repositório.

Abra a pasta do projeto.

Execute o arquivo index.html em um navegador moderno, como Google Chrome ou Microsoft Edge.

Utilize as telas de cadastro, busca e perfil para testar as funcionalidades.

O sistema apresenta cadastros fictícios iniciais para demonstrar o funcionamento da pesquisa e da visualização dos perfis.

Armazenamento de dados

Nesta versão do MVP, os cadastros são armazenados no LocalStorage do navegador.

Isso significa que:

Os dados permanecem salvos no mesmo navegador após o fechamento da página.

Os registros não são compartilhados automaticamente entre diferentes dispositivos ou usuários.

Limpar os dados do navegador pode apagar os cadastros armazenados.

Não existe, nesta versão, um banco de dados remoto ou sincronização entre usuários.

Portanto, o armazenamento atual é destinado à validação inicial do sistema, não sendo adequado para uma operação compartilhada em produção.

Próximas etapas

As próximas evoluções previstas para o projeto incluem:

Integração com um banco de dados centralizado.

Implementação de autenticação e controle de acesso.

Armazenamento de fotos em serviço externo.

Sincronização dos cadastros entre dispositivos.

Aprimoramento das validações e da segurança.

Realização de testes com usuários da rede Bar Container.

Melhorias na interface a partir dos feedbacks recebidos.

Status do projeto

Em desenvolvimento — MVP para testes.

Este projeto tem como finalidade construir e validar uma solução de cadastro para a rede Bar Container, evoluindo gradualmente conforme as necessidades identificadas durante os testes.

Observação sobre privacidade

Não utilize dados pessoais reais de clientes durante os testes desta versão. O sistema ainda não possui autenticação nem controles de acesso adequados para proteger informações pessoais.

Antes de disponibilizar o software para uso operacional, será necessário implementar mecanismos apropriados de segurança, controle de acesso e proteção de dados.
