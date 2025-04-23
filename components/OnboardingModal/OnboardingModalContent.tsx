export interface Slide {
  title: string;
  subtitle: string;
  img: string;
  width: number;
  height: number;
}

export const slides: Slide[] = [
  {
    title: "share moments in posts",
    subtitle: "process over perfection",
    img: "images/modal-first-slide.png",
    width: 369,
    height: 181,
  },
  {
    title: "write your thoughts",
    subtitle: "say anything",
    img: "images/modal-second-slide.png",
    width: 344,
    height: 186,
  },
  {
    title: "memories make a timeline",
    subtitle: "moments are collected",
    img: "images/modal-third-slide.png",
    width: 398,
    height: 128,
  },
  {
    title: "create your profile",
    subtitle: "be who you are",
    img: "images/modal-final-slide.png",
    width: 235,
    height: 177,
  },
];
