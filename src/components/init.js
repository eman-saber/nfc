import cornerstone from "cornerstone-core";

export function _addCornerstoneEventListeners(element) {
  if (!cornerstone.EVENTS) {
    console.error("Cornerstone.EVENTS is undefined");
    return;
  }

  element.addEventListener(cornerstone.EVENTS.IMAGE_RENDERED, () => {
    console.log("Image rendered!");
  });
}

export function _removeCornerstoneEventListeners(element) {
  if (!cornerstone.EVENTS) {
    console.error("Cornerstone.EVENTS is undefined");
    return;
  }

  element.removeEventListener(cornerstone.EVENTS.IMAGE_RENDERED, () => {
    console.log("Image rendered removed.");
  });
}
