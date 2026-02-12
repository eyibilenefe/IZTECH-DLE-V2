# İYTEdle 🎓

A **Wordle-inspired** university department guessing game built for **İzmir Yüksek Teknoloji Enstitüsü (İYTE)** students and community.

> Can you guess the İYTE department from its stats?

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Games

### 1. Department Guessing Game

Guess the randomly selected İYTE department based on clues. Each guess reveals how your answer compares to the target across **7 categories**:

| Clue               | Description                                  |
| ------------------ | -------------------------------------------- |
| 🏛️ Department      | Department name                              |
| 📅 Founded         | Year the department was established          |
| 🏫 Faculty         | Which faculty it belongs to                  |
| 🎓 Double Major    | Number of double major / minor programs      |
| 📊 YKS Ranking     | Approximate 2024 university entrance ranking |
| 🌍 Erasmus         | Number of Erasmus partner countries          |
| 👨‍🏫 Faculty Members | Number of academic staff                     |

**Color coding:**

- 🟩 **Green** — Correct
- 🟨 **Yellow** — Close (within 20% for numbers)
- ⬛ **Gray** — Wrong

### 2. Visual Guessing Game _(unlocks after winning Game 1)_

A blurred photo of a department building is shown. With each wrong guess, the image becomes clearer. You have **6 guesses** and **30 seconds** to identify the department!

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/iytedle.git
cd iytedle

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🏗️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (Pages Router)
- **UI Library:** [React 18](https://react.dev/)
- **Styling:** CSS Modules
- **Font:** [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

## 📁 Project Structure

```
iytedle/
├── components/
│   ├── Game.js            # Department guessing game logic
│   └── secondgame.js      # Visual guessing game logic
├── pages/
│   ├── _app.js            # Global CSS imports
│   └── index.js           # Main page with game selection
├── public/
│   └── images/            # Department photos
├── styles/
│   ├── Home.module.css    # Main game styles (Wordle theme)
│   ├── SecondGame.module.css
│   └── indexstyles.css    # Global styles & dark theme
├── next.config.js
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

_Made with ❤️ for the İYTE community_
