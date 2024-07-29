## Sobre a API
Nesse desafio proposto no curso de Node.Js da Rocketseat construi uma API para trabalhar com tasks.

## Funcionalidades da API:
A API contém as seguintes funcionalidades:
- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- Importação de tasks em massa por um arquivo CSV

## Rotas e regras de negócio
Propiedades que cada task terá:
- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

Rotas:

- `POST - /tasks`
    
    Essa rota irá criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
    
    Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.
    
- `GET - /tasks`
    
   Essa rota será possível listar todas as tasks salvas no banco de dados. Também é possível realizar uma busca, filtrando as tasks pelo `title` e `description`
    
- `PUT - /tasks/:id`
    
    É possível possível atualizar uma task pelo `id`.
    
    No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.
    
    Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
    
- `DELETE - /tasks/:id`
    
    É possível possível remover uma task pelo `id`.
    
- `PATCH - /tasks/:id/complete`
     É possível possível marcar a task como completa ou não.


## Instalação

Lembre de ter o Node.js instalado em sua máquina para que consiga executar o projeto.

1. Clone o repositório:

   ```bash
   git clone https://github.com/flavioaugusto1/task-api.git

2. Na sua máquina navegue até o repositório:

   ```bash
   cd task-api

3. Instale as depêndencias:

   ```bash
   npm install

## Uso
1. Inicie o aplicativo:

   ```bash
   npm run dev

Collection com endpoints:
[task-api.postman_collection.json](https://github.com/user-attachments/files/16406170/task-api.postman_collection.json)
