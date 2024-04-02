export interface Component {
  render: (container: HTMLElement) => void;
}

export type Route = {
  path: string;
  component: Component;
  children?: Route[];
};
