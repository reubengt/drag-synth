const synth = new Tone.Synth().toMaster();
const pad = document.querySelector(".pad");
const label = document.querySelector(".label");
let dragging = false;
// synth.triggerAttack(400);

const getLabelColor = x => {
  if (dragging) {
    let fraction = x / window.innerWidth;
    return "hsl(" + (fraction * 360 + 180) + ", 100%, 50%)";
  } else return "white";
};

const getBackgroundColor = x => {
  if (dragging) {
    let fraction = x / window.innerWidth;
    return "hsl(" + fraction * 360 + ", 60%, 35%)";
  } else return "#222";
};

const getFrequency = x => {
  let fraction = x / window.innerWidth;
  return fraction * 1000;
};

const getLabel = x => {
  if (dragging) {
    var frequency = getFrequency(x);
    return Math.round(frequency) + "Hz";
  } else return "CLICK / DRAG";
};

const down = event => {
  if (Tone.context.state !== "running") {
    Tone.context.resume();
  }
  dragging = true;
  let x = event.pageX;
  synth.triggerAttack(getFrequency(x));
  label.textContent = getLabel(x);
  label.style.color = getLabelColor(x);
  pad.style.background = getBackgroundColor(x);
};

const up = event => {
  dragging = false;
  synth.triggerRelease();
  label.textContent = getLabel();
  label.style.color = getLabelColor();
  pad.style.background = getBackgroundColor();
};

const move = event => {
  if (dragging) {
    let x = event.pageX;
    synth.setNote(x);
    label.textContent = getLabel(x);
    label.style.color = getLabelColor(x);
    pad.style.background = getBackgroundColor(x);
  }
};

pad.addEventListener("mousedown", down);
pad.addEventListener("mouseup", up);
pad.addEventListener("mousemove", move);

pad.addEventListener("touchstart", event => {
  event.preventDefault();
  down(event.changedTouches[0]);
});
pad.addEventListener("touchend", event => {
  event.preventDefault();
  up(event.changedTouches[0]);
});
pad.addEventListener("touchmove", event => {
  event.preventDefault();
  move(event.changedTouches[0]);
});
