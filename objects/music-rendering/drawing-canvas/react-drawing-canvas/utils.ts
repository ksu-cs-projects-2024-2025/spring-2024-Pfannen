import { Coordinate } from "@/objects/measurement/types";
import { UnitMeasurement } from "@/types";
import { CSSProperties } from "react";

type DimensionDirection = "positive" | "negative";

export type DimensionDirections = {
  x: DimensionDirection;
  y: DimensionDirection;
};

// export const adjustPosition = (
//   coordinate: Coordinate,
//   xAxisValue: number,
//   yAxisValue: number
// ) => {
//   const newCoordinate = { ...coordinate };
//   if (xAxisValue < 0) {
//     newCoordinate.x += xAxisValue;
//     xAxisValue *= -1;
//   }
//   if (yAxisValue < 0) {
//     newCoordinate.y += yAxisValue;
//     yAxisValue *= -1;
//   }
//   return { newCoordinate, xAxisValue, yAxisValue };
// };

export class CoordinateStyleCreator {
  private coordinate: Coordinate;
  private xAxisValue: number;
  private yAxisValue: number;
  public styles: StyleCreator;

  private adjustedCoordinate!: Coordinate;
  private adjustedXValue!: number;
  private adjustedYValue!: number;
  constructor(
    coordinate: Coordinate,
    xAxisValue: number,
    yAxisValue: number,
    unit: UnitMeasurement
  ) {
    this.coordinate = coordinate;
    this.xAxisValue = xAxisValue;
    this.yAxisValue = yAxisValue;
    this.styles = new StyleCreator(unit);
    this.adjustPosition();
    this.styles.addCoordinate(this.adjustedCoordinate);
    this.styles.addDimensions(this.adjustedXValue, this.adjustedYValue);
    this.styles.modifyTransformOrigin(
      this.getDirectionData(xAxisValue, yAxisValue)
    );
  }

  private getDirectionData(
    xAxisValue: number,
    yAxisValue: number
  ): DimensionDirections {
    const x = xAxisValue < 0 ? "negative" : "positive";
    const y = yAxisValue < 0 ? "negative" : "positive";
    return { x, y };
  }

  private adjustPosition() {
    this.adjustedCoordinate = { ...this.coordinate };
    this.adjustedXValue = this.xAxisValue;
    this.adjustedYValue = this.yAxisValue;
    if (this.xAxisValue < 0) {
      this.adjustedCoordinate.x += this.xAxisValue;
      this.adjustedXValue *= -1;
    }
    if (this.yAxisValue < 0) {
      this.adjustedCoordinate.y += this.yAxisValue;
      this.adjustedYValue *= -1;
    }
  }
}

export class StyleCreator {
  private style: CSSProperties = {};
  private unit: UnitMeasurement;

  constructor(unit: UnitMeasurement) {
    this.unit = unit;
  }

  private applyUnitToCoord(coord: Coordinate) {
    return { x: coord.x + this.unit, y: coord.y + this.unit };
  }

  private applyUnit(value: number) {
    return value + this.unit;
  }

  public addDimensions = (width: number, height: number) => {
    this.style["width"] = this.applyUnit(width);
    this.style["height"] = this.applyUnit(height);
  };

  public addCoordinate = (coordinate: Coordinate) => {
    const coord = this.applyUnitToCoord(coordinate);
    this.style["left"] = coord.x;
    this.style["bottom"] = coord.y;
  };

  public center() {
    this.style["transform"] = `translate(-50%, 50%)`;
  }

  public modifyTransformOrigin(directions: DimensionDirections) {
    let yTransform = directions.y === "positive" ? "bottom" : "top";
    let xTransform = directions.x === "positive" ? "left" : "right";
    this.style["transformOrigin"] = `${yTransform} ${xTransform}`;
  }

  public addBorderRadius = (value: string) => {
    this.style["borderRadius"] = value;
  };

  public addBackgroundColor = (color: string) => {
    this.style["backgroundColor"] = color;
  };

  public addRotation = (degree: number) => {
    this.style["rotate"] = `${degree}deg`;
  };

  // Other styling functions can be added as needed

  public getStyle = () => {
    return this.style;
  };

  public clearStyle = () => {
    this.style = {};
  };
}
