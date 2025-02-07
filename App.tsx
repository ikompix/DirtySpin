import React, { useState } from 'react';
import { Sparkles, Heart, MessageCircle } from 'lucide-react';

type GameChoice = 'truth' | 'dare' | null;

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
];

const dares = [
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
];

function App() {
  const [choice, setChoice] = useState<GameChoice>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState('');

  const handleChoice = (selected: GameChoice) => {
    if (choice) return; // Prevent new choice while card is showing
    
    setChoice(selected);
    const array = selected === 'truth' ? truths : dares;
    setCurrentCard(array[Math.floor(Math.random() * array.length)]);
    setIsFlipped(true);
  };

  const resetGame = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setChoice(null);
      setCurrentCard('');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-2">
        <Sparkles className="w-8 h-8" />
        Action ou Vérité
        <Heart className="w-8 h-8" />
      </h1>

      <div className="w-full max-w-md">
        {!choice ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChoice('truth')}
              className="bg-white/90 hover:bg-white text-purple-600 font-bold py-6 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-2" />
              Vérité
            </button>
            <button
              onClick={() => handleChoice('dare')}
              className="bg-white/90 hover:bg-white text-pink-500 font-bold py-6 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              Action
            </button>
          </div>
        ) : (
          <div 
            className={`relative w-full aspect-[3/4] perspective-1000 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={resetGame}
          >
            <div className="absolute w-full h-full backface-hidden bg-white/90 rounded-xl shadow-xl flex items-center justify-center p-8 text-2xl font-bold text-center">
              <p>{choice === 'truth' ? 'Vérité' : 'Action'}</p>
            </div>
            <div className="absolute w-full h-full backface-hidden bg-white/90 rounded-xl shadow-xl flex items-center justify-center p-8 text-2xl text-center rotate-y-180">
              <p>{currentCard}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;