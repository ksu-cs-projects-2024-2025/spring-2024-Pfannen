import { SVGRest } from "@/types/music-rendering/canvas/beat-canvas/drawers/measure-rests";
import { SVGRecord } from "@/types/svg";

const restSVGData: Partial<SVGRecord<SVGRest>> = {
  quarter: {
    paths: [
      "M11.09,34.67c-3.59-4.86-6.7-9.06-10-13.52C7.12,15.1,10.53,8.54,3.79.51c.32-.17.64-.34.96-.51.98.58,2.18.95,2.89,1.76,1.76,2,5.64,5.7,8.21,9.98.23.38.66,1.11.58,2.02-.11,1.26-1.12,2.12-1.44,2.41-2,1.81-4.7,6.46-4.7,10.06,0,3.01,1.58,6.01,4.72,10.05.66.85,1.23,1.78,2.27,3.3-3.96-.27-7.47-2.96-9.86,1.07-2.34,3.94.1,6.98,2.36,10.15-5.27-.7-10.91-8.62-9.57-13.21.94-3.22,3.61-3.9,6.54-3.81,1.16.04,2.3.45,4.35.89Z",
    ],
    viewBox: [0, 0, 17.27, 50.8],
  },
  eighth: {
    paths: [
      "M9.45,38.6c2.6-9.1,5.2-18.2,7.8-27.3-6.49,3.43-12.88,3.25-15.63.07C.41,9.98-.25,7.83.09,5.82.6,2.83,3.33-.31,6.33.02c1.52.17,2.69.69,3.55,1.51,1.69,1.61,1.76,3.74,1.79,4.59.06,2-.69,3.51-1.11,4.22,2.65-.29,5.83-1.14,8.28-3.53,2.24-2.19,2.83-4.64,3.12-4.54.66.23-3.14,12.92-5.06,19.38-2.19,7.36-3.97,13.45-5.2,17.66-.75-.24-1.5-.48-2.25-.72Z",
    ],
    viewBox: [0, 0, 22.03, 39.32],
  },
  sixteenth: {
    paths: [
      "M23.22,21.66c-.95,3.22-1.83,6.19-2.62,8.88-.03.1-.06.2-.08.29-1.12,4.1-2.62,9.12-3.62,12.47-2.19,7.36-3.97,13.45-5.2,17.66l-2.25-.72c2.6-9.1,5.2-18.2,7.8-27.3-6.49,3.43-12.88,3.25-15.63.07-1.21-1.39-1.87-3.54-1.53-5.56.51-2.99,3.24-6.12,6.25-5.79,1.51.17,2.69.7,3.54,1.51,1.69,1.61,1.77,3.75,1.79,4.6.07,1.99-.69,3.51-1.11,4.22,2.58-.29,5.65-1.1,8.05-3.32,1.66-5.79,3.31-11.58,4.96-17.37-6.48,3.43-12.87,3.25-15.63.07-1.21-1.39-1.87-3.54-1.52-5.56C6.92,2.82,9.66-.31,12.66.02c1.52.17,2.69.7,3.55,1.51,1.68,1.61,1.76,3.74,1.79,4.6.06,1.99-.69,3.51-1.11,4.22,2.65-.3,5.83-1.15,8.28-3.53,2.24-2.19,2.82-4.64,3.12-4.54.65.23-3.14,12.92-5.07,19.38Z",
    ],
    viewBox: [0, 0, 28.36, 60.96],
  },
};

export const getRestSVGData = (type: SVGRest) => {
  return (
    restSVGData[type] || {
      paths: [
        "M11.09,34.67c-3.59-4.86-6.7-9.06-10-13.52C7.12,15.1,10.53,8.54,3.79.51c.32-.17.64-.34.96-.51.98.58,2.18.95,2.89,1.76,1.76,2,5.64,5.7,8.21,9.98.23.38.66,1.11.58,2.02-.11,1.26-1.12,2.12-1.44,2.41-2,1.81-4.7,6.46-4.7,10.06,0,3.01,1.58,6.01,4.72,10.05.66.85,1.23,1.78,2.27,3.3-3.96-.27-7.47-2.96-9.86,1.07-2.34,3.94.1,6.98,2.36,10.15-5.27-.7-10.91-8.62-9.57-13.21.94-3.22,3.61-3.9,6.54-3.81,1.16.04,2.3.45,4.35.89Z",
      ],
      viewBox: [0, 0, 17.27, 50.8],
    }
  );
};
