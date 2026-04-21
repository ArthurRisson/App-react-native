# Loja de Roupas Online - React Native

Este projeto é um aplicativo móvel desenvolvido em React Native com Expo para a disciplina de Desenvolvimento Mobile. O objetivo principal é o consumo da **Fake Store API** para exibição de produtos, autenticação de usuários e navegação entre telas.

---

## 👥 Integrantes do Grupo
* **Nome**: Arthur Risson
* **RA**: 1138099

## 📝 Nota sobre o trabalho
Professor, resolvi fazer o projeto sozinho, mesmo podendo ser em grupo. Escolhi fazer assim porque eu queria colocar a mão na massa em todas as partes do aplicativo (como o login, a navegação das telas e a comunicação com a API). Senti que precisava usar esse trabalho para revisar algumas coisas que acabei perdendo pelo caminho e ter certeza de que aprendi de verdade como tudo isso funciona.

---

## 🛠️ Tecnologias Utilizadas
* **React Native** com **Expo**
* **JavaScript**
* **Axios** (Consumo de API)
* **React Navigation** (Stack Navigation)
* **Fake Store API** (Fonte de dados)

---

## 🚀 Como Rodar o Projeto

Para testar o aplicativo na sua máquina, siga o passo a passo abaixo:

**1. Pré-requisitos**
* Ter o [Node.js](https://nodejs.org/) instalado no computador.
* Ter o aplicativo **Expo Go** instalado no seu celular (disponível na Play Store e App Store).

**2. Clonar o repositório**
Abra o terminal na pasta de sua preferência e rode o comando:
> git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git

**3. Acessar a pasta e instalar dependências**
Navegue até a pasta do projeto e instale as bibliotecas necessárias:
> cd NOME_DA_PASTA
> npm install

**4. Rodar o servidor**
Inicie o Expo com o comando abaixo:
> npx expo start

**5. Visualizar no celular**
* Abra o aplicativo **Expo Go** no seu celular.
* Escaneie o QR Code que apareceu no terminal do computador.
* **Atenção:** O celular e o computador precisam estar conectados exatamente na mesma rede Wi-Fi.

**⚠️ Dica de Solução de Problemas (Troubleshooting)**
Caso o aplicativo não carregue no celular por bloqueios na rede Wi-Fi (erro de *timeout* ou falha na conexão local), pare o servidor (`Ctrl + C`) e inicie utilizando o modo túnel:
> npx expo start --tunnel

---

## 🔐 Autenticação e Usuários

O sistema de login consome o endpoint de autenticação da Fake Store API.

### Credenciais de Teste:
Para testar as funcionalidades do aplicativo, utilize o seguinte usuário padrão:
* **Username**: `mor_2314`
* **Password**: `83r5^_`

### Como verificar outros usuários:
Para consultar a lista completa de usuários disponíveis na API e utilizar outras credenciais, acesse:
[https://fakestoreapi.com/users](https://fakestoreapi.com/users)

---

## 📋 Funcionalidades Implementadas
* **Tela de Login**: Validação com usuários reais da API.
* **Tela Home**: Listagem de produtos com imagem, nome e preço formatado.
* **Filtro por Categorias**: Filtragem dinâmica de produtos com opção de limpar filtro.
* **Detalhes do Produto**: Exibição completa de informações de um item selecionado.
* **Informações do Grupo**: Tela acessível pelo cabeçalho com dados dos desenvolvedores.
* **Logout**: Função para retornar à tela de login com segurança.
