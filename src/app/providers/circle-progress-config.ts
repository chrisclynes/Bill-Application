import { CircleProgressOptions, CircleProgressOptionsInterface } from 'ng-circle-progress';

export const circleProgressConfig: CircleProgressOptionsInterface = {
  radius: 100,
  outerStrokeWidth: 16,
  innerStrokeWidth: 8,
  outerStrokeColor: "#78C000",
  innerStrokeColor: "#C7E596",
  animation: true,
  animationDuration: 300
};

export const CIRCLE_PROGRESS_OPTIONS = {
  provide: CircleProgressOptions,
  useValue: circleProgressConfig
};
