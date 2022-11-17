declare module "@types" {
  interface FilterContent {
    name: string;
    elements: string[];
  }

  type FilterType = {
    content: FilterContent;
  };
}
