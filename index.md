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
          <a href="/resume">
            <div class="btn btn-primary btn-sm">
            View Resume
            </div>
          </a>

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

<section class="tech-stack glass py-5 border-0">
  <div class="container">

    <h4 class="text-center mb-5">Core Technologies</h4>

    <div class="stack-grid">

      <div class="stack-group">
        <div class="stack-title">Backend & Services</div>
        <div class="stack-items">
          <span>Python</span>
          <span>Flask</span>
          <span>FastAPI</span>
          <span>Django</span>
          <span>Node.js</span>
          <span>REST / GraphQL APIs</span>
        </div>
      </div>

      <div class="stack-group">
        <div class="stack-title">Cloud & Infrastructure</div>
        <div class="stack-items">
          <span>AWS Lambda</span>
          <span>API Gateway</span>
          <span>DynamoDB</span>
          <span>S3</span>
          <span>CloudFormation</span>
          <span>Docker</span>
          <span>Linux</span>
        </div>
      </div>

      <div class="stack-group">
        <div class="stack-title">Data & Messaging</div>
        <div class="stack-items">
          <span>DynamoDB</span>
          <span>MongoDB</span>
          <span>MySQL</span>
          <span>SQL Server</span>
          <span>Redis</span>
          <span>Typesense</span>
          <span>SQS</span>
        </div>
      </div>

      <div class="stack-group">
        <div class="stack-title">Frontend & Interfaces</div>
        <div class="stack-items">
          <span>Vue.js</span>
          <span>React</span>
          <span>Bootstrap</span>
          <span>Tailwind</span>
          <span>HTML / CSS / SASS</span>
          <span>Jinja</span>
        </div>
      </div>

    </div>

  </div>
</section>

