import json
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List, Literal
from umap import UMAP
import numpy as np

from ghostumap import GhostUMAP
from models import Point, Projection, GhostProjection

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
    ghostProjections: GhostProjection
    ghostIndices: List[int]
    instabilityRanks: List[int]
    instabilities: List[float]

    @classmethod
    def __dict__(cls):
        return {
            "projection": cls.projection,
            "ghostProjections": cls.ghostProjections,
            "ghostIndices": cls.ghostIndices,
            "instabilityRanks": cls.instabilityRanks,
            "instabilities": cls.instabilities,
        }


@app.get("/gumap/")
async def ghostumap(
    data: Literal["mnist", "fmnist", "kmnist"] = Query("mnist"),
    nGhosts: int = Query(8, ge=1, le=20),
) -> GhostUMAPResponse:

    print("Loading data...")
    print(data, nGhosts)

    X = np.load(f"../public/data/{data}/{data}.npy")
    label = np.load(f"../public/data/{data}/label.npy")
    precomputed_knn = (
        np.load(f"../public/data/{data}/knn_indices.npy"),
        np.load(f"../public/data/{data}/knn_dists.npy"),
    )

    # Initialize UMAP with the desired number of components
    reducer = GhostUMAP(precomputed_knn=precomputed_knn)

    O, G, ghost_indices = reducer.fit_transform(X, n_ghosts=nGhosts)
    rank, instabilities = reducer.measure_instability()

    print(O.shape, G.shape, ghost_indices.shape, rank.shape, instabilities.shape)
    G = np.swapaxes(G, 0, 1)

    projection = Projection.from_array(O, label)
    ghostProjections = GhostProjection.from_array(G, ghost_indices)

    # return GhostUMAPResponse(
    #     projection=projection.projection,
    #     ghostProjections=ghostProjections,
    #     ghostIndices=[int(i) for i in ghost_indices],
    #     instabilityRanks=[int(r) for r in rank],
    #     instabilities=[round(float(i), 3) for i in instabilities],
    # )

    d = {
        "projection": projection.to_dict()["projection"],
        "ghostProjections": ghostProjections.to_dict(),
        "ghostIndices": [int(i) for i in ghost_indices],
        "instabilityRanks": [int(r) for r in rank],
        "instabilities": [round(float(i), 3) for i in instabilities],
    }

    with open(f"../public/{data}_response_{nGhosts}.json", "w") as f:
        json.dump(d, f)
    with open(f"../public/{data}_response_str.json", "w") as f:
        f.write(str(d))


if __name__ == "__main__":
    import uvicorn

    print("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=50018)
