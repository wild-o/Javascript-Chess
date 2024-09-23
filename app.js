//let allSpaces = document.querySelectorAll('[class*="game-row"]');
let allGameSpaces = '[class*="chess-game-space"]';

//Simplified event listener factory
function addEventListenerByClass(className, eventType, method, callback) {
  
  let elements = document.querySelectorAll(className);
  
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, (event) => {
        //Apply the method if provided
        if (method) {
          switch (method.action) {
            case "add":
              event.target.classList.add(method.class);
              break;
            case "remove":
              event.target.classList.remove(method.class);
              break;
            case "preventDefault":
              event.preventDefault();
              break;
          }
        }
        //Check if a custom callback exists, useful for events like 'drop'
        if (callback && typeof callback == "function") {
          callback(event);
        }
      },
      false
    );
  }
}

function handleDrop(event) {
  event.preventDefault(); // Prevent default behavior
  const draggedElement = document.querySelector(".dragging"); // Assuming this class exists on the dragged element
  if (draggedElement) {
    // Move the dragged element into the drop target
    event.target.innerHTML = draggedElement.innerHTML;
    draggedElement.innerHTML = "";
  }
}

function gamePlayRefactor() {
  const events = [
    { type: "dragstart", method: { action: "add", class: "dragging" } },
    { type: "dragend", method: { action: "remove", class: "dragging" } },
    { type: "dragover", method: { action: "preventDefault" } },
    { type: "dragenter", method: { action: "add", class: "dragOverColor" } },
    { type: "dragleave", method: { action: "remove", class: "dragOverColor" } },
    { type: "drop", method: null, callback: handleDrop },
  ];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    addEventListenerByClass(allGameSpaces, event.type, event.method, event.callback);
  }
}

gamePlayRefactor();

