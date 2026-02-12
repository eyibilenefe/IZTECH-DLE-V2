// pages/index.js
import { useState } from 'react'
import Game from '../components/Game'
import SecondGame from '../components/secondgame'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [activeGame, setActiveGame] = useState('dept') // 'dept' | 'visual' | null
  const [secondGameUnlocked, setSecondGameUnlocked] = useState(false)

  const handleWinGame = () => {
    setSecondGameUnlocked(true)
    setActiveGame('visual')
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>İYTEdle</h1>
      </div>

      {/* Game selection cards */}
      <div className={styles.cardGrid}>
        <button
          className={`${styles.card} ${activeGame === 'dept' ? styles.cardActive : ''}`}
          onClick={() => setActiveGame('dept')}
        >
          <span className={styles.cardEmoji}>🏛️</span>
          Departman Tahmin
        </button>
        <button
          className={`${styles.card} ${activeGame === 'visual' ? styles.cardActive : ''}`}
          onClick={() => secondGameUnlocked && setActiveGame('visual')}
          disabled={!secondGameUnlocked}
        >
          <span className={styles.cardEmoji}>{secondGameUnlocked ? '🖼️' : '🔒'}</span>
          Görsel Tahmin
        </button>
      </div>

      {/* Active game */}
      {activeGame === 'dept' && <Game onWin={handleWinGame} />}
      {activeGame === 'visual' && secondGameUnlocked && <SecondGame />}
    </div>
  )
}
