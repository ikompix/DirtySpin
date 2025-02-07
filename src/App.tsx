import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

// Composant Button minimaliste
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className = '', ...rest } = props
  return (
    <button
      {...rest}
      className={`px-4 py-2 bg-violet-700 text-white rounded-xl shadow font-semibold hover:bg-violet-800 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}

// Composant Card minimaliste
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-900 rounded-xl shadow p-4 my-2 w-full max-w-sm">
      {children}
    </div>
  )
}

// Composant CardContent
function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-2">{children}</div>
}

function App() {
  // 37 Positions Kamasutra (indexés de 0 à 36)
  const positions = [
    'Le Missionnaire',
    'La Cavalière',
    "L'Andromaque inversée",
    'La Levrette',
    'La Cuillère',
    'Le Lotus',
    'Le Pont',
    'La Brouette',
    'La Toupie',
    'La Chaise',
    'Le Poirier',
    'La Balance',
    "L'Union suspendue",
    "L'Équerre",
    'Le Papillon',
    'La Grenouille',
    'La Balance inversée',
    'Le 69 classique',
    'Le 69 debout',
    "L'Amazone",
    'Le Ciseau',
    'La Balançoire',
    'La Fusion',
    'Le Bateau ivre',
    'Le Cerf-volant',
    'La Danseuse',
    'La Tortue',
    'Le Hamac',
    'La Vague',
    'Le Trône royal',
    'La Liane',
    'La Pirogue',
    'Le Cavalier sauvage',
    "L’Arc-en-ciel",
    'Le Serpent enroulé',
    'La Montagne russe',
    'Le Chandelier',
  ]

  // 37 Vérités (indexés de 0 à 36)
  const truths = [
    'Quel est ton plus grand fantasme jamais réalisé ?',
    'As-tu déjà eu un coup de foudre instantané ?',
    'Quelle est la chose la plus folle que tu aies faite par amour ?',
    "As-tu déjà embrassé quelqu'un que tu ne connaissais pas ?",
    'Quel est ton souvenir le plus embarrassant en amour ?',
    'As-tu déjà eu un rêve érotique avec quelqu’un ici ?',
    'Quelle est la chose la plus risquée que tu aies faite dans ta vie amoureuse ?',
    'As-tu déjà été surpris en plein acte ?',
    "Quelle est la chose la plus étrange qui t'ait excité(e) ?",
    'As-tu déjà menti sur tes sentiments ?',
    'Quelle est ta position préférée ?',
    'As-tu déjà eu des sentiments pour un(e) ami(e) proche ?',
    'Quelle est la chose la plus romantique que tu aies faite ?',
    'As-tu déjà regretté une aventure d’un soir ?',
    'Quelle est la chose la plus drôle qui te soit arrivée pendant l’amour ?',
    'As-tu déjà eu des pensées inavouables dans un lieu public ?',
    'As-tu déjà fantasmé sur une célébrité ? Si oui, laquelle ?',
    'As-tu déjà envoyé un message coquin par erreur ?',
    "Quel est ton secret le plus inavouable en amour ?",
    'As-tu déjà fait semblant d’aimer quelqu’un pour éviter un malaise ?',
    'As-tu déjà eu des sentiments pour quelqu’un d’interdit ?',
    'Quelle est la chose la plus étrange que tu aies dite sous l’effet de la passion ?',
    "As-tu déjà partagé un secret intime avec quelqu'un que tu connaissais à peine ?",
    'As-tu déjà eu une relation à distance ? Comment ça s’est passé ?',
    'Quelle est ta plus grande peur en amour ?',
    'As-tu déjà été jaloux(se) sans raison valable ?',
    'Quelle est la chose la plus surprenante que tu aies découverte chez un(e) partenaire ?',
    'As-tu déjà eu un rendez-vous qui a mal tourné ?',
    'As-tu déjà été amoureux(se) de deux personnes en même temps ?',
    "As-tu déjà eu envie de tout plaquer pour suivre quelqu’un ?",
    "As-tu déjà regretté de ne pas avoir avoué tes sentiments ?",
    'Quel est ton plus grand regret amoureux ?',
    'As-tu déjà eu un coup de cœur pour quelqu’un que tu ne devrais pas ?',
    'Quelle est la chose la plus osée que tu aies faite en public ?',
    "As-tu déjà brisé le cœur de quelqu'un ?",
    'As-tu déjà été infidèle, même émotionnellement ?',
  ]

  // On génère un tableau de 37 objets contenant tout (numéro, couleurs, action, truth)
  const wheelData = Array.from({ length: 37 }, (_, i) => {
    // i = 0 => noir, i pair => noir, i impair => violet
    const backgroundColor = i === 0 || i % 2 === 0 ? '#000000' : '#6b21a8'
    return {
      option: i.toString(), // la valeur affichée sur la roue
      style: {
        backgroundColor,
        textColor: '#ffffff',
      },
      action: positions[i], // la position associée à ce numéro
      truth: truths[i],     // la vérité associée à ce numéro
    }
  })

  // État pour savoir si la roue doit tourner
  const [mustSpin, setMustSpin] = useState(false)
  // Index du segment gagnant
  const [prizeNumber, setPrizeNumber] = useState(0)
  // Vrai numéro (après arrêt)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  // Choix entre Action / Vérité
  const [choice, setChoice] = useState<string | null>(null)

  // Lancer la roulette
  const spinRoulette = () => {
    const randomNumber = Math.floor(Math.random() * 37)
    setPrizeNumber(randomNumber)
    setSelectedNumber(null)
    setChoice(null)
    setMustSpin(true)
  }

  // Quand la roue s'arrête
  const onStopSpinning = () => {
    setMustSpin(false)
    setSelectedNumber(prizeNumber)
  }

  const handleChoice = (type: string) => {
    setChoice(type)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 space-y-4">
      <h1 className="text-2xl font-bold">Spin for Ana</h1>

      {/* Roulette */}
      <div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelData}
          onStopSpinning={onStopSpinning}
          outerBorderColor="#ffffff"
          outerBorderWidth={5}
          radiusLineColor="#ffffff"
          radiusLineWidth={2}
          textDistance={90}
          // spinDuration={2}   // durée du spin en secondes (défaut: 1)
          // fontSize={14}     // taille du texte
        />
      </div>

      {/* Bouton de lancement */}
      <Button onClick={spinRoulette}>Lancer la Roulette</Button>

      {/* Choix Action / Vérité (seulement si la roulette s'est arrêtée) */}
      {selectedNumber !== null && !choice && (
        <div className="flex flex-col items-center space-y-2">
          {/* Le numéro de la roulette */}
          <div className="text-lg font-semibold">
            Numéro obtenu : {selectedNumber}
          </div>
          {/* Les boutons Action/Vérité */}
          <div className="flex space-x-4">
            <Button onClick={() => handleChoice('Action')}>Action</Button>
            <Button onClick={() => handleChoice('Vérité')}>Vérité</Button>
          </div>
        </div>
      )}


      {/* Affichage du résultat (action ou vérité) */}
      {choice && selectedNumber !== null && (
        <Card>
          <CardContent className="text-center space-y-2">
            {/* On affiche le numéro de la roulette */}
            <h2 className="text-xl font-bold">{choice} pour le numéro {selectedNumber}</h2>
            <p className="text-base">
              {choice === 'Action'
                ? wheelData[selectedNumber].action
                : wheelData[selectedNumber].truth}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default App
