// window.addEventListener('DOMContentLoaded', function() {
//     const textarea1 = document.getElementById('textarea1');
//     const textarea2 = document.getElementById('textarea2');
//     const textarea3 = document.getElementById('textarea3');
//     const wordCount1 = document.getElementById('wordCount1');
//     const wordCount2 = document.getElementById('wordCount2');
//     const wordCount3 = document.getElementById('wordCount3');
//     const timer = document.getElementById('timer');
  
//     let interval;
//     let seconds = 120;
//     let isTimeUp = false;
  
//     textarea1.addEventListener('input', function() {
//       if (!isTimeUp) {
//         wordCount1.textContent = 'Nombre de mots : ' + countWords(textarea1.value);
//         startTimer();
//       } else {
//         textarea1.blur();
//       }
//     });
  
//     textarea2.addEventListener('input', function() {
//       if (!isTimeUp) {
//         wordCount2.textContent = 'Nombre de mots : ' + countWords(textarea2.value);
//       } else {
//         textarea2.blur();
//       }
//     });
  
//     textarea3.addEventListener('input', function() {
//       if (!isTimeUp) {
//         wordCount3.textContent = 'Nombre de mots : ' + countWords(textarea3.value);
//       } else {
//         textarea3.blur();
//       }
//     });
  
  
//     function countWords(text) {
//       const words = text.trim().split(/\s+/);
//       return words.length;
//     }
  
//     function startTimer() {
//       clearInterval(interval);
//       seconds = 120;
//       interval = setInterval(updateTimer, 1000);
//     }
  
//     function updateTimer() {
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       timer.textContent = 'Temps restant : ' + padZero(minutes) + ':' + padZero(remainingSeconds);
//       seconds--;
//       if (seconds < 0) {
//         clearInterval(interval);
//         timer.textContent = 'Temps écoulé';
//         isTimeUp = true;
//         textarea1.disabled = true;
//         textarea2.disabled = true;
//         textarea3.disabled = true;
//       }
//     }
//     function downloadContent() {
//         // Obtenir le contenu de la page HTML
//         const htmlContent = document.documentElement.outerHTML;
      
//         // Créer un objet Blob à partir du contenu HTML
//         const blob = new Blob([htmlContent], { type: "text/plain" });
      
//         // Créer un objet URL à partir du Blob
//         const url = URL.createObjectURL(blob);
      
//         // Créer un élément <a> pour le téléchargement
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "contenu_page.txt"; // Nom du fichier de téléchargement
      
//         // Simuler un clic sur le lien de téléchargement
//         a.click();
      
//         // Libérer l'URL de l'objet Blob
//         URL.revokeObjectURL(url);
//       }
//     function padZero(value) {
//       return value < 10 ? '0' + value : value;
//     }
//   });

// Compter le nombre de mots dans chaque textarea
const textareas = Array.from(document.querySelectorAll('textarea')); // Sélectionne tous les textarea de la page
const wordCountElements = Array.from(document.querySelectorAll('.word-count')); // Sélectionne tous les éléments d'affichage du nombre de mots

textareas.forEach((textarea, index) => {
  textarea.addEventListener('input', () => {
    const wordCount = textarea.value.trim().split(/\s+/).length; // Compte le nombre de mots dans le contenu du textarea
    wordCountElements[index].textContent = `Nombre de mots : ${wordCount}`; // Affiche le nombre de mots dans l'élément correspondant
  });
});

// Récupérer le titre de niveau h1
const h1Title = document.querySelector('h1').textContent.trim(); // Récupère le texte du titre de niveau h1 et le nettoie des espaces inutiles

// Déclencher un chronomètre de 1 minute lorsque le premier textarea est cliqué
const firstTextarea = document.querySelector('#textarea1'); // Sélectionne le premier textarea
const timerElement = document.querySelector('#timer'); // Sélectionne l'élément d'affichage du chronomètre

let timer;
let minutes = 60;
let seconds = 0;

firstTextarea.addEventListener('click', () => {
  if (!timer) {
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer); // Arrête le chronomètre lorsque le temps est écoulé
          timer = null;
          textareas.forEach(textarea => {
            textarea.disabled = true; // Désactive tous les textareas
          });
          timerElement.textContent = `Temps écoulé !!`; // Affiche un message indiquant que le temps est écoulé
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      timerElement.textContent = `Temps restant : ${minutes}:${seconds.toString().padStart(2, '0')}`; // Affiche le temps restant au format mm:ss

    }, 1000);
  }
});

// Télécharger le devoir au format .txt
function downloadContent() {
  const content = [];
  content.push(h1Title); // Ajouter le titre de niveau h1
  content.push('');

  const container = document.querySelector('.container'); // Sélectionne l'élément de conteneur principal
  const textarea1 = container.querySelector('#textarea1'); // Sélectionne le premier textarea dans le conteneur
  const h2Heading = container.querySelector('.text-area:nth-child(1) h2'); // Sélectionne le titre h2 correspondant au premier textarea
  const h2Paragraph = h2Heading.nextElementSibling; // Sélectionne le paragraphe suivant le titre h2
  const wordCount1 = wordCountElements[0].textContent; // Récupère le nombre de mots du premier textarea

  content.push(`${h2Heading.textContent.trim()}`); // Ajoute le texte du titre h2 dans le contenu
  content.push(h2Paragraph.textContent.trim()); // Ajoute le texte du paragraphe dans le contenu
  content.push('');
  content.push(textarea1.value.trim()); // Ajoute le contenu du premier textarea dans le contenu
  content.push('');
  content.push(wordCount1); // Ajoute le nombre de mots du premier textarea dans le contenu
  content.push('');

  const textarea2 = container.querySelector('#textarea2'); // Sélectionne le deuxième textarea dans le conteneur
  const h2HeadingTask2 = container.querySelector('.text-area:nth-child(2) h2'); // Sélectionne le titre h2 correspondant au deuxième textarea
  const h2ParagraphTask2 = h2HeadingTask2.nextElementSibling; // Sélectionne le paragraphe suivant le titre h2
  const wordCount2 = wordCountElements[1].textContent; // Récupère le nombre de mots du deuxième textarea

  content.push(`${h2HeadingTask2.textContent.trim()}`); // Ajoute le texte du titre h2 dans le contenu
  content.push(h2ParagraphTask2.textContent.trim()); // Ajoute le texte du paragraphe dans le contenu
  content.push('');

  content.push(textarea2.value.trim()); // Ajoute le contenu du deuxième textarea dans le contenu
  content.push('');
  content.push(wordCount2); // Ajoute le nombre de mots du deuxième textarea dans le contenu
  content.push('');

  const textarea3 = container.querySelector('#textarea3'); // Sélectionne le troisième textarea dans le conteneur
  const h2HeadingTask3 =container.querySelector('.text-area:nth-child(3) h2'); // Sélectionne le titre h2 correspondant au troisième textarea
  const h3Headings = Array.from(container.querySelectorAll('.text-area:nth-child(3) h3')); // Sélectionne tous les titres h3 correspondants au troisième textarea
  const wordCount3 = wordCountElements[2].textContent; // Récupère le nombre de mots du troisième textarea
  content.push(`${h2HeadingTask3.textContent.trim()}`); // Ajoute le texte du titre h2 dans le contenu

  h3Headings.forEach(h3 => {
    const h3Paragraph = h3.nextElementSibling; // Sélectionne le paragraphe suivant chaque titre h3
    content.push(`${h3.textContent.trim()}`); // Ajoute le texte du titre h3 dans le contenu
    content.push(h3Paragraph.textContent.trim()); // Ajoute le texte du paragraphe dans le contenu
  });
  content.push('');
  content.push('');

  content.push(textarea3.value.trim()); // Ajoute le contenu du troisième textarea dans le contenu
  content.push('');
  content.push(wordCount3); // Ajoute le nombre de mots du troisième textarea dans le contenu
  content.push('');

  const textToSave = content.join('\n'); // Convertit le contenu en une chaîne de caractères avec des sauts de ligne

  const element = document.createElement('a'); // Crée un élément de lien
  const file = new Blob([textToSave], {type: 'text/plain'}); // Crée un fichier Blob avec le contenu
  element.href = URL.createObjectURL(file); // Définit l'URL du lien avec l'URL du fichier Blob
  element.download = 'expression-ecrite-TCFCanada.txt'; // Définit le nom du fichier de téléchargement
  document.body.appendChild(element); // Ajoute l'élément de lien au corps du document
  element.click(); // Simule un clic sur le lien pour déclencher le téléchargement
}
