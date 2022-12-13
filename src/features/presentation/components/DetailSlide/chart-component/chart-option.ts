export interface ChartOption {
  readonly label: string,
  readonly count: number,
}

export interface ChartProps {
  readonly dataset: readonly ChartOption[],
}
