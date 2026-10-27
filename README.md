# Bar Container — MVP de cadastro

Protótipo web responsivo, sem dependências ou etapa de build. Feito em HTML, CSS e JavaScript puro para permitir testar rapidamente.

## Como executar
1. Extraia o arquivo ZIP.
2. Abra `index.html` no navegador (Chrome, Edge ou Firefox).
3. Use a área de cadastro, busca e perfil.

## Funcionalidades
- Cadastro de nome e curso (obrigatórios).
- Atlética e matrícula opcionais.
- Upload de foto (máximo 3 MB).
- Busca por nome, curso, atlética ou matrícula.
- Visualização, edição e exclusão de perfis.
- Dados persistidos no `localStorage` do navegador.
- Dados fictícios iniciais para demonstrar o diretório.
- Layout responsivo para celular e desktop.

## Limitações importantes do MVP
- Os dados ficam apenas no navegador e no dispositivo em que foram cadastrados. Não existe sincronização entre usuários ou computadores.
- Não há login, permissões por função, backend nem banco de dados remoto.
- A exclusão é irreversível neste protótipo.
- Não use dados pessoais reais de clientes ainda. Para produção, precisamos adicionar autenticação, banco de dados, armazenamento de imagens, regras de acesso e política de privacidade.

## Próxima evolução sugerida
Adicionar Supabase (Postgres + autenticação + storage) para transformar o protótipo local em sistema multiusuário com persistência compartilhada.
