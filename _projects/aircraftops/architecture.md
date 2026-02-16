---
layout: project_post
project_id: aircraftops
---


<script src="https://unpkg.com/@panzoom/panzoom/dist/panzoom.min.js"></script>

<!-- PLATFORM ARCHITECTURE -->
<section class="mb-5">
  <div class="card">
    <div class="card-body">
      <h2 class="mb-3">Platform Architecture</h2>
      <p class="text-secondary">
        AircraftOps is designed as a multi-tenant operational platform for organizations.
        The system provides a shared infrastructure layer for domain entities, documents,
        scheduling, permissions, and real-time activity feeds.
      </p>
      <p class="text-secondary">
        Some subsystems are already implemented, while others are architected and planned
        as part of a coherent platform roadmap.
      </p>
    </div>
  </div>
</section>

<div class="row">

  <div class="col-lg-7">
    <!-- DIAGRAM -->
    <section class="mb-5">
      <div class="card">
        <div class="card-body">
          <h4 class="fw-semibold mb-3">High-Level System Graph</h4>
          <p class="text-secondary mb-4">
            All capabilities are built on a shared event-driven substrate.
            The application layer emits commands and renders state.
            Background pipelines handle ingestion, indexing, and analytics.
          </p>
          <div id="diagram-container" class="rounded overflow-hidden" style="max-height:450px;border:black solid 1px;  box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.08),
        inset 0 4px 10px rgba(0, 0, 0, 0.6);">
            <img id="diagram"
                src="{{ site.baseurl }}/assets/img/infrastructure-composer-fboops.webp"
                class="w-100"
                style="cursor: grab;">
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="col-12 col-lg-5">
    <!-- IMPLEMENTED CORE -->
    <section class="mb-5">
      <h3 class="fw-semibold mb-4">Implemented Core Systems</h3>
      <div class="row g-4">

        <div class="col-12">
          <div class="card h-100 p-4">
            <h6>Domain Entity Registry</h6>
            <p class="text-secondary">
              Core business objects are modeled as typed domain entities
              stored in a unified data model.
            </p>
          </div>
        </div>

        <div class="col-12">
          <div class="card h-100 p-4">
            <h6>Event Infrastructure</h6>
            <p class="text-secondary">
              All entity mutations emit structured events via DynamoDB Streams
              and Redis, which drive background pipelines for indexing,
              metrics, and analytics.
            </p>
          </div>
        </div>

        <div class="col-12">
          <div class="card h-100 p-4">
            <h6>Search Layer</h6>
            <p class="text-secondary">
              Domain entities are synchronized into Typesense for keyword search,
              with vector embeddings stored in S3 for semantic retrieval.
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>
</div>

<!-- ARCHITECTED SYSTEMS -->
<section class="mb-5">
  <h3 class="fw-semibold mb-4">Architected Systems</h3>
  <div class="row g-4">

    <div class="col-md-4">
      <div class="card h-100 p-4">
        <h6>Observability & Analytics</h6>
        <p class="text-secondary">
          Audit events are streamed through Firehose into S3 and queried
          via Athena for time-based operational analytics.
        </p>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 p-4">
        <h6>Document Vault</h6>
        <p class="text-secondary">
          First-class document entities with metadata,
          ownership, indexing, and semantic retrieval.
        </p>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 p-4">
        <h6>Scheduling Engine</h6>
        <p class="text-secondary">
          Time-based domain objects that emit system events
          and drive workflows.
        </p>
      </div>
    </div>

  </div>
</section>

<!-- PLANNED CAPABILITIES -->
<section class="mb-5">
  <h3 class="fw-semibold mb-4">Planned Platform Capabilities</h3>
  <div class="row g-4">

    <div class="col-md-6">
      <div class="card h-100 p-4">
        <h6>Activity Feed</h6>
        <p class="text-secondary">
          Instagram-style event feed showing all organizational
          activity in real time.
        </p>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card h-100 p-4">
        <h6>Semantic Knowledge Layer</h6>
        <p class="text-secondary">
          Vector-based retrieval over internal documents,
          memos, SOPs, and operational records.
        </p>
      </div>
    </div>

  </div>
</section>

<!-- SYSTEM PHILOSOPHY -->
<section class="mb-5">
  <div class="card">
    <div class="card-body">
      <h3 class="fw-semibold mb-3">System Philosophy</h3>
      <ul class="text-secondary">
        <li>Everything is an entity</li>
        <li>Everything emits events</li>
        <li>Everything is permissioned</li>
        <li>Nothing mutates without history</li>
      </ul>
      <p class="text-secondary col-lg-9">
        AircraftOps is built as a long-term platform, not a single-purpose app.
        The current implementation represents the core substrate.
        The remaining systems are logical extensions of the same architecture.
      </p>
    </div>
  </div>
</section>

<script>
  const elem = document.getElementById('diagram');
  const panzoom = Panzoom(elem, {
    maxScale: 6,
    minScale: 1,
    contain: 'outside'
  });

  panzoom.zoom(1.1, { animate: false });

  elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
</script>
