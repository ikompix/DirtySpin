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
  // *** POSITIONS ***
// 37 propositions de positions avec leur niveau d’intensité
const positions = [
  'Soft - Missionnaire classique (face-à-face)',
  'Hot - Levrette (Doggy style)',
  'Medium - Andromaque (Cowgirl) (l’autre allongé·e, toi au-dessus)',
  'Medium - Lotus (assis face à face, jambes enroulées)',
  'Soft - Cuillère (Spooning) (allongés sur le côté)',
  'Medium - La Chaise (un·e assis·e, l’autre sur ses genoux face à lui/elle)',
  'Hot - Debout contre un mur',
  'Hot - La Balancoire (porter l’autre, jambes autour de la taille)',
  'Hot - Tête-bêche (69) (plaisirs oraux simultanés)',
  'Medium - Le Pont (l’un sur le dos, bassin légèrement surélevé)',
  'Medium - L’Enlaceur (similaire au lotus, mais l’un penche en arrière)',
  'Hot - La Fente (une jambe sur l’épaule du/de la partenaire)',
  'Hot - Face-à-face sur une table (un·e assis·e sur le bord, l’autre debout)',
  'Medium - La Bascule (bassin surélevé, l’autre se penche)',
  'Hot - La Motarde (Reverse Cowgirl)',
  'Medium - Le Coeur à Coeur (variation du lotus, torses en contact)',
  'Hot - La Tortue (allongé·e sur le ventre, l’autre au-dessus)',
  'Medium - La Liane (debout, s’appuyer sur un meuble pour ajuster la hauteur)',
  'Hot - Le Soulèvement (l’un soulève les hanches de l’autre)',
  'Soft - Le Canapé Douillet (assis côte à côte, l’un chevauche l’autre)',
  'Medium - La Toupie (la personne au-dessus effectue des rotations du bassin)',
  'Medium - Dos à dos (peu commun, chacun penché dans le sens opposé)',
  'Hot - La Fleur Ouverte (missionnaire avec jambes relevées)',
  'Medium - La Fusion (mix cuillère/lotus, couchés sur le côté)',
  'Soft - Pouf ou Fauteuil (s’asseoir et s’enlacer confortablement)',
  'Medium - Les Genoux Glissants (face à face, tous deux à genoux)',
  'Hot - Le Tourbillon (l’un allongé, l’autre tourne doucement le bassin)',
  'Hot - Le Pont Renversé (demi-pont, l’autre au-dessus)',
  'Medium - L’Étoile (allongés sur le dos, jambes enchevêtrées pour une pénétration latérale)',
  'Hot - Face à Face Suspendu (l’un tient l’autre en l’air)',
  'Hot - La Grenouille (la personne dessous replie les jambes vers la poitrine)',
  'Medium - Le Basculement de la Hanche (variation du missionnaire sur le côté)',
  'Hot - La Chaise Inversée (dos tourné à l’autre)',
  'Medium - Le Relevé de Bassin (oreillers sous les hanches, l’autre à genoux)',
  'Medium - Le Doux Serré (cuillère, mais on soulève légèrement la jambe du/de la partenaire)',
  'Hot - Le 77 (variante du 69, en diagonal)',
  'Hot - L’Escalade (l’un assis sur le bord du lit, l’autre s’assoit lentement, face ou dos)',
];

// *** ACTIONS (Dares) ***
// 37 propositions d’actions avec leur niveau d’intensité
const dares = [
  'Medium - Fais un strip-tease (retire tes vêtements en faisant un show)',
  'Medium - Offre un massage sensuel (avec huile parfumée)',
  'Soft - Fais un baiser à l’aveugle (yeux bandés, embrasse partout)',
  'Hot - Fais une fellation ou un cunnilingus',
  'Medium - Body painting (dessine sur son corps avec du chocolat)',
  'Medium - Danse érotique (lap dance, danse du ventre, etc.)',
  'Soft - Plume taquine (caresse avec une plume)',
  'Medium - Ice play (joue avec un glaçon sur ses zones érogènes)',
  'Medium - Fais un mini rôle play (prof, livreur·se, médecin...)',
  'Soft - Envoie un texto coquin ou une photo sensuelle',
  'Hot - Attache ou fais-toi attacher (bondage léger, prudence!)',
  'Medium - Embrasse/caresse son corps de la tête aux pieds',
  'Soft - Pause dégustation (nourris-le/la de fruits de manière sensuelle)',
  'Soft - Change de pièce (emmène-le/la pour un baiser dans un endroit inhabituel)',
  'Hot - Initiation à la fessée (quelques petites tapes consenties)',
  'Hot - Regarde ton/ta partenaire se caresser (ou fais-toi regarder)',
  'Soft - Baisers ciblés (oreilles, cou, chevilles) pendant 2 minutes',
  'Soft - Mise en scène musicale (danse collé(e)-serré(e) sur une musique sexy)',
  'Soft - Écris un fantasme sur un papier et fais-le découvrir',
  'Medium - Tease & Denial (faire monter le désir sans aller jusqu’au bout)',
  'Medium - Strip-tease inversé (laisse ton/ta partenaire te rhabiller)',
  'Soft - Baiser inversé (type Spider-Man)',
  'Medium - Caresses frissons (gel frais ou lotion froide sur ses zones érogènes)',
  'Soft - Montre ta lingerie surprise (ou absence de lingerie!)',
  'Hot - Prends (ou fais-toi prendre) une photo coquine',
  'Medium - Douche à deux (ou bain sensuel partagé)',
  'Hot - Utilise (ou propose) un jouet coquin',
  'Hot - Donne-lui des instructions précises (comment toucher, où, à quel rythme)',
  'Medium - Explore une zone érogène méconnue (2 minutes de découverte)',
  'Medium - Jeu de rôles téléphonique (comme si vous ne vous connaissiez pas)',
  'Soft - Change de parfum (pour éveiller sa curiosité olfactive)',
  'Medium - Concours de gémissements (cherchez le son le plus sexy)',
  'Hot - Course contre la montre (tenter de faire jouir l’autre en un temps donné)',
  'Medium - Posture de yoga érotique (contact physique rapproché)',
  'Soft - Devine l’objet (plume, brosse, glaçon) sur la peau',
  'Soft - Baiser prolongé de 30 secondes (varier intensité)',
  'Soft - Session d’écoute (respiration, battements de cœur en se caressant)',
];

// *** VÉRITÉS (Truths) ***
// 37 questions Vérité avec leur niveau d’intensité
const truths = [
  'Hot - As-tu déjà fait l’amour dans un lieu public ?',
  'Hot - Quel est ton plus grand fantasme inavoué ?',
  'Hot - As-tu déjà utilisé un jouet sexuel (sur toi ou un·e partenaire) ?',
  'Hot - As-tu déjà pratiqué l’anal ? Qu’en as-tu pensé ?',
  'Medium - Quel est l’endroit le plus surprenant où tu as fait l’amour ?',
  'Soft - Quelle est la partie de ton corps que tu aimes le plus (et le moins) ?',
  'Soft - As-tu déjà embrassé quelqu’un du même sexe ?',
  'Medium - As-tu déjà été surpris·e en plein ébat ? Par qui ?',
  'Medium - Quel est ton type de préliminaires préféré ?',
  'Medium - As-tu déjà réalisé un fantasme que tu as toujours voulu essayer ?',
  'Hot - Te sens-tu plutôt dominant·e ou soumis·e au lit ?',
  'Hot - As-tu déjà fait un plan à trois (ou plus) ?',
  'Medium - As-tu une zone érogène cachée qu’on ne soupçonne pas ?',
  'Hot - Quelle est la chose la plus coquine que tu aies faite par message ou vidéo ?',
  'Medium - As-tu déjà feint un orgasme ? Pourquoi ?',
  'Medium - As-tu déjà fait l’amour plusieurs fois d’affilée dans la même journée ?',
  'Soft - Combien de partenaires sexuels as-tu eus (si tu es à l’aise) ?',
  'Soft - As-tu déjà fantasmé sur un·e ami·e ou collègue ?',
  'Medium - Quelle est la chose la plus folle que tu ferais si personne ne te jugeait ?',
  'Soft - As-tu déjà fait l’amour avec la lumière allumée ? Préférences ?',
  'Hot - As-tu déjà fait une sextape ?',
  'Soft - Quelle est la qualité la plus excitante chez ton/ta partenaire ?',
  'Medium - Que penses-tu du porno en couple ?',
  'Hot - As-tu déjà envoyé ou reçu une photo nue ?',
  'Medium - Quelle est la chose la plus embarrassante qui te soit arrivée en plein acte ?',
  'Medium - T’est-il déjà arrivé de coucher avec quelqu’un sans trop te souvenir de la nuit ?',
  'Soft - As-tu déjà recouché avec un·e ex après la rupture ?',
  'Soft - Y a-t-il une chanson ou un style musical qui t’excite particulièrement ?',
  'Soft - Quel est le plus long moment où tu es resté·e sans faire l’amour ?',
  'Soft - Quelle est la première chose que tu regardes chez un potentiel partenaire ?',
  'Medium - Préfères-tu un long baiser langoureux ou une caresse intime rapide ?',
  'Medium - As-tu déjà été tenté·e par une relation ouverte ou libertine ?',
  'Medium - Quelle est la position que tu trouves la plus intime ?',
  'Medium - As-tu déjà fait l’amour dans l’eau (piscine, mer, bain) ?',
  'Medium - Comment te sens-tu à l’idée de jeux de rôle (uniformes, scénarios) ?',
  'Soft - As-tu déjà fait semblant de dormir pour éviter un rapport ?',
  'Medium - Quelle est la chose la plus coquine que tu aimerais tenter cette année ?',
];


  // On génère un tableau de 37 objets contenant tout (numéro, couleurs, action, truth)
  const wheelData = Array.from({ length: 37 }, (_, i) => {
    // On définit d'abord la couleur pour 0, puis on alterne pour les pairs/impairs
    const backgroundColor = i === 0
      ? '#009e02'           // 0 en vert
      : i % 2 === 0
        ? '#000000'         // pairs (hors 0) en noir
        : '#6b21a8';        // impairs en violet
  
    return {
      option: i.toString(),
      style: { backgroundColor, textColor: '#ffffff' },
      dares: dares[i],
      truths: truths[i],
      positions: positions[i],
    };
  });
  
  

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
      <h1 className="text-2xl font-bold">Naughty wheel</h1>

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
            <Button onClick={() => handleChoice('Positions')}>Positions</Button>
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
                ? wheelData[selectedNumber].dares
                : choice === 'Vérité'
                  ? wheelData[selectedNumber].truths
                  : wheelData[selectedNumber].positions // pour le 3e choix
              }
            </p>

          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default App
