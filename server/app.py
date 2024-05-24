from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List, Literal
from umap import UMAP
import numpy as np

from ghostumap import GhostUMAP
from models import GhostIndices, GhostProjection, Point, Projection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UMAPResponse(BaseModel):
    projection: List[Point]


class GhostUMAPResponse(BaseModel):
    projection: List[Point]
    ghostProjection: GhostProjection
    ghostIndices: GhostIndices


@app.get("/umap")
async def projection() -> Projection:
    print("Loading data...")
    X = np.load("../public/data/mnist/mnist.npy")
    label = np.load("../public/data/mnist/label.npy")
    precomputed_knn = (
        np.load("../public/data/mnist/knn_indices.npy"),
        np.load("../public/data/mnist/knn_dists.npy"),
    )

    # Initialize UMAP with the desired number of components
    reducer = UMAP(precomputed_knn=precomputed_knn)

    projection = reducer.fit_transform(X)

    return Projection.from_array(projection, label)


@app.get("/gumap")
async def ghostumap(
    data: Literal["mnist", "fmnist", "kmnist"] = Query("mnist"),
    n_ghosts: int = Query(8, ge=1, le=20),
) -> GhostUMAPResponse:

    print("Loading data...")

    X = np.load(f"../public/data/{data}/{data}.npy")
    label = np.load(f"../public/data/{data}/label.npy")
    precomputed_knn = (
        np.load(f"../public/data/{data}/knn_indices.npy"),
        np.load(f"../public/data/{data}/knn_dists.npy"),
    )

    # Initialize UMAP with the desired number of components
    reducer = GhostUMAP(precomputed_knn=precomputed_knn)

    O, G, ghost_indices = reducer.fit_transform(X, n_ghosts)

    return GhostUMAPResponse(
        projection=Projection.from_array(O, label),
        ghostProjection=GhostProjection.from_array(G, ghost_indices),
        ghostIndices=GhostIndices.from_array(indices=ghost_indices),
    )


if __name__ == "__main__":
    import uvicorn

    print("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=50015)
