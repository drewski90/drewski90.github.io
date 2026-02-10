---
layout: post
title:  "Freelance Services"
date:   2026-02-09 05:51:39 -0800
categories: jekyll update
---

<div class="container">

  <!-- Intro -->
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <p class="lead text-secondary">
        WordPress / Elementor / WooCommerce / AWS / Integrations / Automation
      </p>
      <p class="mb-0">
        Experienced full-stack developer available for website systems, backend work,
        and business workflow automation. I focus on practical engineering work —
        building integrations, fixing systems, automating workflows, and improving
        reliability for existing platforms.
      </p>
    </div>
  </div>

  <div class="row g-4">

    <!-- Platforms -->
    <div class="col-md-6">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="fw-semibold mb-3">Platforms</h5>
          <ul class="mb-0">
            <li>WordPress / Elementor development and troubleshooting</li>
            <li>WooCommerce customization and checkout workflows</li>
            <li>Shopify and Magento backend customization</li>
            <li>Custom backend services and integrations</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Forms & Automation -->
    <div class="col-md-6">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="fw-semibold mb-3">Forms, Email & Workflow Automation</h5>
          <ul class="mb-0">
            <li>Contact, booking, and quote request forms</li>
            <li>Email notification and autoresponder automation</li>
            <li>Zapier / Make workflow automation</li>
            <li>Form-to-CRM and system integrations</li>
            <li>Payment and order processing workflows</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Backend -->
    <div class="col-md-6">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="fw-semibold mb-3">Backend & Data Services</h5>
          <ul class="mb-0">
            <li>API integrations (payments, CRM, scheduling)</li>
            <li>AWS backend services (Lambda, API Gateway, DynamoDB, S3)</li>
            <li>Web scraping and automated data pipelines</li>
            <li>Data engineering workflows and ETL automation</li>
            <li>Backend troubleshooting and system automation</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Typical Projects -->
    <div class="col-md-6">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="fw-semibold mb-3">Typical Projects</h5>
          <ul class="mb-0">
            <li>Connecting websites to internal or third-party APIs</li>
            <li>Automating manual business processes</li>
            <li>Fixing broken forms, integrations, or WooCommerce workflows</li>
            <li>Building reporting pipelines and operational dashboards</li>
            <li>Performance optimization for WordPress and ecommerce sites</li>
          </ul>
        </div>
      </div>
    </div>

  </div>

  <!-- Footer CTA -->
  <div class="text-center mt-5">
    <p class="mb-1 fw-semibold">Bay Area / Remote OK</p>
    <p class="text-secondary">
      Reply with your website URL, description of the work needed,
      timeline, and budget range.
    </p>
  </div>

</div>


<div class="container py-5" style="max-width:700px;">

  <div class="card shadow-lg border-0">
    <div class="card-body p-5">

      <h3 class="mb-4 fw-semibold text-center">
        Contact / Project Request
      </h3>

      <form id="contactForm">

        <div class="mb-3">
          <label class="form-label">Name</label>
          <input class="form-control form-control-lg" name="name" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control form-control-lg" name="email" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Company (optional)</label>
          <input class="form-control form-control-lg" name="company">
        </div>

        <div class="mb-4">
          <label class="form-label">Project Details</label>
          <textarea class="form-control" rows="5" name="message" required></textarea>
        </div>

        <div class="d-grid">
          <button class="btn btn-primary btn-lg">
            Send Request
          </button>
        </div>

        <div id="formStatus" class="text-center mt-3 small"></div>

      </form>

    </div>
  </div>
</div>

<script>
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  status.innerText = "Sending...";

  const res = await fetch("https://iz6lue2sgrqksxoemuzvkygrrq0josfk.lambda-url.us-west-1.on.aws/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if(res.ok){
    form.reset();
    status.innerText = "Message sent successfully.";
  } else {
    status.innerText = "Something went wrong. Please try again.";
  }
});
</script>
