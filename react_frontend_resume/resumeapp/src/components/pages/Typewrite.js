// import { useEffect } from "react";

// const words = ["Upload", "Optimize", "Get Hired !"];
// let i = 0;
// let j = 0;
// let currentWord = "";
// let isDeleting = false;
// alert(document.getElementById("typewriter"));
// function type(){
//     currentWord = words[i]
//     if (isDeleting) {
//         document.getElementById("typewriter").textContent = currentWord.substring(0, j-1) ;
//         j--;
//         if (j == 0) {
//         isDeleting = false;
//         i++;
//         if (i == words.length) {
//             i = 0;
//         }
//     }
//     } else {
//         document.getElementById("typewriter").textContent =  currentWord.substring(0, j+1);
//         j++;
//         if (j == currentWord.length){
//             isDeleting = true;
//         }
//     }
//     setTimeout(type, 200);
// }
// type();

// typewriter.js
export function startTypewriterEffect(typewriterElement, words, speed = 200) {
    let i = 0;
    let j = 0;
    let isDeleting = false;
    let currentWord = "";
  
    function type() {
      if (!typewriterElement) return; // Check if the element exists
  
      currentWord = words[i];
  
      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, j - 1);
        j--;
        if (j === 0) {
          isDeleting = false;
          i++;
          if (i === words.length) {
            i = 0;
          }
        }
      } else {
        typewriterElement.textContent = currentWord.substring(0, j + 1);
        j++;
        if (j === currentWord.length) {
          isDeleting = true;
        }
      }
  
      setTimeout(type, speed);
    }
  
    type(); // Start typing when the function is called
  }
  