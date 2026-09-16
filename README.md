# Site — Camilla Petroni Yoga

Site estático simples (HTML/CSS/JS puro), sem necessidade de build.

## Como ver localmente
Abra o arquivo `index.html` direto no navegador, ou rode um servidor local:

```bash
cd "Cami Ashtanga Yoga"
python3 -m http.server 8000
```

Depois acesse http://localhost:8000

## Fotos usadas no site
- `images/camilla-sobre.jpg` — foto real da Camilla (seção Sobre e hero), enviada por ela.
- `images/stock-presencial.jpg`, `stock-online.jpg`, `stock-domicilio.jpg`,
  `stock-eventos.jpg`, `stock-pratica.jpg` — fotos de banco gratuito (Unsplash,
  licença livre para uso comercial, sem exigência de crédito), usadas nos cards
  de formato de aula e na seção "Como funciona".

Para trocar qualquer uma por uma foto real da Camilla, basta substituir o
arquivo em `images/` mantendo o mesmo nome (ou trocar o `src=""` correspondente
no `index.html`).

As 3 cards da seção "Método" (Sequência progressiva / Respiração e movimento /
Corpo e mente) continuam com ícones — são conceitos abstratos, ficam bem assim,
mas também dá pra trocar por foto seguindo o mesmo padrão dos cards de "Aulas".

## Dados usados no site
- WhatsApp: (11) 99449-1586
- Instagram: instagram.com/camilla_petroni
- Local das aulas presenciais: Pura Ashtanga Yoga — R. Piauí, 1164, Higienópolis, São Paulo - SP

## Publicar o site (deixar no ar)
Formas simples e gratuitas:
- **Netlify Drop**: arraste a pasta inteira em app.netlify.com/drop
- **GitHub Pages**: suba a pasta para um repositório e ative Pages nas configurações
- **Vercel**: `vercel` na pasta do projeto (com a Vercel CLI instalada)

Depois disso é só comprar um domínio (opcional) ou usar o link gratuito que a
plataforma gerar, e colocar no bio do Instagram dela.
