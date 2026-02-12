// components/secondgame.js
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/SecondGame.module.css'

const departments = [
  { name: 'Fizik', image: '/images/fizik.jpg' },
  { name: 'Fotonik', image: '/images/fotonik.jpg' },
  { name: 'Kimya', image: '/images/kimya.jpg' },
  { name: 'Matematik', image: '/images/matematik.jpg' },
  { name: 'Moleküler Biyoloji', image: '/images/molekuler-biyoloji.jpg' },
  { name: 'Bilgisayar', image: '/images/bilgisayar.jpg.jpg' },
  { name: 'Biyomühendislik', image: '/images/biyomuhendislik.jpg' },
  { name: 'Elektrik Mühendisliği', image: '/images/elektrik-muhendisligi.jpg' },
  { name: 'Gıda Mühendisliği', image: '/images/gida-muhendisligi.jpg' },
  { name: 'İnşaat Mühendisliği', image: '/images/insaat-muhendisligi.jpg' },
  { name: 'Kimya Mühendisliği', image: '/images/kimya-muhendisligi.jpg' },
  { name: 'Makine Mühendisliği', image: '/images/makine-muhendisligi.jpg' },
  { name: 'Malzeme Bilimi', image: '/images/malzeme-bilimi.jpg' },
  { name: 'Endüstriyel Tasarım', image: '/images/endustriyel-tasarim.jpg' },
  { name: 'Mimarlık', image: '/images/mimarlik.jpg' },
]

const MAX_TIME = 30
const MAX_GUESSES = 6
const MAX_BLUR = 25 // starting blur in px

export default function SecondGame() {
  const [currentDept, setCurrentDept] = useState(null)
  const [guess, setGuess] = useState('')
  const [guessHistory, setGuessHistory] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [timeLeft, setTimeLeft] = useState(MAX_TIME)
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const deptNames = departments.map(d => d.name)
  const filteredNames = guess.trim()
    ? deptNames.filter(n => n.toLowerCase().includes(guess.trim().toLowerCase()))
    : deptNames

  // Current blur level based on guess count (reduces with each wrong guess)
  const currentBlur = Math.max(0, MAX_BLUR - (guessHistory.length * (MAX_BLUR / MAX_GUESSES)))

  useEffect(() => { startNewRound() }, [])

  // Timer
  useEffect(() => {
    if (gameOver || !currentDept) return
    if (timeLeft <= 0) {
      endGame(false)
      return
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, gameOver, currentDept])

  // Click outside dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const startNewRound = () => {
    const randomDept = departments[Math.floor(Math.random() * departments.length)]
    setCurrentDept(randomDept)
    setGuess('')
    setGuessHistory([])
    setGameOver(false)
    setWon(false)
    setTimeLeft(MAX_TIME)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const endGame = (didWin) => {
    setGameOver(true)
    setWon(didWin)
    if (didWin) {
      // Score: more points for fewer guesses + remaining time
      const guessBonus = (MAX_GUESSES - guessHistory.length) * 100
      const timeBonus = timeLeft * 10
      setScore(prev => prev + guessBonus + timeBonus)
    }
  }

  const handleSelect = (name) => {
    setGuess(name)
    setShowDropdown(false)
    setActiveIndex(-1)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleKeyDown = (e) => {
    if (!showDropdown || filteredNames.length === 0) {
      if (e.key === 'Enter') { e.preventDefault(); submitGuess() }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => Math.min(prev + 1, filteredNames.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0) handleSelect(filteredNames[activeIndex])
      else submitGuess()
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  const submitGuess = () => {
    if (gameOver || !guess.trim() || !currentDept) return

    const isCorrect = guess.trim().toLowerCase() === currentDept.name.toLowerCase()
    const entry = { text: guess.trim(), correct: isCorrect }

    setGuessHistory(prev => [...prev, entry])
    setGuess('')

    if (isCorrect) {
      endGame(true)
    } else if (guessHistory.length + 1 >= MAX_GUESSES) {
      endGame(false)
    }
  }

  // Timer ring
  const timerPercent = (timeLeft / MAX_TIME) * 100
  const timerColor = timeLeft > 15 ? '#538d4e' : timeLeft > 5 ? '#b59f3b' : '#e74c3c'
  const circumference = 2 * Math.PI * 28
  const dashOffset = circumference - (timerPercent / 100) * circumference

  if (!currentDept) return null

  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.roundBadge}>Tur {round}</div>
        <div className={styles.scoreBadge}>⭐ {score}</div>
      </div>

      {/* Image reveal area */}
      <div className={styles.revealArea}>
        <div className={styles.imageFrame}>
          <img
            src={currentDept.image}
            alt="Tahmin et"
            className={styles.image}
            style={{
              filter: gameOver ? 'blur(0px)' : `blur(${currentBlur}px)`,
              transition: 'filter 0.6s ease',
            }}
          />
          {/* Blur level indicator */}
          {!gameOver && (
            <div className={styles.blurBadge}>
              {Math.round((1 - currentBlur / MAX_BLUR) * 100)}% açık
            </div>
          )}
        </div>

        {/* Timer ring */}
        <div className={styles.timerRing}>
          <svg width="68" height="68" viewBox="0 0 68 68">
            <circle
              cx="34" cy="34" r="28"
              fill="none"
              stroke="#2a2a2c"
              strokeWidth="4"
            />
            <circle
              cx="34" cy="34" r="28"
              fill="none"
              stroke={timerColor}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 34 34)"
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
            />
          </svg>
          <span className={styles.timerText} style={{ color: timerColor }}>
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Guess history pills */}
      {guessHistory.length > 0 && (
        <div className={styles.pillRow}>
          {guessHistory.map((g, i) => (
            <div
              key={i}
              className={`${styles.pill} ${g.correct ? styles.pillCorrect : styles.pillWrong}`}
            >
              {g.text}
            </div>
          ))}
          {/* Empty remaining slots */}
          {!gameOver && Array.from({ length: MAX_GUESSES - guessHistory.length }).map((_, i) => (
            <div key={`empty-${i}`} className={styles.pillEmpty} />
          ))}
        </div>
      )}

      {/* Remaining guesses indicator */}
      {!gameOver && (
        <div className={styles.guessCounter}>
          {Array.from({ length: MAX_GUESSES }).map((_, i) => (
            <div
              key={i}
              className={`${styles.guessDot} ${i < guessHistory.length ? styles.guessDotUsed : ''}`}
            />
          ))}
        </div>
      )}

      {/* Input area */}
      {!gameOver && (
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper} ref={dropdownRef}>
            <input
              ref={inputRef}
              type="text"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value)
                setShowDropdown(true)
                setActiveIndex(-1)
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              className={styles.input}
              placeholder="Bölüm adı yazın..."
              autoComplete="off"
            />
            {showDropdown && filteredNames.length > 0 && (
              <div className={styles.dropdown}>
                {filteredNames.slice(0, 6).map((name, i) => (
                  <div
                    key={name}
                    className={`${styles.dropdownItem} ${i === activeIndex ? styles.dropdownItemActive : ''}`}
                    onMouseDown={() => handleSelect(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={submitGuess}
            className={styles.submitBtn}
            disabled={!guess.trim()}
          >
            Tahmin Et
          </button>
        </div>
      )}

      {/* Game over overlay */}
      {gameOver && (
        <div className={styles.resultCard}>
          <div className={styles.resultEmoji}>{won ? '🎉' : '😔'}</div>
          <div className={styles.resultTitle}>
            {won ? 'Bildiniz!' : 'Süre/Hak Doldu'}
          </div>
          <div className={styles.resultAnswer}>
            {currentDept.name}
          </div>
          {won && (
            <div className={styles.resultStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{guessHistory.length}</span>
                <span className={styles.statLabel}>Tahmin</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{timeLeft}s</span>
                <span className={styles.statLabel}>Kalan</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>⭐ {score}</span>
                <span className={styles.statLabel}>Toplam</span>
              </div>
            </div>
          )}
          <button
            className={styles.playAgainBtn}
            onClick={() => { setRound(r => r + 1); startNewRound() }}
          >
            Sonraki Tur →
          </button>
        </div>
      )}
    </div>
  )
}
