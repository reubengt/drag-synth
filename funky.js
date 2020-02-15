const synth = new Tone.Synth().toMaster();
const pad = document.querySelector(".pad");
const label = document.querySelector(".label");
let dragging = false;
// synth.triggerAttack(400);

const down = event => {
  dragging = true;
  let x = event.pageX;
  label.textContent = Math.round(x) + "Hz";
  synth.triggerAttack(x);
};

const up = event => {
  dragging = false;
  label.textContent = "CLICK + DRAG";
  synth.triggerRelease();
};

const move = event => {
  if (dragging) {
    let x = event.pageX;
    synth.setNote(x);
    label.innerHTML = Math.round(x) + "Hz";
  }
};

pad.addEventListener("pointerdown", down);
pad.addEventListener("pointerup", up);
pad.addEventListener("pointermove", move);
