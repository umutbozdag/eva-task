import store from "@/store";
import { TableHeader } from "@/types/table/TableTypes";
import { formatDate, getDate, getDayName } from "@/utils/date";

const createTableHeadersConfig = (
  firstSelectedColumn: string,
  secondSelectedColumn?: string
) => {
  const headers: TableHeader[] = [
    {
      id: "sku",
      label: "SKU",
    },
    {
      id: "productNamme",
      label: "Product Name",
      fullWidth: true,
    },
    {
      id: "firstDate",
      formatter: () => {
        return `${getDayName(firstSelectedColumn)}<br/>${getDate(
          firstSelectedColumn
        )}<br/>Sales / Units<br/>Avg. Selling Price`;
      },
    },
    {
      id: "secondDate",
      formatter: () => {
        if (!secondSelectedColumn) {
          return "";
        }

        return `
          ${getDayName(secondSelectedColumn)}<br/>
          ${getDate(secondSelectedColumn)}<br/>
          Sales / Units<br/>
          Avg. Selling Price
        `;
      },
    },
    {
      id: "skuRefundRate",
      formatter: () => {
        return `SKU Refund Rate<br/>(Last ${store.state.selectedDay} days)`;
      },
    },
  ];

  return headers;
};

export { createTableHeadersConfig };
