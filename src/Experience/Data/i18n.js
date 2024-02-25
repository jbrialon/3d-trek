import { isTouchDevice } from "../Utils/Utils";

const isTouch = isTouchDevice();
export default {
  en: {
    menu: {
      start: "Start Game",
      tuto: "Start Tutorial",
    },
    title: {
      paragraph:
        'Follow our footsteps an <span class="bold">Exploration Game</span> through <strong>Nepal</strong>, uncovering hidden photos and moments from our two-week trek as you go.',
    },
    chapter: {
      title0: "Chapter 1",
      subtitle0: "Langtang  Valley",
      title1: "Chapter 2",
      subtitle1: "Acclimatization",
    },
    tooltip: {
      tutorial: {
        one: 'Follow our footsteps in an <span class="bold">Exploration Game</span> through <strong>Nepal</strong> where the goal is to reveal hidden <span class="bold">Milestones</span> on a map to retrace and uncover photos in our two-week trek as you go.',
        two: isTouch
          ? '<span class="bold">Long Touch/Tap</span> on the map to search for a <span class="bold">Milestone</span>.'
          : 'Use your <span class="bold">Mouse</span> and <span class="bold">Hold Click</span> on the map to search for a <span class="bold">Milestone</span>.',
        three: isTouch
          ? '<span class="bold">Slide Two Fingers</span> up or down to <span class="bold">Scroll</span> along the valley.'
          : '<span class="bold">Scroll</span> can be used to travel along the valley.',
        four: 'And <span class="bold">Reveal</span> the next <span class="bold">Milestone</span> of our journey.',
        five: isTouch
          ? '<span class="bold">Tap</span> on the <span class="bold">Milestone</span> to discover more about it! keep track your progress with your <span class="bold">Travel log!</span>'
          : '<span class="bold">Click</span> on the <span class="bold">Milestone</span> to discover more about it! keep track your progress with your <span class="bold">Travel log!</span>',
      },
      message: {
        later: "I can't go there yet, but I can come back later.",
        missed:
          'I must have missed a <span class="bold">Milestone</span> along the way...',
        achievement: '<span class="bold">Achievement!</span> you found {0}',
      },
    },
  },
};
