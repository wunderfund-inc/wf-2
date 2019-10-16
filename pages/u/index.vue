<template>
  <div>
    <b-container>
      <div class="investmentHeader">
        <b-row>
          <b-col align-self="start">
            <h2>My Investments</h2>
          </b-col>
          <b-col align-self="end" class="text-right">
            <h4>Investment Limit</h4>
            <p class="text-muted">
              Based on your annual income and net worth.
              <a href="#">Update it!</a>
            </p>
            <h5>$2200</h5>
          </b-col>
        </b-row>
      </div>
      <b-row class="investmentRow">
        <b-col class="investDetails" cols="12" md="8">
          <h3>Esoteric Brewing Company, LLC.</h3>
          <h4 style="font-variant: small-caps;">
            offering information
          </h4>
          <b-row>
            <b-col>
              <h5>Raised</h5>
              <h6>$</h6>
            </b-col>
            <b-col>
              <h5>Goal</h5>
              <h6>$</h6>
            </b-col>
            <b-col>
              <h5>Status</h5>
              <h6>
                Closed
                <span class="text-muted">(Successfully!)</span>
              </h6>
            </b-col>
          </b-row>
          <h4 style="font-variant: small-caps;margin-top:25px;">
            your investment
          </h4>
          <b-row>
            <b-col style="margin-bottom:15px;">
              <h5>Amount Invested</h5>
              <h6>$100.01</h6>
            </b-col>
            <b-col>
              <h5>Ownership (units)</h5>
              <h6>{{ 100.01 / 50 }}</h6>
            </b-col>
            <b-col>
              <h5>Ownership (%)</h5>
              <h6>{{ (100.01 / 1070).toFixed(4) }}%</h6>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="4">
          <b-card
            :header-bg-variant="getStatusColor(false)"
            :header="getStatusTitle(false)"
            header-text-variant="white"
            header-tag="header"
            no-body
          >
            <p class="card-text">
              Header and footers using props.
            </p>
            <!-- <b-list-group flush>
              <b-list-group-item
                v-for="(file, i) in investment.files"
                :key="i"
                class="flex-column align-items-start"
                :href="file.url"
              >
                {{ `View the ${file.type} Agreement` }}
              </b-list-group-item>
            </b-list-group> -->
          </b-card>
        </b-col>
      </b-row>
      <!-- <b-row
        v-for="(investment, index) in investmentList"
        :key="index"
        v-if="selectedCampaign === index">
        <b-col
          cols="12"
          md="8">
          <h3>{{ investment.campaignName }}</h3>
          <h4 style="text-transform: uppercase;">Offering Information</h4>
          <b-row>
            <b-col>
              <h5>Raised</h5>
              <h6>$</h6>
            </b-col>
            <b-col>
              <h5>Goal</h5>
              <h6>$</h6>
            </b-col>
            <b-col>
              <h5>Status</h5>
              <h6>Closed <span class="text-muted">(Successfully!)</span></h6>
            </b-col>
          </b-row>
          <h4 style="text-transform: uppercase;">Your Investment</h4>
          <b-row>
            <b-col>
              <h5>Amount Invested</h5>
              <h6>${{ investment.amount }}</h6>
            </b-col>
            <b-col>
              <h5>Ownership (units)</h5>
              <h6>{{ investment.amount/50 }}</h6>
            </b-col>
            <b-col>
              <h5>Ownership (%)</h5>
              <h6>{{ (investment.amount/1070).toFixed(4) }}%</h6>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          cols="12"
          md="4">
          <b-card
            no-body
            border-variant="primary"
            header="History">
            <b-list-group flush>
              <b-list-group-item
                v-for="(inv, ind) in investmentList"
                :key="ind"
                href="#"
                class="flex-column align-items-start"
                :active="selectedCampaign === ind"
                @click="selectedCampaign = ind">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ inv.campaignName }}</h5>
                  <small>{{ inv.timestamp }}</small>
                </div>
                <p class="mb-1">
                  Amount Invested: ${{ inv.amount }}
                </p>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>-->
      <browse-section>
        <h3>Browse Other Investments</h3>
      </browse-section>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    getStatusColor(status) {
      return status === true ? "success" : "warning";
    },
    getStatusTitle(status) {
      return status === true ? "Complete" : "Incomplete";
    }
  }
};
</script>

<style lang="scss">
.container {
  margin-top: 50px;
  margin-bottom: 50px;
  .investmentHeader {
    margin-bottom: 50px;
  }
  p.text-muted {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  h5 {
    margin-top: 5px;
  }
  .investmentRow {
    margin-top: 40px;
    margin-bottom: 40px;
    background-color: #fafbfc;
    border-radius: 3px;
    .investDetails {
      padding: 25px;
    }
    h3 {
      margin-bottom: 15px;
    }
    .card {
      height: 100%;
      margin-right: -15px;
      .card-text {
        height: 50%;
        padding-left: 20px;
        padding-top: 15px;
      }
    }
  }
}
</style>
