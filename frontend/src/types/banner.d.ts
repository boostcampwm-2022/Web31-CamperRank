declare module '@types' {
  interface BannerContent {
    text: string;
    image: string;
    color: string;
  }

  type BannerType = {
    content: BannerContent;
  };
}
