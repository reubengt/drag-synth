const synth = new Tone.Synth().toMaster();
const pad = document.querySelector(".pad");
const label = document.querySelector(".label");

// synth.triggerAttack(400);

const down = event => {
  const x = event.pageX;
  label.textContent = Math.round(x) + "Hz";
  synth.triggerAttack(x);
};

const up = event => {
  label.textContent = "CLICK + DRAG";
  synth.triggerRelease();
};

pad.addEventListener("pointerdown", down);
pad.addEventListener("pointerup", up);
