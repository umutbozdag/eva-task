import { mount } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";

describe("YourComponent", () => {
  it("renders the loading component when isLoading is true", async () => {
    const wrapper = mount(Home, {
      props: {
        isLoading: true,
      },
      global: {
        components: {
          loading: {
            template: "<div>Loading Component Mock</div>",
          },
        },
      },
    });

    expect(wrapper.find("div").text()).toContain("Loading Component Mock");
  });

  it("renders the chart component when isLoading is false and store state is available", async () => {
    const wrapper = mount(Home, {
      props: {
        isLoading: false,
      },
      global: {
        components: {
          chart: {
            template: "<div>Chart Component Mock</div>",
          },
        },
      },
      setup() {
        return {
          store: {
            state: {
              dailySalesOverview: true,
            },
          },
        };
      },
    });

    expect(wrapper.find("div").text()).toContain("Chart Component Mock");
  });

  it("renders the SKU list table component when showSkuListTable is true", async () => {
    const wrapper = mount(Home, {
      setup() {
        return {
          isLoading: false,
          showSkuListTable: true,
        };
      },
      global: {
        components: {
          "sku-list-table": {
            template: "<div>SKU List Table Component Mock</div>",
          },
        },
      },
    });

    expect(wrapper.find("div").text()).toContain(
      "SKU List Table Component Mock"
    );
  });
});
