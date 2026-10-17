// StoryCast: progressive enhancement for transcripts.
// Without JavaScript the transcript is still fully readable; with it, each
// timestamp becomes a seek button and the line being spoken is highlighted.
(() => {
  const media = document.querySelector('[data-story-media]');
  const cues = [...document.querySelectorAll('[data-cue-start]')];
  if (!media || !cues.length) return;

  const seekTo = (cue) => {
    media.currentTime = parseFloat(cue.dataset.cueStart);
    media.play();
  };

  cues.forEach((cue) => {
    cue.querySelector('.transcript__time')?.addEventListener('click', () => seekTo(cue));
  });

  const highlight = () => {
    const t = media.currentTime;
    cues.forEach((cue) => {
      const active = t >= parseFloat(cue.dataset.cueStart) && t < parseFloat(cue.dataset.cueEnd);
      if (active) cue.setAttribute('aria-current', 'true');
      else cue.removeAttribute('aria-current');
    });
  };

  media.addEventListener('timeupdate', highlight);
  media.addEventListener('seeked', highlight);
})();
