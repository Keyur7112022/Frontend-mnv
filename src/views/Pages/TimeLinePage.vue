<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-6">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <h3 class="mb-0">Timeline</h3>
            </template>

            <time-line type="one-side">
              <time-line-item badge-type="success" badge-icon="ni ni-bell-55">
                <small class="text-muted font-weight-bold">10:30 AM</small>
                <h5 class="mt-3 mb-0">New message</h5>
                <p class="text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="success">design</badge>&nbsp;
                  <badge rounded type="success">system</badge>&nbsp;
                  <badge rounded type="success">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="danger" badge-icon="ni ni-html5">
                <small class="text-muted font-weight-bold">10:30 AM</small>
                <h5 class="mt-3 mb-0">Product issue</h5>
                <p class="text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="danger">design</badge>&nbsp;
                  <badge rounded type="danger">system</badge>&nbsp;
                  <badge rounded type="danger">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="info" badge-icon="ni ni-like-2">
                <small class="text-muted font-weight-bold">10:30 AM</small>
                <h5 class="mt-3 mb-0">New likes</h5>
                <p class="text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="info">design</badge>&nbsp;
                  <badge rounded type="info">system</badge>&nbsp;
                  <badge rounded type="info">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="success" badge-icon="ni ni-bell-55">
                <small class="text-muted font-weight-bold">10:30 AM</small>
                <h5 class="mt-3 mb-0">New message</h5>
                <p class="text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="success">design</badge>&nbsp;
                  <badge rounded type="success">system</badge>&nbsp;
                  <badge rounded type="success">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="danger" badge-icon="ni ni-html5">
                <small class="text-muted font-weight-bold">10:30 AM</small>
                <h5 class="mt-3 mb-0">Product issue</h5>
                <p class="text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="danger">design</badge>&nbsp;
                  <badge rounded type="danger">system</badge>&nbsp;
                  <badge rounded type="danger">creative</badge>
                </div>
              </time-line-item>
            </time-line>
          </card>
        </div>
        <div class="col-lg-6">
          <card shadow gradient="default" header-classes="bg-transparent">
            <template v-slot:header>
              <h3 class="mb-0 text-white">Dark timeline</h3>
            </template>
            <time-line type="one-side">
              <time-line-item badge-type="success" badge-icon="ni ni-bell-55">
                <small class="text-light font-weight-bold">10:30 AM</small>
                <h5 class="text-white mt-3 mb-0">New message</h5>
                <p class="text-light text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="success">design</badge>&nbsp;
                  <badge rounded type="success">system</badge>&nbsp;
                  <badge rounded type="success">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="danger" badge-icon="ni ni-html5">
                <small class="text-light font-weight-bold">10:30 AM</small>
                <h5 class="text-white mt-3 mb-0">Product issue</h5>
                <p class="text-light text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="danger">design</badge>&nbsp;
                  <badge rounded type="danger">system</badge>&nbsp;
                  <badge rounded type="danger">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="info" badge-icon="ni ni-like-2">
                <small class="text-light font-weight-bold">10:30 AM</small>
                <h5 class="text-white mt-3 mb-0">New likes</h5>
                <p class="text-light text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="info">design</badge>&nbsp;
                  <badge rounded type="info">system</badge>&nbsp;
                  <badge rounded type="info">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="success" badge-icon="ni ni-bell-55">
                <small class="text-light font-weight-bold">10:30 AM</small>
                <h5 class="text-white mt-3 mb-0">New message</h5>
                <p class="text-light text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="success">design</badge>&nbsp;
                  <badge rounded type="success">system</badge>&nbsp;
                  <badge rounded type="success">creative</badge>
                </div>
              </time-line-item>

              <time-line-item badge-type="danger" badge-icon="ni ni-html5">
                <small class="text-light font-weight-bold">10:30 AM</small>
                <h5 class="text-white mt-3 mb-0">Product issue</h5>
                <p class="text-light text-sm mt-1 mb-0">
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <div class="mt-3">
                  <badge rounded type="danger">design</badge>&nbsp;
                  <badge rounded type="danger">system</badge>&nbsp;
                  <badge rounded type="danger">creative</badge>
                </div>
              </time-line-item>
            </time-line>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TimeLine from "@/components/Timeline/TimeLine";
import TimeLineItem from "@/components/Timeline/TimeLineItem";
import RouteBreadcrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import BaseHeader from "@/components/BaseHeader";
import Badge from "@/components/Badge";

export default {
  components: {
    Badge,
    BaseHeader,
    TimeLine,
    TimeLineItem,
    RouteBreadcrumb,
  },
};
</script>
<style></style>
