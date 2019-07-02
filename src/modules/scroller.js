import Scroll from "react-scroll";
// let Element = Scroll.Element;
let scroller = Scroll.scroller;

export default (elementId, containerId) => {
  scroller.scrollTo(elementId, {
    duration: 1000,
    delay: 100,
    smooth: true,
    containerId: containerId,
    offset: 50, // Scrolls to element + 50 pixels down the page
  })
}