// components/Game.js
import { useState, useRef, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const departments = [
  {
    departmanadi: 'Fizik',
    departmanAcilisYili: 1998,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 87000,
    erasmusUlkeSayisi: 6,
    ogretimGorevlisiSayisi: 35
  },
  {
    departmanadi: 'Fotonik',
    departmanAcilisYili: 2019,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 120000,
    erasmusUlkeSayisi: 3,
    ogretimGorevlisiSayisi: 9
  },
  {
    departmanadi: 'Kimya',
    departmanAcilisYili: 1998,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 110000,
    erasmusUlkeSayisi: 8,
    ogretimGorevlisiSayisi: 17
  },
  {
    departmanadi: 'Matematik',
    departmanAcilisYili: 1998,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 110000,
    erasmusUlkeSayisi: 6,
    ogretimGorevlisiSayisi: 35
  },
  {
    departmanadi: 'Moleküler Biyoloji',
    departmanAcilisYili: 2002,
    fakulteTuru: 'Fen Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 36000,
    erasmusUlkeSayisi: 9,
    ogretimGorevlisiSayisi: 16
  },
  {
    departmanadi: 'Bilgisayar',
    departmanAcilisYili: 1992,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '1',
    yksYaklasikSiralamasi2024: 8000,
    erasmusUlkeSayisi: 6,
    ogretimGorevlisiSayisi: 16
  },
  {
    departmanadi: 'Biyomühendislik',
    departmanAcilisYili: 2014,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 60000,
    erasmusUlkeSayisi: 2,
    ogretimGorevlisiSayisi: 12
  },
  {
    departmanadi: 'Çevre Mühendisliği',
    departmanAcilisYili: 1997,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 140000,
    erasmusUlkeSayisi: 3,
    ogretimGorevlisiSayisi: 8
  },
  {
    departmanadi: 'Elektrik Mühendisliği',
    departmanAcilisYili: 1994,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '1',
    yksYaklasikSiralamasi2024: 20000,
    erasmusUlkeSayisi: 16,
    ogretimGorevlisiSayisi: 12
  },
  {
    departmanadi: 'Enerji Mühendisliği',
    departmanAcilisYili: 2014,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 60000,
    erasmusUlkeSayisi: 7,
    ogretimGorevlisiSayisi: 6
  },
  {
    departmanadi: 'Gıda Mühendisliği',
    departmanAcilisYili: 1996,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 110000,
    erasmusUlkeSayisi: 11,
    ogretimGorevlisiSayisi: 13
  },
  {
    departmanadi: 'İnşaat Mühendisliği',
    departmanAcilisYili: 1992,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 130000,
    erasmusUlkeSayisi: 11,
    ogretimGorevlisiSayisi: 15
  },
  {
    departmanadi: 'Kimya Mühendisliği',
    departmanAcilisYili: 1996,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 40000,
    erasmusUlkeSayisi: 7,
    ogretimGorevlisiSayisi: 15
  },
  {
    departmanadi: 'Makine Mühendisliği',
    departmanAcilisYili: 1998,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '1',
    yksYaklasikSiralamasi2024: 30000,
    erasmusUlkeSayisi: 12,
    ogretimGorevlisiSayisi: 18
  },
  {
    departmanadi: 'Malzeme Bilimi',
    departmanAcilisYili: 1998,
    fakulteTuru: 'Mühendislik Fakültesi',
    yandalVeCAP: '0',
    yksYaklasikSiralamasi2024: 70000,
    erasmusUlkeSayisi: 7,
    ogretimGorevlisiSayisi: 11
  },
  {
    departmanadi: 'Endüstriyel Tasarım',
    departmanAcilisYili: 1994,
    fakulteTuru: 'Mimarlık Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 80000,
    erasmusUlkeSayisi: 2,
    ogretimGorevlisiSayisi: 7
  },
  {
    departmanadi: 'Mimarlık',
    departmanAcilisYili: 1995,
    fakulteTuru: 'Mimarlık Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 80000,
    erasmusUlkeSayisi: 11,
    ogretimGorevlisiSayisi: 23
  },
  {
    departmanadi: 'SBP',
    departmanAcilisYili: 1992,
    fakulteTuru: 'Mimarlık Fakültesi',
    yandalVeCAP: '2',
    yksYaklasikSiralamasi2024: 210000,
    erasmusUlkeSayisi: 8,
    ogretimGorevlisiSayisi: 16
  }
]

const properties = [
  { key: 'departmanadi', label: 'Bölüm', type: 'string' },
  { key: 'departmanAcilisYili', label: 'Kuruluş', type: 'number' },
  { key: 'fakulteTuru', label: 'Fakülte', type: 'string' },
  { key: 'yandalVeCAP', label: 'ÇAP', type: 'string' },
  { key: 'yksYaklasikSiralamasi2024', label: 'YKS Sıra', type: 'number' },
  { key: 'erasmusUlkeSayisi', label: 'Erasmus', type: 'number' },
  { key: 'ogretimGorevlisiSayisi', label: 'Akademisyen', type: 'number' },
]

function getTileStatus(prop, guessedValue, targetValue) {
  if (prop.type === 'number') {
    if (targetValue === null || guessedValue === null) return { symbol: '—', status: 'neutral' }
    if (guessedValue === targetValue) return { symbol: '✓', status: 'correct' }
    // "Close" if within 20% range
    const diff = Math.abs(guessedValue - targetValue)
    const threshold = Math.max(targetValue * 0.2, 2)
    if (diff <= threshold) {
      return { symbol: guessedValue > targetValue ? '↓' : '↑', status: 'close' }
    }
    return { symbol: guessedValue > targetValue ? '↓' : '↑', status: 'wrong' }
  }
  // string comparison
  if (guessedValue.toLowerCase() === targetValue.toLowerCase()) {
    return { symbol: '✓', status: 'correct' }
  }
  return { symbol: '✗', status: 'wrong' }
}

export default function Game({ onWin }) {
  const [currentDept, setCurrentDept] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [guesses, setGuesses] = useState([]) // Array of guess rows
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(-1)
  const [won, setWon] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const departmentNames = departments.map(d => d.departmanadi)

  const filteredDepts = userInput.trim()
    ? departmentNames.filter(n => n.toLowerCase().includes(userInput.trim().toLowerCase()))
    : departmentNames

  useEffect(() => {
    // Auto-start game
    startGame()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const startGame = () => {
    const randomDept = departments[Math.floor(Math.random() * departments.length)]
    setCurrentDept(randomDept)
    setUserInput('')
    setMessage('')
    setMessageType('')
    setGuesses([])
    setWon(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSelectDept = (name) => {
    setUserInput(name)
    setShowDropdown(false)
    setActiveDropdownIndex(-1)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleKeyDown = (e) => {
    if (!showDropdown || filteredDepts.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveDropdownIndex(prev => Math.min(prev + 1, filteredDepts.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveDropdownIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeDropdownIndex >= 0) {
        handleSelectDept(filteredDepts[activeDropdownIndex])
      } else {
        handleSubmit()
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  const handleSubmit = () => {
    if (!userInput.trim() || !currentDept) return

    const guessedDept = departments.find(
      d => d.departmanadi.toLowerCase() === userInput.trim().toLowerCase()
    )

    if (!guessedDept) {
      setMessage('Bu isimde bir bölüm yok. Listeden seçin.')
      setMessageType('notfound')
      setUserInput('')
      return
    }

    // Build tile row
    const row = properties.map(prop => {
      const guessedValue = guessedDept[prop.key]
      const targetValue = currentDept[prop.key]
      const { symbol, status } = getTileStatus(prop, guessedValue, targetValue)
      return {
        label: prop.label,
        value: prop.type === 'number' && guessedValue !== null
          ? guessedValue.toLocaleString('tr-TR')
          : guessedValue,
        symbol,
        status
      }
    })

    const isWin = guessedDept.departmanadi.toLowerCase() === currentDept.departmanadi.toLowerCase()

    setGuesses(prev => [...prev, row])
    setUserInput('')

    if (isWin) {
      setMessage('')
      setMessageType('')
      setWon(true)
    } else {
      setMessage(`${guessedDept.departmanadi} değil. İpuçlarını takip et!`)
      setMessageType('error')
    }
  }

  if (!currentDept) return null

  return (
    <div className={styles.gameContainer}>
      {/* Info bar */}
      <div className={styles.gameHeader}>
        <span className={styles.attemptBadge}>
          Tahmin: <span>{guesses.length}</span>
        </span>
        <span className={styles.attemptBadge}>
          Kalan: <span>{departments.length - guesses.length}</span>
        </span>
      </div>

      {/* Message */}
      {message && (
        <div className={`${styles.messageBar} ${
          messageType === 'notfound' ? styles.messageNotFound : styles.messageError
        }`}>
          {message}
        </div>
      )}

      {/* Input */}
      {!won && (
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
          <div className={styles.inputWrapper} ref={dropdownRef}>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value)
                setShowDropdown(true)
                setActiveDropdownIndex(-1)
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              className={styles.input}
              placeholder="Bölüm adı yazın..."
              autoComplete="off"
            />
            {showDropdown && filteredDepts.length > 0 && (
              <div className={styles.dropdown}>
                {filteredDepts.slice(0, 8).map((name, i) => (
                  <div
                    key={name}
                    className={`${styles.dropdownItem} ${i === activeDropdownIndex ? styles.dropdownItemActive : ''}`}
                    onMouseDown={() => handleSelectDept(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>Tahmin Et</button>
        </form>
      )}

      {/* Column headers */}
      {guesses.length > 0 && (
        <div className={styles.columnHeaders}>
          {properties.map(p => (
            <div key={p.key} className={styles.columnHeader}>{p.label}</div>
          ))}
        </div>
      )}

      {/* Guess grid */}
      <div className={styles.guessGrid}>
        {guesses.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.guessRow}>
            {row.map((tile, tileIndex) => (
              <div
                key={tileIndex}
                className={`${styles.tile} ${
                  tile.status === 'correct' ? styles.tileCorrect :
                  tile.status === 'close' ? styles.tileClose :
                  tile.status === 'wrong' ? styles.tileWrong :
                  styles.tileNeutral
                }`}
              >
                <span className={styles.tileLabel}>{tile.label}</span>
                <span className={styles.tileValue}>{tile.value}</span>
                <span className={styles.tileSymbol}>{tile.symbol}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Win overlay */}
      {won && (
        <div className={styles.winOverlay}>
          <div className={styles.winCard}>
            <div className={styles.winEmoji}>🎉</div>
            <div className={styles.winTitle}>Tebrikler!</div>
            <div className={styles.winSubtitle}>
              {guesses.length} tahminde bildiniz: <strong>{currentDept.departmanadi}</strong>
            </div>
            <button className={styles.winButton} onClick={startGame}>
              Tekrar Oyna
            </button>
            <button
              className={`${styles.winButton} ${styles.winButtonSecondary}`}
              onClick={() => { setWon(false); onWin() }}
            >
              Sonraki Oyun →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}