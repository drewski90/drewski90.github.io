---
layout: base
title: Andrew Martinez
---

<header class="hero position-relative overflow-hidden mb-3">

  <!-- Animated Canvas -->
  <canvas id="heroCanvas"
          class="gl-canvas position-absolute top-0 start-0 w-100 h-100"
          style="z-index:0;"></canvas>

  <!-- Content -->
  <div class="position-relative" style="z-index:1;">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col text-center">

          <h1 class="display-4 mb-3">
            Andrew Martinez
          </h1>

          <div class="d-flex justify-content-center mb-4 small text-secondary">
            <span id="rotating-badge" class="h5 p-2 m-0"></span>
          </div>

        </div>
      </div>
    </div>
  </div>

</header>


<script type="module">
  import { initHoloShader } from "{{ site.baseurl }}/assets/js/shader.js";

  document.querySelectorAll(".gl-canvas").forEach(canvas => {
    initHoloShader(canvas);
  });
</script>

<script type="module">
  import { initRotatingBadge } from "{{ site.baseurl }}/assets/js/rotatingBadge.js";

  initRotatingBadge({
    element: document.getElementById("rotating-badge"),
    badges: [
      "Serverless Architectures",
      "Data Pipelines",
      "Real-Time Systems",
      "Search & Indexing",
      "Ingestion & Processing",
      "Multi-Tenant SaaS"
    ]
  });
</script>

{% include project_cards.html %}
