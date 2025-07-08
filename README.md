# 📻 YouTube Radio MiniPlayer

Um mini reprodutor 🔊 de músicas e transmissões ao vivo 🎵 do YouTube, fixado no canto da tela. Desenvolvido com **Next.js** + **React**, ideal para projetos de portfólio, sites musicais ou rádios online!

---

## 🚀 Demonstração

> O player aparece fixado no canto inferior esquerdo. Ele busca uma lista de rádios do arquivo `radio_stations.json`, escolhe uma aleatória e começa a tocar automaticamente.

![radio player screenshot](./public/demo.png)

---

## ✨ Funcionalidades

- 🎧 Toca rádios ou músicas do YouTube com autoplay
- ⏯️ Controles de play, pause, próxima e anterior estação
- 🔀 Escolha aleatória de rádios da lista
- 📡 Detecta quando um vídeo termina e inicia o próximo
- 🧠 Interface animada e discreta no canto da tela
- 🧩 Pronto para integração com outros projetos Next.js

---

## 🛠️ Como usar

1. **Clone este repositório**

```bash
git clone https://github.com/seu-usuario/youtube-radio-player.git
cd youtube-radio-player
```

2. **Instale as dependências**

```bash
npm install
```

3. **Adicione suas estações do YouTube**

Edite o arquivo: `public/radio_stations.json`

```json
[
  {
    "name": "Lofi Hip Hop 🎧",
    "code": "jfKfPfyJRdk"
  },
  {
    "name": "Relaxing Jazz ☕",
    "code": "Dx5qFachd3A"
  }
]
```

> 🔗 O campo `code` é o **ID do vídeo no YouTube**, não a URL completa!

4. **Rode o projeto**

```bash
npm run dev
```

---

## 📁 Estrutura de Pastas

```
├── components/
│   └── RadioPlayer.tsx     # Componente principal do player
├── utils/
│   ├── getData.ts          # Função que carrega o JSON das rádios
│   └── getRandomInt.js     # Função utilitária para escolher uma rádio aleatória
├── public/
│   ├── radio_stations.json # Lista de rádios disponíveis
│   └── assets/
│       └── radio_switch_effect.mp3
```

---

## 🧠 Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [YouTube Iframe API](https://developers.google.com/youtube/iframe_api_reference)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 💡 Sugestões de uso

- Portfolio de desenvolvedor
- Sites de rádios online
- Aplicativos de foco (com lo-fi ou música ambiente)
- Projetos educacionais com áudio

---

## 🤝 Contribuindo

Fique à vontade para abrir uma _issue_ ou enviar um _pull request_ com sugestões, melhorias ou novas rádios!

---

## 📄 Licença

MIT © [Sandro Filho DEV](sandrofilho.dev)
