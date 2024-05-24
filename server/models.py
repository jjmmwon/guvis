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
                    int(l) if l is not None else None,
                )
                for i, (x, y, l) in enumerate(zip(arr[:, 0], arr[:, 1], labels))
            ]
        )


@dataclass
class GhostProjection:
    projections: List[Projection]

    @staticmethod
    def from_array(ghost_projections: np.ndarray, ghost_indices: np.ndarray):
        ghost_projections = np.swapaxes(ghost_projections, 0, 1)

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


@dataclass
class GhostIndices:
    indices: List[int]

    @staticmethod
    def from_array(ghost_indices: np.ndarray):
        return GhostIndices([int(i) for i in ghost_indices])
