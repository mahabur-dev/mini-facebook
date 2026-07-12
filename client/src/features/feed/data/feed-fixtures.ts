export type StoryFixture = {
  id: string;
  name: string;
  image: string;
  avatar?: string;
  active?: boolean;
};

export type SuggestionFixture = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export type FriendFixture = {
  id: string;
  name: string;
  role: string;
  image: string;
  online?: boolean;
};

export const desktopStories: StoryFixture[] = [
  { id: "story-1", name: "Your Story", image: "/assets/images/card_ppl1.png", active: true },
  { id: "story-2", name: "Ryan Roslansky", image: "/assets/images/card_ppl2.png", avatar: "/assets/images/mini_pic.png" },
  { id: "story-3", name: "Ryan Roslansky", image: "/assets/images/card_ppl3.png", avatar: "/assets/images/mini_pic.png" },
  { id: "story-4", name: "Ryan Roslansky", image: "/assets/images/card_ppl4.png", avatar: "/assets/images/mini_pic.png" },
];

export const mobileStories: StoryFixture[] = [
  { id: "m-story-1", name: "Your Story", image: "/assets/images/mobile_story_img.png", active: true },
  { id: "m-story-2", name: "Ryan...", image: "/assets/images/mobile_story_img1.png" },
  { id: "m-story-3", name: "Ryan...", image: "/assets/images/mobile_story_img2.png" },
  { id: "m-story-4", name: "Ryan...", image: "/assets/images/mobile_story_img1.png" },
  { id: "m-story-5", name: "Ryan...", image: "/assets/images/mobile_story_img2.png" },
  { id: "m-story-6", name: "Ryan...", image: "/assets/images/mobile_story_img1.png" },
  { id: "m-story-7", name: "Ryan...", image: "/assets/images/mobile_story_img.png" },
  { id: "m-story-8", name: "Ryan...", image: "/assets/images/mobile_story_img1.png" },
];

export const sidebarSuggestions: SuggestionFixture[] = [
  {
    id: "suggestion-1",
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
    image: "/assets/images/Avatar.png",
  },
];

export const friends: FriendFixture[] = [
  {
    id: "friend-1",
    name: "Steve Jobs",
    role: "CEO of Apple",
    image: "/assets/images/people1.png",
    online: false,
  },
  {
    id: "friend-2",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    image: "/assets/images/people2.png",
    online: true,
  },
  {
    id: "friend-3",
    name: "Dylan Field",
    role: "CEO of Figma",
    image: "/assets/images/people3.png",
    online: true,
  },
];
