---
layout: project_post
project_id: agt
title: Architecture
---

<!-- OVERVIEW -->
<section class="mb-5">
  <div class="card">
    <div class="card-body">
      <h2>System Overview</h2>
      <p class="text-secondary mb-0">
        A Goddess’s Touch is a serverless booking and payments platform built on Square.
        The system consists of a Vue single-page application and a Flask API deployed
        on AWS Lambda via Zappa, with DynamoDB used for all operational state and caching.
      </p>
    </div>
  </div>
</section>

<!-- CORE STACK -->
<section class="mb-5">
  <h3 class="fw-semibold mb-4">Core Stack</h3>
  <div class="row g-3">

    <div class="col-md-4">
      <div class="card p-3">
        <h6>Frontend</h6>
        <ul class="text-secondary mb-0">
          <li>Vue.js SPA</li>
          <li>Vuetify component system</li>
          <li>Vuex + Pinia state management</li>
          <li>Radar for geospatial UI</li>
        </ul>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card p-3">
        <h6>Backend</h6>
        <ul class="text-secondary mb-0">
          <li>Flask REST API</li>
          <li>Zappa serverless deployment</li>
          <li>Square API integration</li>
        </ul>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card p-3">
        <h6>Data</h6>
        <ul class="text-secondary mb-0">
          <li>DynamoDB (multi-table)</li>
          <li>Operational state</li>
          <li>Square response caching</li>
        </ul>
      </div>
    </div>

  </div>
</section>

<!-- DATA MODEL -->
<section class="mb-5">
  <h3 class="fw-semibold mb-4">Data Architecture</h3>
  <div class="card p-4">
    <ul class="text-secondary mb-0">
      <li><strong>Users</strong> – customers, staff, and affiliates</li>
      <li><strong>User addresses</strong> – normalized location records</li>
      <li><strong>Bookings</strong> – appointment lifecycle and payment state</li>
      <li><strong>Affiliate program</strong> – referral attribution graph</li>
      <li><strong>Cache</strong> – TTL-based Square API responses</li>
    </ul>
  </div>
</section>

<!-- SQUARE CONSTRAINT -->
<section class="mb-5">
  <h3 class="fw-semibold mb-4">Square Rate Limiting Strategy</h3>
  <div class="card p-4">
    <p class="text-secondary mb-0">
      Square enforces strict rate limits on catalog, customer, and order endpoints.
      To prevent UI instability and request amplification, the system uses a dedicated
      DynamoDB cache table with TTL expiration to coalesce high-frequency reads and
      minimize direct API calls.
    </p>
  </div>
</section>

<!-- CORE FLOWS -->
<section class="mb-5">
  <h3 class="fw-semibold mb-4">Core Request Flows</h3>
  <div class="card p-4">
    <ul class="text-secondary mb-0">
      <li>Customer booking → availability validation → Square checkout → DynamoDB commit</li>
      <li>Staff schedule update → API mutation → canonical state persisted</li>
      <li>Affiliate link → referral record created → booking attributed on payment</li>
    </ul>
  </div>
</section>

<!-- DESIGN PRINCIPLES -->
<section class="mb-5">
  <h3 class="fw-semibold mb-4">Design Principles</h3>
  <div class="card p-4">
    <ul class="text-secondary mb-0">
      <li>Serverless-first deployment</li>
      <li>DynamoDB as canonical system of record</li>
      <li>External providers treated as constrained dependencies</li>
      <li>Cache over retry</li>
      <li>All booking logic enforced server-side</li>
    </ul>
  </div>
</section>
