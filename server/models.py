from dataclasses import dataclass
from typing import Literal, Union, List, Tuple
import numpy as np
from pydantic import BaseModel


@dataclass
class Point:
    i: int
    x: float
    y: float
    l: int | str | None = None

    def to_dict(self):
        return {
            "i": self.i,
            "x": self.x,
            "y": self.y,
            "l": self.l,
        }


@dataclass
class Projection:
    projection: List[Point]

    @staticmethod
    def from_array(arr: np.ndarray, labels: np.ndarray):
        return Projection(
            [
                Point(
                    int(i),
                    round(float(x), 3),
                    round(float(y), 3),
                    int(l) if l is not None else "N",
                )
                for i, (x, y, l) in enumerate(zip(arr[:, 0], arr[:, 1], labels))
            ]
        )

    def to_dict(self):
        return {"projection": [p.to_dict() for p in self.projection]}


@dataclass
class GhostProjection:
    projections: List[Projection]

    @staticmethod
    def from_array(ghost_projections: np.ndarray, ghost_indices: np.ndarray):

        return GhostProjection(
            [
                Projection(
                    [
                        Point(int(i), round(float(x), 3), round(float(y), 3), None)
                        for i, x, y in zip(
                            ghost_indices, projection[:, 0], projection[:, 1]
                        )
                    ]
                )
                for projection in ghost_projections
            ]
        )

    def to_dict(self):
        return {"projections": [p.to_dict() for p in self.projections]}


@dataclass
class GhostIndices:
    indices: List[int]

    @staticmethod
    def from_array(ghost_indices: np.ndarray):
        return GhostIndices([int(i) for i in ghost_indices])
