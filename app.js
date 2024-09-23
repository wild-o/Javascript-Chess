//let allSpaces = document.querySelectorAll('[class*="game-row"]');
let allGameSpaces = '[class*="chess-game-space"]';



function addEventListenerByClass(className, clickEvent, classToBeAdded, method, callback) {
  let list = document.querySelectorAll(className);
  for (let i = 0; i < list.length; i++) {
    let dragged;
    list[i].addEventListener(clickEvent, (event) => {
        switch (method) {
          case "add":
            event.target.classList.add(classToBeAdded);
            break;
          case "remove":
            event.target.classList.remove(classToBeAdded);
            break;
          case "preventDefault":
            event.preventDefault();
            break;
        }
        //Check if a custom callback exists, useful for events like 'drop'
        if(callback && typeof callback == 'function'){
          callback(event)
        }
          

      },
      false
    );
  }
}

function handleDrop(event) {
  event.preventDefault(); // Prevent default behavior
  const draggedElement = document.querySelectorAll('.dragging'); // Assuming this class exists on the dragged element
  if (draggedElement) {
    
    // Move the dragged element into the drop target
    event.target.innerHTML = draggedElement.innerHTML;
    
  }
}





function gamePlayRefactor() {
  addEventListenerByClass(allGameSpaces, "dragstart", "dragging", "add", null);
  addEventListenerByClass(allGameSpaces, "dragend", "dragging", "remove", null);
  addEventListenerByClass(allGameSpaces, "dragover", null, "preventDefault", null);
  addEventListenerByClass(allGameSpaces, "dragenter", "dragOverColor", "add", null);
  addEventListenerByClass(allGameSpaces, "dragleave", "dragOverColor", "remove");
  addEventListenerByClass(allGameSpaces, "drop", null, null, handleDrop)
}







function gamePlayTest() {
  let dragged;
  const blackRookTest = document.getElementById("gameplayTest");
  const dropDestination = document.getElementById("6A");

  blackRookTest.addEventListener("dragstart", (event) => {
    dragged = event.target;
    event.target.classList.add("dragging");
  });

  blackRookTest.addEventListener("dragend", (event) => {
    //reset the transparency
    event.target.classList.remove("dragging");
  });

  dropDestination.addEventListener(
    "dragover",
    (event) => {
      event.preventDefault();
    },
    false
  );

  dropDestination.addEventListener("dragenter", (event) => {
    //highlight potential drop target when the draggable element enters it
    if (
      event.target.classList.contains(
        "chess-game-space-black" || "chess-game-space-white"
      )
    ) {
      event.target.classList.add("dragover");
    }
  });

  dropDestination.addEventListener("dragleave", (event) => {
    //reset background of potential drop target when the draggable element leaves it
    if (event.target.classList.contains("chess-game-space-black")) {
      event.target.classList.remove("dragover");
      console.log(true);
    }
  });

  dropDestination.addEventListener("drop", (event) => {
    //prevent default action (open as link for some elements)
    event.preventDefault();
    //move dragged element to the selected drop target
    if (event.target.classList.contains("chess-game-space-black")) {
      event.target.classList.remove("dragover");
      event.target.innerHTML = dragged.innerHTML;
      dragged.innerHTML = " ";
    }
  });
}

//gamePlayTest();
gamePlayRefactor();
//giveMeAllTheRowsRefactor();
