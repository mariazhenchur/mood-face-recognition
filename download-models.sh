#!/bin/bash

# Create the models directory if it doesn't exist
mkdir -p public/models

# Download each file
curl -o public/models/tiny_face_detector_model-weights_manifest.json https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/tiny_face_detector_model-weights_manifest.json
curl -o public/models/tiny_face_detector_model-shard1 https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/tiny_face_detector_model-shard1
curl -o public/models/tiny_face_detector_model-shard2 https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/tiny_face_detector_model-shard2
curl -o public/models/face_expression_model-weights_manifest.json https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/face_expression_model-weights_manifest.json
curl -o public/models/face_expression_model-shard1 https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/face_expression_model-shard1

echo "Download complete!"
