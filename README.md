# Portfólio de Projetos e Excertos de JavaScript

Olá\! Este repositório (`JavaScriptExcerpts`) serve como meu portfólio central para demonstrar habilidades práticas em diversas áreas do ecossistema JavaScript.

Aqui eu agrupei diferentes projetos independentes que mostram minha capacidade de construir aplicações full-stack, ferramentas de desktop e frontends complexos e interativos.

## Stack de Tecnologias em Destaque

Este repositório contém projetos que utilizam:

  * **Frontend (Moderno):** React, TypeScript, Vite.
  * **Frontend (Legado/Puro):** JavaScript (ES6+), HTML5, CSS (DOM Manipulation).
  * **Aplicações Desktop:** Electron (`main.js`, `preload.js`).
  * **Backend:** Node.js, Express (implícito em `server.js`).
  * **Estilização:** TailwindCSS, PostCSS, Stylelint.
  * **APIs & Requisições:** Axios, Fetch API (Binance API).
  * **Code Quality:** TypeScript, ESLint.

-----

## 📂 Projetos em Destaque

Este repositório contém múltiplas aplicações. Abaixo estão as duas principais:

### 1\. Aplicação Desktop de Redimensionamento de Imagem (Electron)

Construí uma ferramenta de desktop multiplataforma usando Electron para redimensionar imagens de forma rápida.

**Arquitetura e Funcionalidades:**

  * **Processo Principal (Main):** O arquivo `main.js` utiliza módulos do Node.js (`fs`, `path`, `os`) para criar a janela principal (`BrowserWindow`), gerenciar o menu da aplicação (incluindo menus específicos para macOS) e lidar com eventos do ciclo de vida do app.
  * **Segurança (Preload):** O script `preload.js` segue as melhores práticas do Electron, usando `contextBridge` para expor seletivamente APIs do Node (como `ipcRenderer` e `path.join`) ao processo de renderização (frontend), garantindo que o isolamento de contexto seja mantido.
  * **Lógica de Negócio (Backend):** A lógica de processamento de imagem reside no processo principal. Utilizei `ipcMain.on('image:resize')` para escutar eventos vindos do frontend. Quando acionado, o processo lê o arquivo de imagem, usa a biblioteca `resize-img` para processá-lo e salva o resultado no diretório home do usuário, abrindo a pasta de destino ao final.

### 2\. Dashboard de Trading de Criptomoedas (JavaScript Puro)

Desenvolvi um painel de simulação de trading de criptomoedas totalmente funcional, escrito em JavaScript puro (Vanilla JS) e focado na manipulação direta do DOM, gerenciamento de estado local e integração com APIs externas.

**Funcionalidades:**

  * **Consumo de API:** O script consome a API pública da Binance (`/api/v3/ticker/price`) para buscar dados de preços de criptomoedas em tempo real. Implementei um filtro para exibir apenas pares BRL (Reais Brasileiros) e um intervalo (`setInterval`) que atualiza a lista de preços a cada segundo.
  * **Gerenciamento de Usuário (LocalStorage):** O sistema simula um banco de dados de usuários inteiramente no frontend.
      * **Cadastro:** Novos usuários são criados e seus dados (usuário, senha, fundos, histórico) são salvos como um objeto JSON no `localStorage`.
      * **Login e Sessão:** O login valida as credenciais contra o `localStorage` e, se bem-sucedido, define o estado de login no `sessionStorage` para persistir a sessão durante a navegação.
  * **Lógica de Negócio (Trading):**
      * **Gestão de Fundos:** Implementei a lógica para adicionar fundos à carteira do usuário (simulado), atualizando o saldo no `localStorage`.
      * **Operações de Compra e Venda:** A função `tradeCrypto` lida tanto com compras (`buy`) quanto com vendas (`sell`), calculando a quantidade de moedas, debitando ou creditando os fundos (BRL) e atualizando o portfólio (posições) do usuário no `localStorage`.
      * **Histórico:** Cada transação é registrada e anexada ao histórico de operações do usuário, que também é persistido no `localStorage`.

### 3\. Stack Moderna de Frontend (React + Vite + TypeScript)

A raiz do projeto está configurada com um ambiente de desenvolvimento moderno usando Vite, React e TypeScript. Esta estrutura serve como base para componentes React e demonstra proficiência nas ferramentas de build mais atuais, incluindo configuração de TailwindCSS e PostCSS.

-----

## 🚀 Como Executar (Ambiente React/Vite)

1.  Clone este repositório:
    ```bash
    git clone https://github.com/jeffthedeveloper/JavaScriptExcerpts.git
    cd JavaScriptExcerpts
    ```
2.  Instale as dependências do Node.js:
    ```bash
    npm install
    ```
3.  Execute o servidor de desenvolvimento Vite:
    ```bash
    npm run dev
    ```
4.  Para executar os projetos de JavaScript puro (como o Dashboard de Cripto), basta abrir os arquivos HTML correspondentes em um navegador. Para o projeto Electron, siga as instruções de build e execução específicas do Electron.
